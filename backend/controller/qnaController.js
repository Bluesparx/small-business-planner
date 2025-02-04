import { HfInference } from "@huggingface/inference";
import User from '../models/user.js';

const SUMMARY_PROMPT_PREFIX = "Summarize the data in <500 words, focus on key insights and figures:";
const HF_API_KEY = process.env.HF_API_KEY;
const client = new HfInference(HF_API_KEY);

const createContext = (balanceSheet, incomeStatement, analyzedData, predictions) => {
    const formatRows = (rows) => {
        return rows.map((row, index) => `${index + 1}: ${JSON.stringify(row)}`).join("\n");
    };

    const formatAnalysis = (analysis) => {
        return analysis && analysis.length > 0
            ? analysis.map((item, index) => `${index + 1}: ${JSON.stringify(item)}`).join("\n")
            : "N/A";
    };

    const formatGrowthAnalysis = (growthAnalysis) => {
        return growthAnalysis && growthAnalysis.length > 0
            ? growthAnalysis.map((item, index) => ` ${index + 1}: ${JSON.stringify(item)}`).join("\n")
            : "N/A";
    };

    const formatPredictions = (predictions) => {
        if (!predictions || predictions.length === 0) return "N/A";
        
        return predictions.map((prediction, index) => {
            let date = prediction.Date;
    
            if (typeof date === 'string') {
                date = date.split(' ')[0]; 
            } else {
                date = new Date(date).toISOString().split('T')[0];
            }
    
            const { 'Predicted Close': predictedClose } = prediction;
            return ` ${index + 1}: Date: ${date}, Close: $${predictedClose.toFixed(2)}`;
        }).join("\n");
    };
    

    return `
    Balance Sheet: 
    ${balanceSheet ? formatRows(balanceSheet.rows) : "N/A"}.

    Income Statement: 
    ${incomeStatement ? formatRows(incomeStatement.rows) : "N/A"}.

    Balance Sheet Analysis:
    ${formatAnalysis(analyzedData.balanceSheetAnalysis)}.

    Growth Balance Sheet:
    ${formatGrowthAnalysis(analyzedData.growthBalanceSheet)}.

    Income Statement Analysis:
    ${formatAnalysis(analyzedData.incomeStatementAnalysis)}.

    Growth Income Statement:
    ${formatAnalysis(analyzedData.growthIncomeStatement)}.

    Stock Predictions(future 90 days): 
    ${formatPredictions(predictions) || "N/A"}
    `;
};

// Function to handle large context with chunking if needed
const handleLargeContext = (context) => {
    const MAX_CHUNK_SIZE = 8000; // Adjust based on model limits
    if (context.length <= MAX_CHUNK_SIZE) return [context];
    
    // Split into chunks at reasonable break points
    const chunks = [];
    let currentChunk = "";
    const sections = context.split('\n\n');
    
    for (const section of sections) {
        if ((currentChunk + section).length > MAX_CHUNK_SIZE) {
            if (currentChunk) chunks.push(currentChunk);
            currentChunk = section;
        } else {
            currentChunk += (currentChunk ? '\n\n' : '') + section;
        }
    }
    if (currentChunk) chunks.push(currentChunk);
    return chunks;
};

const cleanModelResponse = (response) => {
    if (!response) return '';

    let cleanedResponse = response;
    
    const promptPatterns = [
        /Context:[\s\S]*?Question:/i,
        /Question:.*?\n/i,
        /Analyze:.*?\n/i,
        /Provide.*?\n/i,
        /Based on the context.*?\n/i,
        /Given these separate analyses:.*?\n/i,
    ];

    promptPatterns.forEach(pattern => {
        cleanedResponse = cleanedResponse.replace(pattern, '');
    });

    cleanedResponse = cleanedResponse
        .replace(/```[a-z]*\n/g, '') 
        .replace(/```/g, '') 
        .trim() 
        .replace(/^\s*[\r\n]/gm, '\n')
        .replace(/\n{3,}/g, '\n\n');

    return cleanedResponse;
};

const getModelResponse = async (prompt) => {
    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1",
            {
                headers: {
                    Authorization: `Bearer ${HF_API_KEY}`,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                    inputs: prompt,
                    parameters: {
                        max_new_tokens: 1000,
                        temperature: 0.7,
                        top_p: 0.95,
                        return_full_text: false
                    }
                }),
            }
        );
        
        const data = await response.json();
        const rawResponse = data[0].generated_text;
        
        return cleanModelResponse(rawResponse);
    } catch (error) {
        console.error("Error getting model response:", error);
        throw error;
    }
};

const handleAnswer = async (req, res) => {
    try {
        const data = req.body;
        const { question, analyzedData, predictions, balanceSheet, incomeStatement } = data;
        const userId = req.user.id;

        if (!question || !analyzedData || !predictions || !balanceSheet || !incomeStatement || !userId) {
            console.error("Missing required fields in request");
            return res.status(400).json({ error: "Missing required fields" });
        }
        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        let userContext;
        
        if (!user.aiAgent?.context) {
            if (!analyzedData || !predictions || !balanceSheet || !incomeStatement) {
                return res.status(400).json({ error: "Missing required fields for context initialization" });
            }

            console.log("Initializing new context for user");
            const contextLong = createContext(balanceSheet, incomeStatement, analyzedData, predictions);
            const contextChunks = handleLargeContext(contextLong);
            
            // Process initial context and save to user
            let combinedResponse = "";
            for (const chunk of contextChunks) {
                const prompt = `
                    Context: ${chunk}. 
                    Provide key financial insights of the company.
                `;
                
                const chunkResponse = await getModelResponse(prompt);
                combinedResponse += chunkResponse + "\n\n";
            }

            user.aiAgent = {
                context: combinedResponse,
                initialized: true
            };
            await user.save();
            userContext = combinedResponse;
        } else {
            console.log("Using existing context for user");
            userContext = user.aiAgent.context;
        }

        const prompt = `
            Context: ${userContext}
            Question: ${question}
            Provide answer (in 1 paragraph/80 words) based on the context provided.
        `;
        
        const response = await getModelResponse(prompt);
        // console.log(response)
        return res.status(200).json({ answer: response });

    } catch (error) {
        console.error("Error in handleAnswer:", error.message);
        return res.status(500).json({ error: "Error generating answer", details: error.message });
    }
};

export { handleAnswer };
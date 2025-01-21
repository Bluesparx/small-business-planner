import BalanceSheetTable from '../models/balanceSheetTable.js';
import IncomeTable from '../models/income_table.js';
import User from '../models/user.js';
import DataAnalysis from '../models/dataAnalysis.js';
import { triggerAnalysis } from '../config/triggerML.js';

// Endpoint to trigger the analysis
const triggerUserAnalysis = async (req, res) => {
  try {
    const { userId } = req.body;
    console.log('Received userId:', userId);

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Check if the user has both Balance Sheet and Income Statement data
    const balanceSheet = await BalanceSheetTable.findOne({ user: userId });
    const incomeStatement = await IncomeTable.findOne({ user: userId });

    if (!balanceSheet || !incomeStatement) {
      return res.status(400).json({ error: "User must have both Balance Sheet and Income Statement." });
    }

    await triggerAnalysis(user);

    return res.status(200).json({ 
      message: "Analysis triggered successfully."
    });

  } catch (error) {
    console.error('Error in triggerUserAnalysis:', error);
    return res.status(500).json({ error: error.message });
  }
};

// Endpoint to get the analysis result for a user
const getUserAnalysis = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log('Fetching analysis result for userId:', userId);

    // Find the most recent analysis for the user
    const analysis = await DataAnalysis.findOne({ user: userId })
      .populate('balanceSheet incomeStatement')
      .sort({ createdAt: -1 });

    if (!analysis) {
      console.error('Analysis not found for user:', userId);
      return res.status(404).json({ error: "Analysis not found for this user." });
    }

    console.log('Found analysis:', analysis);
    res.status(200).json(analysis);
  } catch (error) {
    console.error('Error fetching user analysis:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export { triggerUserAnalysis, getUserAnalysis };
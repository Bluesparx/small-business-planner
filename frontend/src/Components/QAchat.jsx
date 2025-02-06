import React, { useEffect, useState, useRef } from "react";
import { getAnswer, getBalanceByUserId, getIncomeByUserId } from "../utils/apiRequest";

const QnAForm = ({ analyzedData, predictions }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [balanceSheet, setBalanceSheet] = useState(null);
  const [incomeStatement, setIncomeStatement] = useState(null);
  const [messages, setMessages] = useState([]);
  
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const storedMessages = sessionStorage.getItem('chatMessages');
    
    if (!storedMessages) {
      setMessages([
        { type: "bot", text: "Hello, I am your financial assistant. Feel free to ask me any questions about your financial trends, metrics, or overall performance. I'm here to help you understand and analyze your data." }
      ]);
      
    } else {
      setMessages(JSON.parse(storedMessages));
    }
    scrollToBottom();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const balance = await getBalanceByUserId();
        const income = await getIncomeByUserId();
        setBalanceSheet(balance);
        setIncomeStatement(income);
      } catch (error) {
        console.error("Error fetching financial data:", error);
      }
    };

    fetchData();
  }, []);

  const handleAskQuestion = async () => {
    if (!question.trim()) return;
    
    setLoading(true);
    const userMessage = question;

    try {
      const data = { question, analyzedData, predictions, balanceSheet, incomeStatement };
      const res = await getAnswer(data);
      const botMessage = res.answer;

      // Update the messages state
      const newMessages = [...messages, 
        { type: "user", text: userMessage }, 
        { type: "bot", text: botMessage }
      ];
      
      setMessages(newMessages);
      
      // Store the updated messages in sessionStorage
      sessionStorage.setItem('chatMessages', JSON.stringify(newMessages));

      setAnswer(botMessage);
      setQuestion(""); 
    } catch (error) {
      setMessages(prev => [...prev, 
        { type: "user", text: userMessage }, 
        { type: "bot", text: "Error fetching answer." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!loading && question.trim()) {
        handleAskQuestion();
      }
    }
  };

  return (
    <div className="min-w-[26vw] dark:bg-[#4e4e4e] bg-white mx-auto p-2 rounded-xl shadow-lg">
      <div className="flex flex-col space-y-4">
        
        <div 
          ref={containerRef}
          className="flex-1 overflow-y-auto px-2 min-h-[62vh] max-h-[62vh] dark:bg-[#4e4e4e] rounded-xl bg-gray-50 scroll-smooth"
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"} py-1`}
            >
              <div
                className={`max-w-xs md:max-w-md px-4 py-2 rounded-3xl ${
                  msg.type === "user" 
                    ? "bg-indigo-600 text-white" 
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                <p className="whitespace-pre-wrap break-words">{msg.text}</p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="max-w-xs px-4 py-2 text-white bg-gray-400 rounded-lg animate-pulse">
                Loading...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex items-center ">
          <input
            type="text"
            placeholder="Ask a question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full p-3 border text-gray-700 border-gray-300 rounded-l-xl shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleAskQuestion}
            disabled={loading || !question.trim()}
            className="px-6 py-3 bg-indigo-600 text-white rounded-r-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors"
          >
            {loading ? "Loading..." : "Send"}
          </button>

        </div>
      </div>
    </div>
  );
};

export default QnAForm;

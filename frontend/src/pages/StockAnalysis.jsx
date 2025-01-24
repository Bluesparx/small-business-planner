import React, { useState, useEffect } from "react";
import axios from "axios";
import StockPredictionGraph from "@/Components/StockPredictionGraph";
import { PredictionsTable } from "@/Components/ui/PredictionsTable";

const StockAnalysis = () => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch user analysis data based on userId (e.g. from backend API)
  const getUserAnalysis = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/getprediction?user_id=${userId}`);
      return response.data;  // Assuming response contains predictions
    } catch (error) {
      throw error;
    }
  };

  // Fetch data from backend using the user's ID
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));  // Retrieve user data from localStorage
    const userId = user?._id;  // Extract userId

    if (userId) {
      getUserAnalysis(userId)
        .then((data) => {
          setPredictions(data.predictions);  // Set the predictions to state
          setLoading(false);  // Stop the loading state
        })
        .catch((error) => {
          console.error('Error fetching analysis data:', error);
          setError("Failed to fetch data.");  // Handle error state
          setLoading(false);
        });
    } else {
      setError("User not logged in.");
      setLoading(false);
    }
  }, []); // Empty array means this effect runs once on mount

  // Loading and Error States
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-cyan-500"></div>
        <p className="mt-4 text-lg text-gray-600">Loading stock data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px]">
        <p className="mb-4 text-lg text-red-500">{error}</p>
        <button
          onClick={() => window.location.reload()} // Retry loading data by reloading page
          className="px-6 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  // Filter out data (every 5th prediction)
  const filteredPredictions = predictions.filter((_, index) => index % 5 === 0);

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">
            Stock Analysis
          </h1>
          <p className="mt-2">
            Analyze predicted stock performance using the graph and table below.
          </p>
        </div>

        {/* Stock Prediction Graph */}
        <div className="shadow-lg rounded-lg p-4 sm:p-6">
          <StockPredictionGraph predictions={predictions} />
        </div>

        {/* Predictions Table */}
        <div className="shadow-lg rounded-lg p-4 sm:p-6">
          <PredictionsTable predictions={filteredPredictions} />
        </div>
      </div>
    </div>
  );
};

export default StockAnalysis;

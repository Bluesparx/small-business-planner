import React, { useState, useEffect } from "react";
import StockPredictionGraph from "@/Components/StockPredictionGraph";
import { PredictionsTable } from "@/Components/ui/PredictionsTable";
import StockSuggestions from "@/Components/StockSuggestions";
import { getPredictions } from "@/utils/apiRequest";
import { Link } from "react-router-dom";

const StockAnalysis = () => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const data = await getPredictions();
        if (data) {
          setPredictions(data.predictions);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching analysis data:", error);
        setError("Please input data."); 
        setLoading(false);
      }
    };

    if (localStorage.getItem("token")) {
      fetchPredictions();
    } else {
      setError("User not logged in.");
      setLoading(false);
    }
  }, []);

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
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <p className="text-xl font-semibold text-gray-600">
          No Analytics Data Available
        </p>
        <Link to="/stockInput" className="text-blue-600 hover:underline mt-4">
          Upload Stock Data
        </Link>
      </div>
    );
  }

  // Check if predictions data is empty
  if (!predictions || predictions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <p className="text-xl font-semibold text-gray-600">
          No Analytics Data Available
        </p>
        <Link to="/stockInput" className="text-blue-600 hover:underline mt-4">
          Upload Financial Data
        </Link>
      </div>
    );
  }

  const filteredPredictions = predictions.filter((_, index) => index % 5 === 0);

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="px-4 py-2 mx-auto">
        {/* Page Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Stock Analysis</h1>
          <p className="mt-2">
            Detailed analysis of predicted stock performance and business implications associated with it in future.
          </p>
        </div>

        {/* Stock Prediction Graph */}
        <div className="p-4 sm:p-6">
          <StockPredictionGraph predictions={predictions} />
        </div>

        <div className="p-4 w-full sm:p-6">
          <StockSuggestions predictions={predictions} />
        </div>
      </div>
    </div>
  );
};

export default StockAnalysis;

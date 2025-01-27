import React, { useState } from "react";
import axios from "axios";
import { Button } from "../Components/ui/button";
import { Input } from "../Components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../Components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const StockAnalysis = ({ setError }) => {
  const [historicalDataFile, setHistoricalDataFile] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const { files } = e.target;
    setHistoricalDataFile(files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!historicalDataFile) {
      setError("Historical data file is required.");
      return;
    }

    const formData = new FormData();
    formData.append("historical_data", historicalDataFile);

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/analyze_historical",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setAnalysisData(response.data);
      setError("");
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "An error occurred while processing the data."
      );
    } finally {
      setLoading(false);
    }
  };

  const renderChart = () => {
    if (!analysisData?.historical_analysis) return null;

    const chartData = analysisData.historical_analysis.map((item) => ({
      date: new Date(item.Date).toLocaleDateString(),
      predictedClose: parseFloat(item["Predicted Close"]),
    }));

    return (
      <div className="flex flex-col items-center py-6">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 20, left: 0, bottom: 40 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              interval={15}
              tick={{ angle: -45, textAnchor: "end", fontSize: 12 }}
              height={60}
            />
            <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
            <Tooltip
              formatter={(value) => [
                `$${value.toLocaleString()}`,
                "Predicted Close",
              ]}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="predictedClose"
              stroke="#2563eb"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center w-full p-6">
      <Card className="w-full max-w-2xl mt-6 bg-blue-100  shadow-xl">
        <CardHeader>
          <CardTitle>Stock Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          {analysisData && renderChart()}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Upload Historical Data
              </label>
              <Input
                type="file"
                name="historical_data"
                onChange={handleFileChange}
                className="w-full bg-gray-100"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Analyzing..." : "Analyze Data"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default StockAnalysis;

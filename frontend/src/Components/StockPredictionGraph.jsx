import React, { useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ChevronUpIcon, ChevronDownIcon, TrendingUpIcon, AlertCircle, ArrowUpIcon, ArrowDownIcon } from "lucide-react";

const StockPredictionGraph = ({ predictions, showAnalytics = true }) => {
  const [timeRange, setTimeRange] = useState("90d");

  // Transform the predictions object into an array first
  const transformedData = useMemo(() => {
    const predictionArray = [];
    for (let key in predictions) {
      if (predictions.hasOwnProperty(key) && !isNaN(key)) {
        predictionArray.push({
          date: new Date(predictions[key].Date),  // Convert to Date object immediately
          closingPrice: predictions[key]["Predicted Close"]
        });
      }
    }
    // Sort by date
    return predictionArray.sort((a, b) => a.date - b.date);
  }, [predictions]);

  const filteredData = useMemo(() => {
    if (!transformedData.length) return [];

    const today = new Date();
    const startDate = new Date(today);

    switch (timeRange) {
      case "7d":
        startDate.setDate(today.getDate() + 7);
        break;
      case "30d":
        startDate.setDate(today.getDate() + 30);
        break;
      case "90d":
      default:
        startDate.setDate(today.getDate() + 90);
        break;
    }

    return transformedData.filter(item => item.date <= startDate);
  }, [timeRange, transformedData]);

  const startPrice = filteredData[0]?.closingPrice || 0;
  const endPrice = filteredData[filteredData.length - 1]?.closingPrice || 0;
  const priceChange = endPrice - startPrice;
  const percentageChange = startPrice !== 0 ? ((priceChange / startPrice) * 100).toFixed(2) : 0;
  const isPositive = priceChange >= 0;

  // Calculate metrics for suggestions
  const analyzePredictions = useMemo(() => {
    if (filteredData.length < 2) return null;

    let volatility = 0;
    let shortTermTrend = 0;
    let highestPrice = filteredData[0].closingPrice;
    let lowestPrice = filteredData[0].closingPrice;

    for (let i = 1; i < filteredData.length; i++) {
      const curr = filteredData[i];
      const prev = filteredData[i - 1];
      
      volatility += Math.abs((curr.closingPrice - prev.closingPrice) / prev.closingPrice);
      
      if (i < 7) {
        shortTermTrend += (curr.closingPrice - prev.closingPrice);
      }
      

      if (curr.closingPrice > highestPrice) highestPrice = curr.closingPrice;
      if (curr.closingPrice < lowestPrice) lowestPrice = curr.closingPrice;
    }

    volatility = volatility / (filteredData.length - 1);
    
    return {
      volatility,
      shortTermTrend,
      highestPrice,
      lowestPrice,
      currentPrice: endPrice,
      distanceFromHigh: ((highestPrice - endPrice) / highestPrice) * 100,
      distanceFromLow: ((endPrice - lowestPrice) / lowestPrice) * 100
    };
  }, [filteredData]);

  const analyzeBusinessMetrics = analyzePredictions;

  return (
<Card className="p-4 dark:bg-[#24242f] dark:border-[#2d2d30] shadow-lg">
  <CardHeader className="flex-row items-center justify-between border-b p-6">
    <div>
      <CardTitle className="text-2xl font-bold flex items-center gap-2">
        <TrendingUpIcon className="w-6 h-6 text-blue-600" />
        Stock Prediction Graph
      </CardTitle>
      <CardDescription>
        Predicted stock closing values for the next{" "}
        {timeRange === "90d" ? "90 days" : timeRange === "30d" ? "30 days" : "7 days"}
      </CardDescription>
    </div>
    <div className="flex gap-2">
      <Button
        variant={timeRange === "7d" ? "default" : "outline"}
        size="sm"
        onClick={() => setTimeRange("7d")}
        className="hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        7d
      </Button>
      <Button
        variant={timeRange === "30d" ? "default" : "outline"}
        size="sm"
        onClick={() => setTimeRange("30d")}
        className="hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        30d
      </Button>
      <Button
        variant={timeRange === "90d" ? "default" : "outline"}
        size="sm"
        onClick={() => setTimeRange("90d")}
        className="hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        90d
      </Button>
    </div>
  </CardHeader>
  <CardContent className="p-6">
    <div className="flex justify-between gap-6">
      <div className="flex-1">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-muted-foreground">Predicted Value</p>
            <p className="text-2xl font-bold">${endPrice.toFixed(2)}</p>
          </div>
          <div className="flex items-center gap-2">
            {isPositive ? (
              <ChevronUpIcon className="w-6 h-6 text-green-600" />
            ) : (
              <ChevronDownIcon className="w-6 h-6 text-red-600" />
            )}
            <span
              className={`font-semibold ${isPositive ? "text-green-600" : "text-red-600"}`}
            >
              ${Math.abs(priceChange).toFixed(2)} ({percentageChange}%)
            </span>
          </div>
        </div>

        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={filteredData.map((item) => ({
                ...item,
                date: item.date.toISOString(),
              }))}
            >
              <defs>
                <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid horizontal={false} stroke="#e5e7eb" strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickLine={true}
                axisLine={{ stroke: "#4b5563" }}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) =>
                  new Date(value).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                }
              />
              <YAxis
                tickLine={true}
                axisLine={{ stroke: "#4b5563" }}
                tickMargin={8}
                tickFormatter={(value) => `$${value.toFixed(2)}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#374151",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  border: "none"
                }}
                labelFormatter={(value) =>
                  new Date(value).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                }
                formatter={(value) => [`$${value.toFixed(2)}`, "Predicted Close"]}
              />
              <Area
                type="monotone"
                dataKey="closingPrice"
                stroke="#3b82f6"
                fill="url(#blueGradient)"
                fillOpacity={1}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Right side */}
      {showAnalytics && (
         <div className="w-96 flex flex-col"> 
          <h3 className="text-lg font-semibold mb-6 text-center">Strategy Insights</h3>
          {analyzeBusinessMetrics?.distanceFromHigh <= 5 && (
            <Alert className="dark:border-none">
              <div className="flex flex-row items-center gap-3">
                <ArrowUpIcon className="w-10 h-10 text-green-600" />
                <div className="flex flex-col">
                  <AlertTitle>Stock near historical high</AlertTitle>
                  <AlertDescription>
                    Optimal time for considering stock-based acquisitions & negotiating business partnerships.
                  </AlertDescription>
                </div>
              </div>
            </Alert>
          )}

          {analyzeBusinessMetrics?.distanceFromLow <= 10 && (
            <Alert className="dark:border-none">
              <div className="flex flex-row items-center gap-3">
                <ArrowDownIcon className="w-10 h-10 text-yellow-600" />
                <div className="flex flex-col">
                  <AlertTitle>Stock valuation potentially under-representing company value</AlertTitle>
                  <AlertDescription>
                    Consider increasing investor relations efforts to communicate business strength.
                  </AlertDescription>
                </div>
              </div>
            </Alert>
          )}

          {/* Market Stability */}
          {analyzeBusinessMetrics?.volatility >= 0.02 ? (
            <Alert className="dark:border-none">
              <div className="flex flex-row items-center gap-3">
                <AlertCircle className="w-10 h-10 text-yellow-600" />
                <div className="flex flex-col">
                  <AlertTitle>Higher market volatility observed</AlertTitle>
                  <AlertDescription>
                    Reinforce business stability message through consistent operational updates of long-term strategy.
                  </AlertDescription>
                </div>
              </div>
            </Alert>
          ) : (
            <Alert className="dark:border-none">
              <div className="flex flex-row items-center gap-3">
                <TrendingUpIcon className="w-10 h-10 text-green-600" />
                <div className="flex flex-col">
                  <AlertTitle>Stable market performance</AlertTitle>
                  <AlertDescription>
                    Indicates strong market confidence. Favorable conditions for announcing long-term strategic initiatives.
                  </AlertDescription>
                </div>
              </div>
            </Alert>
          )}

          {/* Growth Trajectory */}
          {analyzeBusinessMetrics?.shortTermTrend > 0 && (
            <Alert className="dark:border-none">
              <div className="flex flex-row items-center gap-3">
                <TrendingUpIcon className="w-10 h-10 text-blue-600" />
                <div className="flex flex-col">
                  <AlertTitle>Positive growth trajectory</AlertTitle>
                  <AlertDescription>
                    Favorable timing for announcing expansion plans, R&D initiatives, or strategic investments to maintain momentum.
                  </AlertDescription>
                </div>
              </div>
            </Alert>
          )}
        </div>
      )}
    </div>
  </CardContent>
</Card>

  );
};

export default StockPredictionGraph;

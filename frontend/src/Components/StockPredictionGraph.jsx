import React, { useState } from "react";
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
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const StockPredictionGraph = ({ predictions }) => {
  const [timeRange, setTimeRange] = useState("90d");

  // Filter chart data based on time range
  const filteredData = (() => {
    const getLastNEntries = (n) => predictions.slice(-n);
    switch (timeRange) {
      case "7d":
        return getLastNEntries(7);
      case "30d":
        return getLastNEntries(30);
      case "90d":
      default:
        return getLastNEntries(90);
    }
  })();

  

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Stock Prediction Graph</CardTitle>
          <CardDescription>
            Showing stock predictions for the last{" "}
            {timeRange === "90d"
              ? "90 entries"
              : timeRange === "30d"
              ? "30 entries"
              : "7 entries"}
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 90 entries" />
          </SelectTrigger>
          <SelectContent className="rounded-xl bg-white">
            <SelectItem value="90d" className="rounded-lg">
              Last 90 entries
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 entries
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 entries
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillPrediction" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00bcd4" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#00bcd4" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="Date"
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <YAxis domain={["auto", "auto"]} />
            <Tooltip
              formatter={(value) => value.toFixed(2)}
              labelFormatter={(label) => {
                const date = new Date(label);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <Area
              dataKey="Predicted Close"
              type="monotone"
              fill="url(#fillPrediction)"
              stroke="#00bcd4"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default StockPredictionGraph;

"use client";

import React, { useState, useMemo } from "react";
import { 
  CartesianGrid, 
  Line, 
  LineChart, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  Area
} from "recharts";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ChevronUpIcon, 
  ChevronDownIcon, 
  TrendingUpIcon 
} from "lucide-react";


export function StockChart() {
  const [timePeriod, setTimePeriod] = useState("1month");

  // Calculate the data for the selected time period
  const filteredData = useMemo(() => {
    const now = new Date();
    const filterByDays = (days) => {
      const cutoffDate = new Date(now.setDate(now.getDate() - days));
      return sampleData.filter((entry) => new Date(entry.date) >= cutoffDate);
    };

    switch (timePeriod) {
      case "1month":
        return filterByDays(30);
      case "3months":
        return filterByDays(90);
      case "6months":
        return filterByDays(180);
      default:
        return sampleData;
    }
  }, [timePeriod]);

  // Calculate performance metrics
  const startPrice = filteredData[0]?.closingPrice || 0;
  const endPrice = filteredData[filteredData.length - 1]?.closingPrice || 0;
  const priceChange = endPrice - startPrice;
  const percentageChange = ((priceChange / startPrice) * 100).toFixed(2);
  const isPositive = priceChange >= 0;

  return (
    <Card className="w-full max-w-4xl shadow-lg">
      <CardHeader className="flex-row items-center justify-between border-b p-6">
        <div>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <TrendingUpIcon className="w-6 h-6 text-green-600" />
            Stock Performance
          </CardTitle>
          <CardDescription>
            Interactive stock price visualization
          </CardDescription>
        </div>
        <div className="flex gap-2">
          {["1month", "3months", "6months"].map((period) => (
            <Button
              key={period}
              variant={timePeriod === period ? "default" : "outline"}
              size="sm"
              onClick={() => setTimePeriod(period)}
            >
              {period}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-muted-foreground">Total Value</p>
            <p className="text-2xl font-bold">
              ${endPrice.toLocaleString()}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {isPositive ? (
              <ChevronUpIcon className="w-6 h-6 text-green-600" />
            ) : (
              <ChevronDownIcon className="w-6 h-6 text-red-600" />
            )}
            <span className={`font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              ${Math.abs(priceChange).toFixed(2)} ({percentageChange}%)
            </span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={filteredData}>
            <CartesianGrid 
              horizontal={false} 
              stroke="#f3f4f6" 
            />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => 
                new Date(value).toLocaleDateString("en-US", { 
                  month: "short", 
                  day: "numeric" 
                })
              }
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              contentStyle={{ 
                backgroundColor: "#fff", 
                borderRadius: "8px", 
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)" 
              }}
              labelFormatter={(value) => 
                new Date(value).toLocaleDateString("en-US", { 
                  month: "short", 
                  day: "numeric", 
                  year: "numeric" 
                })
              }
            />
            <Area 
              type="monotone"
              dataKey="closingPrice"
              stroke="#32CD32"
              fill="url(#greenGradient)"
              fillOpacity={0.3}
            />
            <Line
              dataKey="closingPrice"
              type="monotone"
              stroke="#32CD32"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}



const sampleData = [
  { date: "2024-08-01", closingPrice: 100 },
  { date: "2024-08-08", closingPrice: 105 },
  { date: "2024-08-15", closingPrice: 103 },
  { date: "2024-08-22", closingPrice: 108 },
  { date: "2024-08-29", closingPrice: 105 },
  { date: "2024-09-05", closingPrice: 107 },
  { date: "2024-09-12", closingPrice: 110 },
  { date: "2024-09-19", closingPrice: 115 },
  { date: "2024-09-26", closingPrice: 128 },
  { date: "2024-09-04", closingPrice: 118 },
  { date: "2024-09-11", closingPrice: 130 },
  { date: "2024-09-18", closingPrice: 137 },
  { date: "2024-09-25", closingPrice: 145 },
  { date: "2024-10-01", closingPrice: 139 },
  { date: "2024-10-08", closingPrice: 150 },
  { date: "2024-10-15", closingPrice: 163 },
  { date: "2024-10-22", closingPrice: 165 },
  { date: "2024-10-29", closingPrice: 161 },
  { date: "2024-10-06", closingPrice: 174 },
  { date: "2024-11-13", closingPrice: 185 },
  { date: "2024-11-20", closingPrice: 190 },
  { date: "2024-11-27", closingPrice: 194 },
  { date: "2024-12-03", closingPrice: 189 },
  { date: "2024-12-10", closingPrice: 200 },
  { date: "2024-12-17", closingPrice: 210 },
  { date: "2024-12-24", closingPrice: 212 },
  { date: "2025-01-03", closingPrice: 223 },
  { date: "2025-01-10", closingPrice: 228 },
  { date: "2025-01-17", closingPrice: 230 },
  { date: "2025-01-24", closingPrice: 232 },
];
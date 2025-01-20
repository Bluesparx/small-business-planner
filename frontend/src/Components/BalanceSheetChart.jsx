import React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";

const chartConfig = {
  currentRatio: {
    label: "Current Ratio",
    color: "#2febac",
  },
  quickRatio: {
    label: "Quick Ratio",
    color: "#2f77eb",
  },
};

const CustomBar = ({ fill, x, y, width, height }) => {
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={fill}
      rx={4}
      ry={4}
      className="transition-colors duration-200"
    />
  );
};

const BalanceSheetChart = ({ data }) => {
  const transformedData = data?.map(item => ({
    date: item.date,
    currentRatio: item.currentRatio,
    quickRatio: item.quickCurrentRatio,
  })) || [];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Balance Sheet Metrics</CardTitle>
        <CardDescription>Current & Quick Ratios</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-60 w-80">
          <BarChart
            data={transformedData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="date"
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short' })}
            />
            <YAxis />
            <Tooltip
              cursor={false}
              content={({ active, payload }) => {
                if (active && payload?.length) {
                  const { currentRatio, quickRatio, date } = payload[0].payload;
                  return (
                    <div
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.75)",
                      color: "black",
                      padding: "10px", 
                      borderRadius: "5px",
                    }}
                  >
                      <p className="font-medium">{new Date(date).toLocaleDateString('en-US')}</p>
                      <p className="text-sm text-gray-600">Current Ratio: {currentRatio.toFixed(4)}</p>
                      <p className="text-sm text-gray-600">Quick Ratio: {quickRatio.toFixed(4)}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar
              dataKey="currentRatio"
              fill={chartConfig.currentRatio.color}
              shape={<CustomBar />}
              isAnimationActive={false}
            />
            <Bar
              dataKey="quickRatio"
              fill={chartConfig.quickRatio.color}
              shape={<CustomBar />}
              isAnimationActive={false}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default BalanceSheetChart;
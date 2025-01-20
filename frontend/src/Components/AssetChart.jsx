import React from 'react';
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";

const chartConfig = {
  roa: {
    label: "Return on Assets",
    color: "#5365cf",
  },
  assetTurnover: {
    label: "Asset Turnover",
    color: "#e6c85e",
  },
};

const AssetChart = ({ data }) => {
  const transformedData = data?.map(item => ({
    date: item.date,
    roa: item["Return on Assets"],
    assetTurnover: item["Asset Turnover"]
  })) || [];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Asset Efficiency Metrics</CardTitle>
        <CardDescription>Return on Assets & Asset Turnover</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-60 w-80">
          <LineChart
            data={transformedData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              {Object.entries(chartConfig).map(([key, { color }]) => (
                <linearGradient key={key} id={`gradient-${key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={color} stopOpacity={0.1} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short' })} />
            <YAxis tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} />
            <Tooltip
              content={(props) => {
                const { active, payload } = props;
                if (active && payload && payload.length) {
                  const { roa, assetTurnover, date } = payload[0].payload;
                  return (
                    <div
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.75)", 
                        color: "black",
                        padding: "10px", 
                        borderRadius: "5px",
                      }}
                    >
                      <p>{`Date: ${new Date(date).toLocaleDateString('en-US')}`}</p>
                      <p>{`Return on Assets: ${(roa * 100).toFixed(2)}%`}</p>
                      <p>{`Asset Turnover: ${(assetTurnover * 100).toFixed(2)}%`}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Line
              type="linear"
              dataKey="roa"
              stroke={chartConfig.roa.color}
              fill={`url(#gradient-roa)`}
              fillOpacity={0.6}
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="linear"
              dataKey="assetTurnover"
              stroke={chartConfig.assetTurnover.color}
              fill={`url(#gradient-assetTurnover)`}
              fillOpacity={0.6}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default AssetChart;

import React from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartConfig = {
  operatingMargin: {
    label: "Operating Margin",
    color: "#874bd6", 
  },
  netProfit: {
    label: "Net Profit",
    color: "#0fa314",
  },
};

const ProfitabilityChart = ({ data }) => {
  const transformedData = data?.map(item => ({
    date: item.date,
    operatingMargin: item.OperatingProfitMargin,
    netProfit: item.NetProfitRatio
  })) || [];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Profitability Metrics</CardTitle>
        <CardDescription>Operating Margin & Net Profit</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-60 w-80">
          <AreaChart
            data={transformedData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              {Object.entries(chartConfig).map(([key, { color }], index) => (
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
                  const { operatingMargin, netProfit, date } = payload[0].payload;
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
                      <p>{`Operating Margin: ${(operatingMargin * 100).toFixed(2)}%`}</p>
                      <p>{`Net Profit: ${(netProfit * 100).toFixed(2)}%`}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            
            <Area
              type="monotone"
              dataKey="operatingMargin"
              stroke={chartConfig.operatingMargin.color}
              fill={`url(#gradient-operatingMargin)`}
              fillOpacity={0.6}
            />
            <Area
              type="monotone"
              dataKey="netProfit"
              stroke={chartConfig.netProfit.color}
              fill={`url(#gradient-netProfit)`}
              fillOpacity={0.6}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ProfitabilityChart;

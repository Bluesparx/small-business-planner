import React from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/Components/ui/chart";

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

  // Calculate the number of ticks (up to 5, or less depending on the data length)
  const maxTicks = 5;
  const tickCount = Math.min(transformedData.length, maxTicks);

  // Calculate the interval (spacing) to ensure even distribution of the ticks
  const tickInterval = transformedData.length > 1 ? Math.floor(transformedData.length / tickCount) : 1;

  return (
    <Card className="w-full dark:bg-[#24222e] dark:border-none border-gray-300">
      <CardHeader>
        <CardTitle className='text-white'>Profitability Metrics</CardTitle>
        <CardDescription className='dark:text-white/80'>Operating Margin & Net Profit</CardDescription>
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
            <XAxis
              dataKey="date"
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short' })}
              tickCount={tickCount} // Set tick count to 5 or fewer
              interval={tickInterval} // Evenly space out the ticks
            />
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

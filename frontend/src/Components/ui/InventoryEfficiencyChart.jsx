import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'; // Ensure this import
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { TrendingUp } from 'lucide-react'; // Assuming you're still using this for footer

const InventoryEfficiencyChart = ({ data }) => {
  // Transform data for chart by formatting the date to display only the month
  const transformedData = data?.map(item => ({
    date: new Date(item.date).toLocaleString('en-US', { month: 'short' }), // Format to display short month names
    inventoryTurnover: item.inventoryTurnover,
  })) || [];

  return (
    <Card className="w-full dark:border-none dark:bg-[#4e4e4e]">
      <CardHeader>
        <CardTitle>Inventory Efficiency</CardTitle>
      </CardHeader>
      <CardContent>
        <AreaChart width={500} height={300} data={transformedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value} // Use the formatted month name directly
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickCount={4}
            tickFormatter={(value) => `${value}x`}
          />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="inventoryTurnover"
            stroke="#82ca9d"
            fill="#82ca9d"
            fillOpacity={0.4}
          />
        </AreaChart>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          
        </div>
      </CardFooter>
    </Card>
  );
};

export default InventoryEfficiencyChart;

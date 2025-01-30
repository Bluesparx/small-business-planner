import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/Components/ui/card';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

// Function to format the date to show only Month and Year (e.g., "January 2024")
const formatDate = (date) => {
  const d = new Date(date);
  const options = { year: 'numeric', month: 'long' }; // e.g., "January 2024"
  return d.toLocaleDateString('en-US', options);
};

const LiquidityRatiosChart = ({ data }) => {
  // Transform data for chart
  const transformedData = data?.map(item => ({
    date: formatDate(item.date), // Format the date to "Month YYYY"
    currentRatio: item.currentRatio,
    quickRatio: item.quickRatio,
  })) || [];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Liquidity Ratios</CardTitle>
      </CardHeader>
      <CardContent>
        <LineChart width={500} height={300} data={transformedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="currentRatio" stroke="#8884d8" />
          <Line type="monotone" dataKey="quickRatio" stroke="#82ca9d" />
        </LineChart>
      </CardContent>
    </Card>
  );
};

export default LiquidityRatiosChart;

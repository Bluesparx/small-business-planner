import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

// Function to format the date
const formatDate = (date) => {
  const d = new Date(date);
  const options = { year: 'numeric', month: 'long' };
  return d.toLocaleDateString('en-US', options);
};

// Normalize function to scale the data to 0-100 range
const normalizeData = (data, maxValue) => {
  return (data / maxValue) * 100;
};

const NormalizedLineChart = ({ data }) => {
  // Get the max value for each metric
  const maxValues = {
    AssetTurnover: Math.max(...data.map(item => item.AssetTurnover)),
    InterestCoverageRatio: Math.max(...data.map(item => item.InterestCoverageRatio)),
    NetProfitRatio: Math.max(...data.map(item => item.NetProfitRatio)),
    OperatingProfitMargin: Math.max(...data.map(item => item.OperatingProfitMargin)),
    ReturnOnAssets: Math.max(...data.map(item => item.ReturnOnAssets)),
    GrossProfitMargin: Math.max(...data.map(item => item.grossProfitMargin)),
  };

  const transformedData = data.map((item) => ({
    date: item.date ? formatDate(item.date) : 'Unknown',
    AssetTurnover: normalizeData(item.AssetTurnover, maxValues.AssetTurnover),
    InterestCoverageRatio: normalizeData(item.InterestCoverageRatio, maxValues.InterestCoverageRatio),
    NetProfitRatio: normalizeData(item.NetProfitRatio, maxValues.NetProfitRatio),
    OperatingProfitMargin: normalizeData(item.OperatingProfitMargin, maxValues.OperatingProfitMargin),
    ReturnOnAssets: normalizeData(item.ReturnOnAssets, maxValues.ReturnOnAssets),
    GrossProfitMargin: normalizeData(item.grossProfitMargin, maxValues.GrossProfitMargin),
  }));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Normalized Financial Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <LineChart width={450} height={500} data={transformedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="AssetTurnover" stroke="#FF6347" />
          <Line type="monotone" dataKey="InterestCoverageRatio" stroke="#FFD700" />
          <Line type="monotone" dataKey="NetProfitRatio" stroke="#00FA9A" />
          <Line type="monotone" dataKey="OperatingProfitMargin" stroke="#20B2AA" />
          <Line type="monotone" dataKey="ReturnOnAssets" stroke="#FF69B4" />
          <Line type="monotone" dataKey="GrossProfitMargin" stroke="#8A2BE2" />
        </LineChart>
      </CardContent>
    </Card>
  );
};

export default NormalizedLineChart;

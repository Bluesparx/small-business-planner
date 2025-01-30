import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/Components/ui/card';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, LabelList } from 'recharts';

// Function to format numbers as "K" for thousands, "M" for millions
const formatYAxis = (tick) => {
  if (tick >= 1000000) {
    return `${(tick / 1000000).toFixed(1)}M`;  // Converts to Millions (M)
  } else if (tick >= 1000) {
    return `${(tick / 1000).toFixed(1)}K`;  // Converts to Thousands (K)
  }
  return tick;
};

// Function to format the date to only show Month and Year (e.g., "January 2024")
const formatDate = (date) => {
  const d = new Date(date);
  const options = { year: 'numeric', month: 'long' }; // e.g., "January 2024"
  return d.toLocaleDateString('en-US', options);
};

// WorkingCapitalChart component accepts data as a prop
const WorkingCapitalChart = ({ data }) => {
  // Transform the input data to match chart requirements (ensure date and workingCapital are present)
  const transformedData = data?.map(item => ({
    date: formatDate(item.date), // Format the date to "Month YYYY"
    workingCapital: item.workingCapital,
  })) || []; // Default to an empty array if data is not available

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Working Capital Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <BarChart 
            width={500} 
            height={300} 
            data={transformedData} 
            margin={{ top: 20, right: 20, bottom: 20, left: 40 }}  // Adding left margin for Y-axis
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis tickFormatter={formatYAxis} tickCount={6} />
            <Tooltip />
            <Bar dataKey="workingCapital" fill="#8884d8" radius={4}>
              <LabelList dataKey="date" position="top" fontSize={12} />
              <LabelList dataKey="workingCapital" position="right" fontSize={12} />
            </Bar>
          </BarChart>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkingCapitalChart;

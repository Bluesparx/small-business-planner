import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

// Function to format data for pie chart based on provided structure
const formatDataForPieChart = (data) => {
  return [
    {
      name: 'Gross Profit Margin',
      value: data?.grossProfitMargin || 0,
    },
    {
      name: 'Operating Profit Margin',
      value: data?.OperatingProfitMargin || 0,
    },
    {
      name: 'Net Profit Ratio',
      value: data?.NetProfitRatio || 0,
    },
  ];
};

const ProfitabilityPieChart = ({ data }) => {
  const [selectedDate, setSelectedDate] = useState(data[0]?.date);
  const [selectedData, setSelectedData] = useState(null);

  // Function to format date for the dropdown options
  const formatDateForDropdown = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long' }); // e.g., "September 2024"
  };

  // Update selected data based on selected date
  useEffect(() => {
    const newSelectedData = data.find(item => item.date === selectedDate);
    setSelectedData(newSelectedData);
  }, [selectedDate, data]);

  // If no data found for the selected date, return a loading or no data message
  if (!selectedData) {
    return <div>No data available for the selected date.</div>;
  }

  // Pie chart data based on the selected date
  const pieChartData = formatDataForPieChart(selectedData);

  const colors = ['#8884d8', '#82ca9d', '#ffc658']; // Color options for each segment

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Profitability Ratios</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Dropdown for selecting date */}
        <div className="flex flex-col items-start mb-4 ">
          <label htmlFor="date-selector" className="font-semibold mb-2 ">Select Date:</label>
          <select
            id="date-selector"
            onChange={(e) => setSelectedDate(e.target.value)}
            className="p-2 border rounded dark:bg-[#252630]"
            value={selectedDate}
          >
            {data.map((item, index) => (
              <option key={index} value={item.date}>
                {formatDateForDropdown(item.date)}
              </option>
            ))}
          </select>
        </div>

        {/* Pie Chart */}
        <PieChart width={400} height={300}>
          <Pie
            data={pieChartData}
            dataKey="value"
            nameKey="name"
            outerRadius={120}
            fill="#8884d8"
            label
          >
            {pieChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </CardContent>
    </Card>
  );
};

export default ProfitabilityPieChart;

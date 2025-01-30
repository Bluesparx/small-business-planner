import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/Components/ui/card';
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
      name: 'Interest Coverage Ratio',
      value: data?.InterestCoverageRatio || 0,
    },
  ];
};

const ProfitabilityPieChart = ({ data }) => {
  const [selectedDate, setSelectedDate] = useState(data?.[0]?.date || '');
  const [selectedData, setSelectedData] = useState(null);

  // Function to format date for the dropdown options
  const formatDateForDropdown = (date) => {
    const d = new Date(date);
    return !isNaN(d.getTime()) ? d.toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : ''; // handle invalid dates
  };

  // Update selected data based on selected date
  useEffect(() => {
    if (selectedDate) {
      const newSelectedData = data.find(item => item.date === selectedDate);
      setSelectedData(newSelectedData || {});
    }
  }, [selectedDate, data]);

  // If no data found for the selected date, return a loading or no data message
  if (!data || data.length === 0) {
    return <div>No data available.</div>;
  }

  if (!selectedData || Object.keys(selectedData).length === 0) {
    return <div>No data available for the selected date.</div>;
  }

  // Pie chart data based on the selected date
  const pieChartData = formatDataForPieChart(selectedData);

  // Check if all pie chart segments are 0
  const isAllZero = pieChartData.every(item => item.value === 0);

  const colors = ['#8884d8', '#82ca9d', '#ffc658']; // Color options for each segment

  return (
    <Card className="w-full dark:border-none border-gray-300 dark:bg-[#24222e]">
      <CardHeader>
        <div className="flex justify-between items-center w-full">
          <CardTitle>Profitability Ratios</CardTitle>
          {/* Dropdown for selecting date */}
          <div className="flex items-center">
            <label htmlFor="date-selector" className="font-semibold mr-2">
              Select Date:
            </label>
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
        </div>
      </CardHeader>
      <CardContent>
        
        {isAllZero ? (
          <div className="text-center text-gray-500">No profitability data available for this date.</div>
        ) : (
          <div className="flex justify-center items-center">
          <PieChart width={380} height={240}>
              <Pie
              data={pieChartData}
              dataKey="value"
              nameKey="name"
              outerRadius={60}
              fill="#8884d8"
              label
            >
              {pieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend layout="horizontal"/>
          </PieChart>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfitabilityPieChart;

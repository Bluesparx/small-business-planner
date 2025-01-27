import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const SIPCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(1000);
  const [annualRate, setAnnualRate] = useState(12);
  const [years, setYears] = useState(5);
  const [data, setData] = useState([]);

  useEffect(() => {
    calculateSIP();
  }, [monthlyInvestment, annualRate, years]);

  const calculateSIP = () => {
    const ratePerMonth = annualRate / 12 / 100;
    const months = years * 12;
    const chartData = [];

    let totalInvestment = 0;
    let maturityAmount = 0;

    for (let i = 1; i <= months; i++) {
      totalInvestment += monthlyInvestment;
      maturityAmount =
        totalInvestment * Math.pow(1 + ratePerMonth, i) -
        monthlyInvestment * ((Math.pow(1 + ratePerMonth, i) - 1) / ratePerMonth);

      chartData.push({
        month: i,
        MaturityAmount: parseFloat(maturityAmount.toFixed(2)),
        TotalInvestment: parseFloat(totalInvestment.toFixed(2)),
      });
    }
    setData(chartData);
  };

  return (
    <div className=" mx-auto p-6 max-w-4xl  rounded-2xl space-y-8">
      <div className="p-6  shadow rounded-2xl">
        <h1 className="text-2xl font-bold text-center mb-4">SIP Calculator</h1>
        <div className="space-y-4">
          <label className="block">
            <span >Monthly Investment (₹)</span>
            <input
              type="range"
              min="500"
              max="50000"
              step="500"
              value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(parseInt(e.target.value))}
              className="mt-1 block w-full"
            />
            <div className="text-sm ">₹{monthlyInvestment}</div>
          </label>
          <label className="block">
            <span >Annual Rate of Interest (%)</span>
            <input
              type="range"
              min="1"
              max="20"
              step="0.1"
              value={annualRate}
              onChange={(e) => setAnnualRate(parseFloat(e.target.value))}
              className="mt-1 block w-full"
            />
            <div className="text-sm ">{annualRate}%</div>
          </label>
          <label className="block">
            <span >Investment Duration (Years)</span>
            <input
              type="range"
              min="1"
              max="30"
              step="1"
              value={years}
              onChange={(e) => setYears(parseInt(e.target.value))}
              className="mt-1 block w-full"
            />
            <div className="text-sm ">{years} years</div>
          </label>
        </div>
      </div>

      <div className="p-6 shadow rounded-2xl">
        <h2 className="text-xl font-bold text-center mb-4">SIP Maturity Visualization</h2>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              label={{ value: "Month", position: "insideBottomRight", offset: -5 }}
            />
            <YAxis
              label={{ value: "Amount (₹)", angle: -90, position: "insideLeft" }}
            />
            <Tooltip formatter={(value) => `₹${value}`} />
            <Area
              type="monotone"
              dataKey="MaturityAmount"
              stroke="#8884d8"
              fill="#8884d8"
              name="Maturity Amount"
            />
            <Area
              type="monotone"
              dataKey="TotalInvestment"
              stroke="#82ca9d"
              fill="#82ca9d"
              name="Total Investment"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SIPCalculator;

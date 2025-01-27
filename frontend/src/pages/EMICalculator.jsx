import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState(25000);
  const [annualInterest, setAnnualInterest] = useState(4);
  const [monthsToPay, setMonthsToPay] = useState(24);
  const [emi, setEMI] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, annualInterest, monthsToPay]);

  const calculateEMI = () => {
    const monthlyInterest = (annualInterest * 0.01) / 12;
    const EMI = (
      (loanAmount * monthlyInterest * Math.pow(1 + monthlyInterest, monthsToPay)) /
      (Math.pow(1 + monthlyInterest, monthsToPay) - 1)
    ).toFixed(2);
    setEMI(EMI);
    generateChartData(EMI, loanAmount, monthsToPay, monthlyInterest);
  };

  const generateChartData = (emi, principal, months, rate) => {
    const chartData = [];
    let balance = principal;
    for (let i = 1; i <= months; i++) {
      const interest = balance * rate;
      const principalPaid = emi - interest;
      balance -= principalPaid;
      chartData.push({
        month: i,
        EMI: parseFloat(emi),
        Interest: parseFloat(interest.toFixed(2)),
        Principal: parseFloat(principalPaid.toFixed(2)),
      });
    }
    setData(chartData);
  };

  return (
    <div className=" mx-auto p-6 max-w-4xl  space-y-8">
      <div className="p-6 shadow rounded-2xl">
        <h1 className="text-2xl font-bold text-center mb-4">EMI Calculator</h1>
        <div className="space-y-4">
          <label className="block">
            <span >Principal Loan Amount (₹)</span>
            <input
              type="range"
              min="1000"
              max="1000000"
              step="1000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(parseFloat(e.target.value))}
              className="mt-1 block w-full"
            />
            <div className="text-sm ">₹{loanAmount}</div>
          </label>
          <label className="block">
            <span >Annual Interest Rate (%)</span>
            <input
              type="range"
              min="1"
              max="20"
              step="0.1"
              value={annualInterest}
              onChange={(e) => setAnnualInterest(parseFloat(e.target.value))}
              className="mt-1 block w-full"
            />
            <div className="text-sm ">{annualInterest}%</div>
          </label>
          <label className="block">
            <span >No. of Months to Pay</span>
            <input
              type="range"
              min="1"
              max="360"
              step="1"
              value={monthsToPay}
              onChange={(e) => setMonthsToPay(parseInt(e.target.value))}
              className="mt-1 block w-full"
            />
            <div className="text-sm ">{monthsToPay} months</div>
          </label>
        </div>
        <p className="mt-4 text-lg font-semibold">
          Monthly Payment (~EMI): <span className="text-indigo-600">₹{emi}</span>
        </p>
      </div>

      <div className="p-6  shadow rounded-2xl">
        <h2 className="text-xl font-bold text-center mb-4">EMI Breakdown</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" label={{ value: "Month", position: "insideBottomRight", offset: -5 }} />
            <YAxis label={{ value: "Amount (₹)", angle: -90, position: "insideLeft" }} />
            <Tooltip />
            <Line type="monotone" dataKey="EMI" stroke="#8884d8" name="Total EMI" />
            <Line type="monotone" dataKey="Interest" stroke="#82ca9d" name="Interest" />
            <Line type="monotone" dataKey="Principal" stroke="#ffc658" name="Principal" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EMICalculator;

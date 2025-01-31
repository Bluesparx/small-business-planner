import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/Components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/Components/ui/table';
import { Button } from '@/Components/ui/button'; 

import { Link } from 'react-router-dom';
import ProfitabilityChart from '../Components/ProfitabilityChart';
import AssetChart from '../Components/AssetChart';
import { getUserAnalysis } from '../utils/apiRequest';
import { Loader, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import MetricsComparisonChart from '@/Components/ui/MetricsComparisonChart';
import ProfitMarginsPieChart from '@/Components/ui/ProfitMarginsPieChart';
import FinancialSuggestions from '@/Components/ui/finance_suggestion';
import YOUR_CONTRACT_ABI from '../abi/abi.json';
import { ethers } from 'ethers';

// Function to format values and add icons
const formatValueWithIcon = (value) => {
  if (typeof value === 'number') {
    const color = value < 0 ? 'text-red-600' : 'text-green-600';
    const icon = value < 0 ? (
      <ArrowDownCircle className={`${color} inline-block mr-2`} size={16} />
    ) : (
      <ArrowUpCircle className={`${color} inline-block mr-2`} size={16} />
    );
    return (
      <span className={`${color} flex items-center`}>
        {icon}
        {value.toFixed(2)}%
      </span>
    );
  }
  return value || 'N/A';
};

const MetricTable = ({ title, metrics }) => (
  <div className="overflow-hidden rounded-xl w-full shadow-lg dark:bg-[#24222e] border border-gray-300 dark:border-gray-500">
    <div className='text-center p-4 font-bold text-lg border-b border-gray-500'>{title}</div>
    <table className="w-full table-auto border-collapse">
      <thead className="dark:bg-[#413d53]/80 bg-gray-200">
        <tr>
          <th className="px-6 py-3 text-left text-sm font-semibold  border-b dark:border-gray-600 border-gray-300">Metric</th>
          <th className="px-6 py-3 text-left text-sm font-semibold border-b dark:border-gray-600 border-gray-300">Value</th>
        </tr>
      </thead>
      <tbody>
        {metrics.map((metric, index) => (
          <tr
            key={index}
            className={`${
              index % 2 === 0 ? 'dark:bg-[#2a263d] bg-gray-100' : 'dark:bg-[#24222e] bg-gray-200'
            } hover:bg-gray-700 transition duration-200`}
          >
            <td className="px-6 py-4 text-sm border-b  dark:border-gray-600 border-gray-300">
              {metric.name}
            </td>
            <td className="px-6 py-4 text-sm border-b dark:border-gray-600 border-gray-300">
              {formatValueWithIcon(metric.value)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const ChartDetail = ({ title, description, children }) => (
  <div className="space-y-2">
    <h3 className="text-lg font-semibold ">{title}</h3>
    <p className="text-sm ">{description}</p>
    {children}
  </div>
);

const AnalyticsPage = () => {
  const [analyzedData, setAnalyzedData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false); 
  const [userAddress, setUserAddress] = useState(null); 
  const [isMetamaskConnected, setIsMetamaskConnected] = useState(false); 
  const contractAddress = '0x3a84c0e541dfb3fe788634f25809066eface42c1';
  const contractABI = YOUR_CONTRACT_ABI;

  useEffect(() => {
    const checkMetamaskConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          if (accounts.length > 0) {
            setIsMetamaskConnected(true);
            setUserAddress(accounts[0]);
            checkSubscriptionStatus(accounts[0]);
          }
        } catch (error) {
          console.error('Error connecting to Metamask:', error);
        }
      } else {
        console.error('Metamask not installed');
      }
    };

    const checkSubscriptionStatus = async (address) => {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, contractABI, provider);
        const subscriptionStatus = await contract.checkSubscription(address);
        setIsSubscribed(subscriptionStatus);
      } catch (error) {
        console.error('Error checking subscription:', error);
      }
    };

    checkMetamaskConnection();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!isMetamaskConnected || !isSubscribed) {
        return; 
      }

      try {
        const data = await getUserAnalysis();
        setAnalyzedData(data);
      } catch (error) {
        console.error('Error fetching analysis data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [isMetamaskConnected, isSubscribed]);

  if (!isMetamaskConnected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <p className="text-xl font-semibold text-gray-600">Please connect to your metamask wallet</p>
        <Link to="/subscription">
          <Button className="mt-4 bg-gray-500">Connect</Button>
        </Link>
      </div>
    );
  }

  if (!isSubscribed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <p className="text-xl font-semibold text-gray-600">You must have an active subscription to access this page.</p>
        <Link to="/subscription">
          <Button className="mt-4" variant="primary">Pricing</Button>
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="animate-spin text-gray-500" size={48} />
      </div>
    );
  }

  if (!analyzedData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <p className="text-xl font-semibold text-gray-600">
          No Analytics Data Available
        </p>
        <Link to="/incomeS" className="text-blue-600 hover:underline">
          Upload Financial Data
        </Link>
      </div>
    );
  }

  const incomeStatementMetrics =
    analyzedData.growthIncomeStatement?.map((item) => ({
      name: item.IncomeMetric,
      value: item.OverallGrowth,
    })) || [];

  const balanceSheetMetrics =
    analyzedData.growthBalanceSheet?.map((item) => ({
      name: item.BalanceSheetMetric,
      value: item.OverallGrowth,
    })) || [];



  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12">
      <h1 className="text-3xl font-bold">Financial Analytics</h1>

      <section className="space-y-8">
        <div>
          <FinancialSuggestions data={analyzedData}/>
        </div>
        
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          <div className="col-span-1">
              <ProfitabilityChart data={analyzedData.incomeStatementAnalysis} />
          </div>
          <div className="col-span-1">
            <AssetChart data={analyzedData.incomeStatementAnalysis} />
            
          </div>
          <div className="col-span-1">
            <ProfitMarginsPieChart data={analyzedData.incomeStatementAnalysis} />
            
          </div>
          <div className="col-span-3">
            <MetricsComparisonChart data={analyzedData.incomeStatementAnalysis}/>            
          </div>
        </div>
        <div className='flex flex-row gap-6'>
        <MetricTable title="Income Statement Metrics" metrics={incomeStatementMetrics} />
        <MetricTable title="Balance Sheet Metrics" metrics={balanceSheetMetrics} />
        </div>
      </section>
    </div>
  );
};

export default AnalyticsPage;

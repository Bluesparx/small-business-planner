import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link } from 'react-router-dom';
import BalanceSheetChart from '../components/BalanceSheetChart';
import AssetChart from '../components/AssetChart';
import ProfitabilityChart from '../components/ProfitabilityChart';
import { getUserAnalysis, getPredictions } from '../utils/apiRequest';
import emptyDashImage from '../assets/empty_dash.svg';
import { Loader } from 'lucide-react';
import StockPredictionGraph from '@/components/StockPredictionGraph';

const formatValue = (value) => {
  if (typeof value === "number") {
    const isNegative = value < 0;
    const color = isNegative ? 'text-red-600' : 'text-green-600';  
    return (
      <span className={color}>
        {value.toFixed(2)}%
      </span>
    );
  }
  return value || "N/A";
};

const MetricTable = ({ title, metrics }) => (
  <Card className="w-full">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Metric</TableHead>
            <TableHead>Growth</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {metrics.map((metric) => (
            <TableRow key={metric.name}>
              <TableCell>{metric.name}</TableCell>
              <TableCell>{formatValue(metric.value)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const [analyzedData, setAnalyzedData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [predictions, setPredictions] = useState(null);

  useEffect(() => {
        const fetchPredictions = async () => {
          try {
            const data = await getPredictions();
            if (data) {
              setPredictions(data.predictions); 
              setIsLoading(false);
            }
          } catch (error) {
            console.error('Error fetching analysis data:', error);
            setIsLoading(false);
          }
        };
    
        if (localStorage.getItem('token')) {
          fetchPredictions();
        } 
        else {
          setIsLoading(false);
        }
      }, []);
  

  useEffect(() => {
    const fetchData = async () => {
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
  }, []);

  if (isLoading) {
    return <div className="text-center py-8"><Loader size={48} /></div>;
  }

  if (!analyzedData) {
    return (
      <div className="p-8 max-w-7xl mx-auto grid grid-cols-1 gap-6 space-y-6">
        <div className="flex flex-row w-full gap-6 mx-18 my-16">
          <Card className="flex-2 w-2/3 py-6">
            <CardContent className="flex flex-col items-center justify-center min-h-[400px]">
              <div
                className="w-1/2 h-60 bg-cover bg-center rounded-lg"
                style={{
                  backgroundImage: `url(${emptyDashImage})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover'
                }}
              />
              <p className="text-xl font-semibold text-gray-600 mt-4 mb-2">
                No Analytics Available
              </p>
              <p className="text-sm text-gray-500">
                Please upload financial statements to view analysis
              </p>
            </CardContent>
          </Card>

          <div className="flex-1 w-full">
            <Card className="py-8 px-2">
              <CardHeader>
                <CardTitle>Getting Started</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Upload Income Statement",
                      description: "Upload your company's income statement for financial analysis.",
                      link: "/incomeS"
                    },
                    {
                      title: "Upload Balance Sheet",
                      description: "Upload your balance sheet to analyze assets and liabilities.",
                      link: "/incomeS"
                    },
                    {
                      title: "Upload Stock Data",
                      description: "Import stock data to track market performance.",
                      link: "/stockS"
                    }
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <Link
                        to={item.link}
                        className="text-blue-600 hover:text-blue-800 font-medium block"
                      >
                        {item.title}
                      </Link>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Process income statement metrics
  const incomeStatementMetrics = [
    {
      name: "Gross Profit Margin",
      value: analyzedData.growthIncomeStatement?.find(
        (item) => item.IncomeMetric === "grossProfitMargin"
      )?.OverallGrowth,
    },
    {
      name: "Operating Profit Margin",
      value: analyzedData.growthIncomeStatement?.find(
        (item) => item.IncomeMetric === "OperatingProfitMargin"
      )?.OverallGrowth,
    },
    {
      name: "Interest Coverage Ratio",
      value: analyzedData.growthIncomeStatement?.find(
        (item) => item.IncomeMetric === "InterestCoverageRatio"
      )?.OverallGrowth,
    },
    {
      name: "Net Profit Ratio",
      value: analyzedData.growthIncomeStatement?.find(
        (item) => item.IncomeMetric === "NetProfitRatio"
      )?.OverallGrowth,
    },
    {
      name: "Asset Turnover",
      value: analyzedData.growthIncomeStatement?.find(
        (item) => item.IncomeMetric === "AssetTurnover"
      )?.OverallGrowth,
    },
    {
      name: "Return On Assets",
      value: analyzedData.growthIncomeStatement?.find(
        (item) => item.IncomeMetric === "ReturnOnAssets"
      )?.OverallGrowth,
    },
  ];

  const balanceSheetMetrics = [
    {
      name: "Current Ratio",
      value: analyzedData.growthBalanceSheet?.find(
        (item) => item.BalanceSheetMetric === "currentRatio"
      )?.OverallGrowth,
    },
    {
      name: "Quick Ratio",
      value: analyzedData.growthBalanceSheet?.find(
        (item) => item.BalanceSheetMetric === "quickCurrentRatio"
      )?.OverallGrowth,
    },
    {
      name: "Debt to Equity",
      value: analyzedData.growthBalanceSheet?.find(
        (item) => item.BalanceSheetMetric === "debtToEquityRatio"
      )?.OverallGrowth,
    },
    {
      name: "Inventory Turnover",
      value: analyzedData.growthBalanceSheet?.find(
        (item) => item.BalanceSheetMetric === "inventoryTurnover"
      )?.OverallGrowth,
    },
    {
      name: "Receivable Turnover",
      value: analyzedData.growthBalanceSheet?.find(
        (item) => item.BalanceSheetMetric === "receivableTurnover"
      )?.OverallGrowth,
    },
    {
      name: "Working Capital",
      value: analyzedData.growthBalanceSheet?.find(
        (item) => item.BalanceSheetMetric === "workingCapital"
      )?.OverallGrowth,
    },

    {
      name: "Average Age of Receivables",
      value: analyzedData.growthBalanceSheet?.find(
        (item) => item.BalanceSheetMetric === "averageAgeOfReceivables"
      )?.OverallGrowth,
    },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 gap-8">
        <div className="space-y-6">
          <div className='flex flex-row'>
            <div className="flex flex-col gap-4 w-3/5 mt-4 m-2">
              <MetricTable title="Balance Sheet Analysis" metrics={balanceSheetMetrics} />
              <MetricTable title="Income Statement Analysis" metrics={incomeStatementMetrics} />
              <StockPredictionGraph />
            </div>
            <div className="grid grid-cols-1 gap-4 m-2 p-2">
              <BalanceSheetChart data={analyzedData.balanceSheetAnalysis} />
              <ProfitabilityChart data={analyzedData.incomeStatementAnalysis} />
              <AssetChart data={analyzedData.incomeStatementAnalysis} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


import React, { useEffect, useState } from 'react'; 
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'; 
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'; 
import { Link } from 'react-router-dom'; 
import BalanceSheetChart from '../Components/BalanceSheetChart'; 
import AssetChart from '../Components/AssetChart'; 
import ProfitabilityChart from '../Components/ProfitabilityChart'; 
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
  <Card className="w-full dark:border-none border-gray-300 dark:bg-[#3b3944]">
    <CardHeader>
      <CardTitle className="text-lg">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <Table className='border-gray-500'>
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
    } else {
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
      <div className="p-8 max-w-7xl h-[90vh] mx-auto grid grid-cols-1 gap-6 space-y-6">
        <div className="flex flex-row w-full gap-6 mx-18 my-16">
          <Card className="flex-2 border-gray-200 shadow-lg dark:bg-[#252630] dark:border-none w-2/3 py-6">
            <CardContent className="flex flex-col items-center justify-center min-h-[400px]">
              <div
                className="w-1/2 h-60 mb-4 bg-cover bg-center rounded-lg"
                style={{
                  backgroundImage: `url(${emptyDashImage})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover'
                }}
              />
              <p className="text-xl font-semibold dark:text-white text-gray-600 mt-8 mb-2">
                No Analytics Available
              </p>
              <p className="text-sm text-gray-500">
                Please upload financial statements to view analysis
              </p>
            </CardContent>
          </Card>
          <div className="flex-1 w-full">
            <Card className="py-8 border-gray-200 shadow-lg dark:bg-[#252630] dark:border-gray-900 px-2">
              <CardHeader>
                <CardTitle className="text-xl">Getting Started</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[ 
                    { title: "Upload Income Statement", description: "Upload your company's income statement for financial analysis.", link: "/incomeS" },
                    { title: "Upload Balance Sheet", description: "Upload your balance sheet to analyze assets and liabilities.", link: "/incomeS" },
                    { title: "Upload Stock Data", description: "Import stock data to track market performance.", link: "/stockS" }
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <Link to={item.link} className="text-blue-600 hover:text-blue-800 text-md block">
                        {item.title}
                      </Link>
                      <p className="text-sm text-gray-600 dark:text-white/80">{item.description}</p>
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
  const incomeStatementMetrics1 = [
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
  ];

  const incomeStatementMetrics2 = [
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

  const balanceSheetMetrics1 = [
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
  ];

  const balanceSheetMetrics2 = [
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
  ];

  return (
    <div className="p-16 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 gap-8">
        <div className="space-y-6">
          <div className='flex flex-row'>
            <div className="flex flex-col gap-4 w-3/5 mt-4 m-2">
              <div className="flex flex-row gap-4">
                <MetricTable title="Liquidity" metrics={balanceSheetMetrics1} />
                <MetricTable title="Efficiency & Capital Structure" metrics={balanceSheetMetrics2} />
              </div>
              <div className="flex flex-row gap-4">
                <MetricTable title="Profitability Ratios" metrics={incomeStatementMetrics1} />
                <MetricTable title="Efficiency & Return on Assets" metrics={incomeStatementMetrics2} />
              </div>
              <StockPredictionGraph predictions={predictions} showAnalytics={false} />
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

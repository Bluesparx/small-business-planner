import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@/components/ui/table';
import { Link } from 'react-router-dom';
import BalanceSheetChart from '../components/BalanceSheetChart';
import ProfitabilityChart from '../components/ProfitabilityChart';
import AssetChart from '../components/AssetChart';
import { getUserAnalysis } from '../utils/apiRequest';
import { Loader } from 'lucide-react';
import WorkingCapitalChart from '../components/ui/WorkingCapitalChart';
import LiquidityRatiosChart from '../components/ui/LiquidityRatiosChart';
import InventoryEfficiencyChart from '../components/ui/InventoryEfficiencyChart';
import MetricsComparisonChart from '@/components/ui/MetricsComparisonChart';
import ProfitMarginsPieChart from '@/components/ui/ProfitMarginsPieChart';

const formatValue = (value) => {
  if (typeof value === 'number') {
    const color = value < 0 ? 'text-red-600' : 'text-green-600';
    return <span className={color}>{value.toFixed(2)}%</span>;
  }
  return value || 'N/A';
};

const MetricTable = ({ title, metrics }) => (
  <div className="overflow-hidden rounded-lg shadow-md">
    <table className="w-full table-auto border-collapse border border-gray-200">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b border-gray-300">Metric</th>
          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b border-gray-300">Value</th>
        </tr>
      </thead>
      <tbody>
        {metrics.map((metric, index) => (
          <tr key={index} className={index % 2 === 0 ? 'bg-white ' : 'bg-gray-50 ' }>
            <td className="px-4 py-2 text-sm text-gray-700 border-b border-gray-300">{metric.name}</td>
            <td className="px-4 py-2 text-sm text-gray-700 border-b border-gray-300">{formatValue(metric.value)}</td>
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
        <h2 className="text-xl font-semibold ">Income Statement Analysis</h2>
        <MetricTable title="Income Statement Metrics" metrics={incomeStatementMetrics} />
        <div className="grid gap-6 md:grid-cols-2  ">
          <ChartDetail title="Profitability Analysis" description="Shows the company’s ability to generate profit relative to revenue.">
            <ProfitabilityChart data={analyzedData.incomeStatementAnalysis} />
          </ChartDetail>
          <ChartDetail title="Asset Analysis" description="Visualizes the allocation and growth of assets over time.">
            <AssetChart data={analyzedData.incomeStatementAnalysis} />
          </ChartDetail>
          <ChartDetail title="Metrics Comparison" description="Compares key financial metrics to provide a holistic view.">
            <MetricsComparisonChart data={analyzedData.incomeStatementAnalysis} />
          </ChartDetail>
          <ChartDetail title="Profit Margins" description="Breaks down different profit margins in a visual format.">
            <ProfitMarginsPieChart data={analyzedData.incomeStatementAnalysis} />
          </ChartDetail>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-xl font-semibold">Balance Sheet Analysis</h2>
        <MetricTable title="Balance Sheet Metrics" metrics={balanceSheetMetrics} />
        <div className="grid gap-6 md:grid-cols-2">
          <ChartDetail title="Balance Sheet Visualization" description="A comprehensive view of assets, liabilities, and equity.">
            <BalanceSheetChart data={analyzedData.balanceSheetAnalysis} />
          </ChartDetail>
          <ChartDetail title="Working Capital" description="Shows the liquidity and operational efficiency.">
            <WorkingCapitalChart data={analyzedData.balanceSheetAnalysis} />
          </ChartDetail>
          <ChartDetail title="Liquidity Ratios" description="Highlights the company’s ability to meet short-term obligations.">
            <LiquidityRatiosChart data={analyzedData.balanceSheetAnalysis} />
          </ChartDetail>
          <ChartDetail title="Inventory Efficiency" description="Analyzes inventory turnover and efficiency.">
            <InventoryEfficiencyChart data={analyzedData.balanceSheetAnalysis} />
          </ChartDetail>
        </div>
      </section>
    </div>
  );
};

export default AnalyticsPage;

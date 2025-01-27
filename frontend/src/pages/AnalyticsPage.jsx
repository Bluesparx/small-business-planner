import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link } from 'react-router-dom';
import BalanceSheetChart from '../components/BalanceSheetChart';
import ProfitabilityChart from '../components/ProfitabilityChart';
import AssetChart from '../components/AssetChart';
import { getUserAnalysis } from '../utils/apiRequest';
import { Loader } from 'lucide-react';
import WorkingCapitalChart from '../Components/ui/WorkingCapitalChart';
import LiquidityRatiosChart from '../Components/ui/LiquidityRatiosChart';
import InventoryEfficiencyChart from '../Components/ui/InventoryEfficiencyChart';
import MetricsComparisonChart from '@/Components/ui/MetricsComparisonChart';
import ProfitMarginsPieChart from '@/Components/ui/ProfitMarginsPieChart';

// Format the value as percentage
const formatValue = (value) => {
  if (typeof value === "number") {
    const isNegative = value < 0;
    const color = isNegative ? "text-red-600" : "text-green-600"; // Tailwind classes for red and green text colors

    return <span className={color}>{value.toFixed(2)}%</span>;
  }
  return value || "N/A";
};

// Table to display metrics
const MetricTable = ({ title, metrics }) => (
  <Card className="w-full shadow-lg rounded-lg">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Metric</TableHead>
            <TableHead>Value</TableHead>
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
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-xl font-semibold text-gray-600">
          No Analytics Data Available
        </p>
        <Link to="/upload" className="text-blue-600 hover:underline mt-4">
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
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold ">Financial Analytics</h1>

      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Income Statement Analysis
          </h2>
          <MetricTable
            title="Income Statement Metrics"
            metrics={incomeStatementMetrics}
          />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 mt-6">
            <Card className="shadow-lg rounded-lg">
              <CardHeader>
                <CardTitle>Profitability Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <ProfitabilityChart
                  data={analyzedData.incomeStatementAnalysis}
                />
              </CardContent>
            </Card>

            <Card className="shadow-lg rounded-lg">
              <CardHeader>
                <CardTitle>Asset Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <AssetChart data={analyzedData.incomeStatementAnalysis} />
              </CardContent>
            </Card>

            <Card className="shadow-lg rounded-lg">
              <CardHeader>
                <CardTitle>Metrics Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <MetricsComparisonChart
                  data={analyzedData.incomeStatementAnalysis}
                />
              </CardContent>
            </Card>
            <Card className="shadow-lg rounded-lg">
              <CardHeader>
                <CardTitle>Metrics Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <ProfitMarginsPieChart
                  data={analyzedData.incomeStatementAnalysis}
                />
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold  mb-4">
            Balance Sheet Analysis
          </h2>
          <MetricTable
            title="Balance Sheet Metrics"
            metrics={balanceSheetMetrics}
          />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 mt-6">
            <Card className="shadow-lg rounded-lg">
              <CardHeader>
                <CardTitle>Balance Sheet Visualization</CardTitle>
              </CardHeader>
              <CardContent>
                <BalanceSheetChart data={analyzedData.balanceSheetAnalysis} />
              </CardContent>
            </Card>

            <Card className="shadow-lg rounded-lg">
              <CardHeader>
                <CardTitle>Working Capital</CardTitle>
              </CardHeader>
              <CardContent>
                <WorkingCapitalChart data={analyzedData.balanceSheetAnalysis} />
              </CardContent>
            </Card>

            <Card className="shadow-lg rounded-lg">
              <CardHeader>
                <CardTitle>Liquidity Ratios</CardTitle>
              </CardHeader>
              <CardContent>
                <LiquidityRatiosChart
                  data={analyzedData.balanceSheetAnalysis}
                />
              </CardContent>
            </Card>

            <Card className="shadow-lg rounded-lg">
              <CardHeader>
                <CardTitle>Inventory Efficiency</CardTitle>
              </CardHeader>
              <CardContent>
                <InventoryEfficiencyChart
                  data={analyzedData.balanceSheetAnalysis}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link } from 'react-router-dom';
import BalanceSheetChart from '../components/BalanceSheetChart'; 
import AssetChart  from '../components/AssetChart';
import ProfitabilityChart  from '../components/ProfitabilityChart'

import emptyDashImage from '../assets/empty_dash.svg';

const formatValue = (value) => {
  if (typeof value === 'number') {
    if (value < 100 && value > -100) {
      return `${value.toFixed(2)}%`;
    }
    return value.toLocaleString();
  }
  return value;
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', { 
    year: 'numeric',
    month: 'short'
  });
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
            <TableHead>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {metrics.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.metric}</TableCell>
              <TableCell>{item.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

const Dashboard = ({ analyzedData }) => {
  analyzedData = sampleAnalyzedData;
  const currentBalanceSheet = analyzedData?.balance_sheet_analysis?.[0] || {};
  const balanceSheetMetrics = [
    { metric: 'Working Capital', value: formatValue(currentBalanceSheet.workingCapital) },
    { metric: 'Current Ratio', value: formatValue(currentBalanceSheet.currentRatio) },
    { metric: 'Quick Ratio', value: formatValue(currentBalanceSheet.quickCurrentRatio) },
    { metric: 'Debt to Equity Ratio', value: formatValue(currentBalanceSheet.debtToEquityRatio) },
    { metric: 'Inventory Turnover', value: formatValue(currentBalanceSheet.inventoryTurnover) }
  ];

  const currentIncomeStatement = analyzedData?.income_statement_analysis?.[0] || {};
  const incomeStatementMetrics = [
    { metric: 'Gross Profit Margin', value: formatValue(currentIncomeStatement.grossProfitMargin) },
    { metric: 'Operating Profit Margin', value: formatValue(currentIncomeStatement.OperatingProfitMargin) },
    { metric: 'Net Profit Ratio', value: formatValue(currentIncomeStatement.NetProfitRatio) },
    { metric: 'Interest Coverage Ratio', value: formatValue(currentIncomeStatement.InterestCoverageRatio) }
  ];

  const timeSeriesData = analyzedData?.balance_sheet_analysis?.map(item => ({
    date: formatDate(item.date),
    'Working Capital': item.workingCapital / 1e6, 
    'Current Ratio': item.currentRatio,
    'Quick Ratio': item.quickCurrentRatio,
    'Debt to Equity': item.debtToEquityRatio,
    'Inventory Turnover': item.inventoryTurnover,
    'Receivable Turnover': item.receivableTurnover
  })).reverse();

  const profitabilityData = analyzedData?.income_statement_analysis?.map(item => ({
    date: formatDate(item.date),
    'Gross Margin': item.grossProfitMargin,
    'Operating Margin': item.OperatingProfitMargin,
    'Net Profit': item.NetProfitRatio,
    'ROA': item.Return_on_Assets ? item.Return_on_Assets : item['Return on Assets'],
    'Asset Turnover': item.Asset_Turnover
  })).reverse();

  const hasData = analyzedData?.balance_sheet_analysis?.length > 0;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-6">
          {hasData ? (
            <>
              <div className="flex flex-col md:flex-row gap-4 w-full">
                <MetricTable title="Balance Sheet Analysis" metrics={balanceSheetMetrics} />
                <MetricTable title="Income Statement Analysis" metrics={incomeStatementMetrics} />
              </div>
              <div className='flex flex-row gap-4'>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <BalanceSheetChart data={analyzedData.balance_sheet_analysis} />
                <ProfitabilityChart data={analyzedData.income_statement_analysis} />
                <AssetChart data={analyzedData.income_statement_analysis} />
                </div>
              </div>
            </>
          ) : (
            <div className='flex flex-row w-full gap-6 mx-18 my-16'>
              <Card className='flex-2 w-2/3 py-6'>
                <CardContent className="flex flex-col items-center justify-center min-h-[400px]">
                  <div
                    className="w-1/2 h-60 bg-cover bg-center rounded-lg"
                    style={{ 
                      backgroundImage: `url(${emptyDashImage})`, 
                      backgroundPosition: 'center', 
                      backgroundSize: 'cover' 
                    }}
                  />
                  <p className="text-xl font-semibold text-gray-600 mt-4 mb-2">No Analytics Available</p>
                  <p className="text-sm text-gray-500 ">Please upload financial statements to view analysis</p>
                </CardContent>
              </Card>

              <div className="flex-1 w-full">
                <Card className="py-8 px-2">
                  <CardHeader>
                    <CardTitle>Getting Started</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[{
                        title: "Upload Income Statement",
                        description: "Upload your company's income statement for financial analysis.",
                        link: "/incomeS"
                      }, {
                        title: "Upload Balance Sheet",
                        description: "Upload your balance sheet to analyze assets and liabilities.",
                        link: "/balanceS"
                      }, {
                        title: "Upload Stock Data",
                        description: "Import stock data to track market performance.",
                        link: "/stockS"
                      }].map((item, index) => (
                        <div key={index} className="space-y-2">
                          <Link to={item.link} className="text-blue-600 hover:text-blue-800 font-medium block">
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;



const sampleAnalyzedData = {
  "balance_sheet_analysis": [
    {
      "averageAgeOfReceivables": 653.2622532127945,
      "currentRatio": 1.3014409722222222,
      "date": "2024-09-30",
      "debtToEquityRatio": 0.8177656982583944,
      "inventoryTurnover": 12.3610086100861,
      "numberOfDaysforInventoryTurn": 29.52833474302204,
      "quickCurrentRatio": 1.2873263888888888,
      "receivableTurnover": 0.5587342574975084,
      "workingCapital": 34726000000,
      "workingCapitalperDollarSale": 0.5294808264084776
    },
    {
      "averageAgeOfReceivables": 942.8780177890725,
      "currentRatio": 1.2749549031815206,
      "date": "2024-06-30",
      "debtToEquityRatio": 0.9076606189729474,
      "inventoryTurnover": 15.797752808988765,
      "numberOfDaysforInventoryTurn": 23.104551920341393,
      "quickCurrentRatio": 1.2650096579027186,
      "receivableTurnover": 0.38711264141662566,
      "workingCapital": 34448000000,
      "workingCapitalperDollarSale": 0.5322044896256586
    },
    {
      "averageAgeOfReceivables": 732.5121928984912,
      "currentRatio": 1.2417633410672855,
      "date": "2024-03-31",
      "debtToEquityRatio": 0.9129811338642396,
      "inventoryTurnover": 14.190950920245399,
      "numberOfDaysforInventoryTurn": 25.72061604971629,
      "quickCurrentRatio": 1.2307614427336004,
      "receivableTurnover": 0.4982852211042722,
      "workingCapital": 28655000000,
      "workingCapitalperDollarSale": 0.4632383846875101
    },
    {
      "averageAgeOfReceivables": 714.829218106996,
      "currentRatio": 1.2179629139948436,
      "date": "2023-12-31",
      "debtToEquityRatio": 0.9749106048651098,
      "inventoryTurnover": 12.15046439628483,
      "numberOfDaysforInventoryTurn": 30.040004076848597,
      "quickCurrentRatio": 1.2046175712302505,
      "receivableTurnover": 0.510611472998529,
      "workingCapital": 26377000000,
      "workingCapitalperDollarSale": 0.42529829087391163
    }
  ],
  "growth_balance_sheet": [
    {
      "Balance Sheet Metric": "workingCapital",
      "Overall Growth %": 31.65257610797286
    },
    {
      "Balance Sheet Metric": "workingCapitalperDollarSale",
      "Overall Growth %": 24.4963447467634
    },
    {
      "Balance Sheet Metric": "currentRatio",
      "Overall Growth %": 6.853908051565851
    },
    {
      "Balance Sheet Metric": "quickCurrentRatio",
      "Overall Growth %": 6.865981339967471
    },
    {
      "Balance Sheet Metric": "debtToEquityRatio",
      "Overall Growth %": -16.11890421773166
    },
    {
      "Balance Sheet Metric": "receivableTurnover",
      "Overall Growth %": 9.424540388092291
    },
    {
      "Balance Sheet Metric": "averageAgeOfReceivables",
      "Overall Growth %": -8.61282154319917
    },
    {
      "Balance Sheet Metric": "inventoryTurnover",
      "Overall Growth %": 1.732807956423849
    },
    {
      "Balance Sheet Metric": "numberOfDaysforInventoryTurn",
      "Overall Growth %": -1.7032931570768104
    }
  ],
  "growth_income_statement": [
    {
      "Income Metric": "grossProfitMargin",
      "Overall Growth %": 1.454159880821284
    },
    {
      "Income Metric": "OperatingProfitMargin",
      "Overall Growth %": 6.878095320908463
    },
    {
      "Income Metric": "InterestCoverageRatio",
      "Overall Growth %": 78.22441860193965
    },
    {
      "Income Metric": "NetProfitRatio",
      "Overall Growth %": 6.65833254290227
    },
    {
      "Income Metric": "Asset Turnover",
      "Overall Growth %": -4.857745462795358
    },
    {
      "Income Metric": "Return on Assets",
      "Overall Growth %": 1.4771422331062634
    }
  ],
  "income_statement_analysis": [
    {
      "Asset Turnover": 0.12539841265895876,
      "InterestCoverageRatio": 52.008591065292094,
      "NetProfitRatio": 0.37610734161774795,
      "OperatingProfitMargin": 0.4658382252039338,
      "Return on Assets": 0.047163263628246334,
      "date": "2024-09-30",
      "grossProfitMargin": 69.35427308073493
    },
    {
      "Asset Turnover": 0.12637968771660585,
      "InterestCoverageRatio": 38.87303851640514,
      "NetProfitRatio": 0.34044525468506187,
      "OperatingProfitMargin": 0.43142737960974553,
      "Return on Assets": 0.04302536497169846,
      "date": "2024-06-30",
      "grossProfitMargin": 69.58919770729372
    },
    {
      "Asset Turnover": 0.12773320943678695,
      "InterestCoverageRatio": 33.40875,
      "NetProfitRatio": 0.3546671408710272,
      "OperatingProfitMargin": 0.4458760386692101,
      "Return on Assets": 0.04530277218522534,
      "date": "2024-03-31",
      "grossProfitMargin": 70.08471014258463
    },
    {
      "Asset Turnover": 0.13180096821220763,
      "InterestCoverageRatio": 29.181518151815183,
      "NetProfitRatio": 0.3526281844566269,
      "OperatingProfitMargin": 0.43585940019348596,
      "Return on Assets": 0.04647673613029637,
      "date": "2023-12-31",
      "grossProfitMargin": 68.36020638503709
    }
  ]
};
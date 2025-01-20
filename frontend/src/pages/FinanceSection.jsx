import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableHeader, TableRow, TableCell } from '@/components/ui/table';
import { Alert } from '@/components/ui/alert';

const FinancialAnalysis = ({ setError }) => {
  const [balanceSheetFile, setBalanceSheetFile] = useState(null);
  const [incomeStatementFile, setIncomeStatementFile] = useState(null);
  const [analysisData, setAnalysisDataState] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'balance_sheet') setBalanceSheetFile(files[0]);
    if (name === 'income_statement') setIncomeStatementFile(files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!balanceSheetFile || !incomeStatementFile) {
      setError('Both balance sheet and income statement files are required.');
      return;
    }

    const formData = new FormData();
    formData.append('balance_sheet', balanceSheetFile);
    formData.append('income_statement', incomeStatementFile);

    setLoading(true);

    try {
      // Parse CSV files here before sending them
      const incomeStatementData = await parseCSV(incomeStatementFile);
      const balanceSheetData = await parseCSV(balanceSheetFile);

      // Send parsed data to backend or store in state
      setAnalysisDataState({
        income_statement: incomeStatementData,
        balance_sheet: balanceSheetData,
        // other analysis data here
      });

      setError(''); // Reset error on successful analysis
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred while processing the data.');
    } finally {
      setLoading(false);
    }
  };

  // Function to parse CSV file
  const parseCSV = (file) => {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        complete: (result) => resolve(result.data),
        error: reject,
      });
    });
  };

  const renderTable = (title, data, columns) => {
    if (!data || data.length === 0 || !columns || columns.length === 0) return null;

    return (
      <Card className="mb-6 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((col, index) => (
                    <TableCell key={index} className="font-semibold text-gray-700">{col}</TableCell>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((row, index) => (
                  <TableRow key={index} className="hover:bg-gray-700">
                    {columns.map((col, idx) => (
                      <TableCell key={idx}>
                        {typeof row[col] === 'number'
                          ? row[col].toLocaleString(undefined, { maximumFractionDigits: 2 })
                          : row[col]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="flex flex-col items-center py-8 px-4 md:px-8">
      <Card className="max-w-2xl w-full mb-6 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">Financial Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Balance Sheet</label>
                <Input type="file" name="balance_sheet" onChange={handleFileChange} className="w-full border border-gray-300 rounded-md p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Income Statement</label>
                <Input type="file" name="income_statement" onChange={handleFileChange} className="w-full border border-gray-300 rounded-md p-2" />
              </div>
            </div>
            <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700 py-3" disabled={loading}>
              {loading ? 'Analyzing...' : 'Analyze Data'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {analysisData && (
        <div className="space-y-6 max-w-2xl w-full">
          {analysisData.growth_income_statement?.length > 0 &&
            renderTable('Income Statement Growth', analysisData.growth_income_statement, ['Income Metric', 'Overall Growth %'])}
          {analysisData.growth_balance_sheet?.length > 0 &&
            renderTable('Balance Sheet Growth', analysisData.growth_balance_sheet, ['Balance Sheet Metric', 'Overall Growth %'])}
          {analysisData.income_statement_analysis?.length > 0 &&
            renderTable('Income Statement Analysis', analysisData.income_statement_analysis,
              Object.keys(analysisData.income_statement_analysis[0]))}
          {analysisData.balance_sheet_analysis?.length > 0 &&
            renderTable('Balance Sheet Analysis', analysisData.balance_sheet_analysis,
              Object.keys(analysisData.balance_sheet_analysis[0]))}

        </div>
      )}
    </div>
  );
};

export default FinancialAnalysis;

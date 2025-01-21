import BalanceSheetTable from '../models/balanceSheetTable.js';
import IncomeTable from '../models/income_table.js';
import DataAnalysis from '../models/dataAnalysis.js';

import axios from 'axios';
import FormData from 'form-data';
import { Parser } from 'json2csv';  

export const triggerAnalysis = async (user) => {
  try {
    console.log('Triggering ML analysis for user:', user._id);

    const balanceSheetData = await BalanceSheetTable.findOne({ user: user._id }).populate('rows');
    const incomeStatementData = await IncomeTable.findOne({ user: user._id }).populate('rows');

    if (!balanceSheetData || !incomeStatementData) {
      throw new Error("Balance Sheet or Income Statement data not found.");
    }

    console.log('Fetched balance sheet data:', balanceSheetData);
    console.log('Fetched income statement data:', incomeStatementData);

    // Convert balance sheet data to CSV
    const balanceSheetRows = balanceSheetData.rows.map(row => row.toObject());
    const balanceSheetCsv = new Parser().parse(balanceSheetRows);

    // Convert income statement data to CSV
    const incomeStatementRows = incomeStatementData.rows.map(row => row.toObject());
    const incomeStatementCsv = new Parser().parse(incomeStatementRows);

    // Create a new FormData instance
    const formData = new FormData();

    const balanceSheetBuffer = Buffer.from(balanceSheetCsv);
    const incomeStatementBuffer = Buffer.from(incomeStatementCsv);

    formData.append('balance_sheet', balanceSheetBuffer, {
      filename: 'balance_sheet.csv',
      contentType: 'text/csv',
    });

    formData.append('income_statement', incomeStatementBuffer, {
      filename: 'income_statement.csv',
      contentType: 'text/csv',
    });

    const response = await axios.post('http://localhost:5000/analyze', formData, {
      headers: {
        ...formData.getHeaders(),
        'Accept': 'application/json',
      },
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
    });

    // console.log('ML server response:', response.data);

    const analyzedData = response.data;
    const analysis = new DataAnalysis({
      user: user._id,
      balanceSheet: balanceSheetData._id,
      incomeStatement: incomeStatementData._id,
      balanceSheetAnalysis: analyzedData.balance_sheet_analysis || [],
      growthBalanceSheet: analyzedData.growth_balance_sheet || [],
      incomeStatementAnalysis: analyzedData.income_statement_analysis || [],
      growthIncomeStatement: analyzedData.growth_income_statement || [],
      status: 'completed',
    });

    await analysis.save();
    // console.log('Analysis saved to database:', analysis);

  } catch (error) {
    console.error('Error during ML analysis:', error.response?.data || error.message);

    try {
      const balanceSheetData = await BalanceSheetTable.findOne({ user: user._id });
      const incomeStatementData = await IncomeTable.findOne({ user: user._id });

      const analysis = new DataAnalysis({
        user: user._id,
        balanceSheet: balanceSheetData?._id,
        incomeStatement: incomeStatementData?._id,
        status: 'failed',
        balanceSheetAnalysis: [],
        growthBalanceSheet: [],
        incomeStatementAnalysis: [],
        growthIncomeStatement: [],
        errorMessage: error.response?.data?.error || error.message
      });

      await analysis.save();
      console.log('Failed analysis saved for user:', user._id);
    } catch (saveError) {
      console.error('Error saving failed analysis:', saveError);
      throw saveError;
    }
  }
};
import React, { useState } from 'react';
import FinancialAnalysis from './FinanceSection';
import HistoricalAnalysis from './StockSection';
import { Alert } from '../components/ui/alert';

const Dashboard = () => {
  const [analysisData, setAnalysisData] = useState(null);
  const [error, setError] = useState('');

  const resetError = () => setError('');

  return (
    <div className="w-full items-top px-auto py-2 flex justify-between">
      <div className="flex-1">
        <FinancialAnalysis setAnalysisData={setAnalysisData} setError={setError} />
      </div>
      <div className="flex-1">
        <HistoricalAnalysis setAnalysisData={setAnalysisData} setError={setError} />
      </div>
      {error && (
        <Alert
          variant="destructive"
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-1/3"
          onClose={resetError} 
        >
          {error}
        </Alert>
      )}
    </div>
  );
};

export default Dashboard;

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';


const FinancialAnalysisDisplay = ({ analysisData }) => {

  return (
    <div className="flex flex-col items-center py-8 px-4 md:px-8">
      <Card className="max-w-2xl w-full mb-6 shadow-lg bg-blue-100 ">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">Financial Analysis Results</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 text-center">
            graphical inisghts after input
          </p>
        </CardContent>
      </Card>

    </div>
  );
};

export default FinancialAnalysisDisplay;

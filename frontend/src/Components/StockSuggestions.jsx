import React, { useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/Components/ui/card";
import { Alert, AlertDescription } from "@/Components/ui/alert";
import { 
  TrendingUpIcon, 
  TrendingDown,
  BarChart3,
  Target,
  AlertCircle,
  ArrowUpRight,
  Calendar,
  DollarSign
} from "lucide-react";

const StockSuggestions = ({ predictions }) => {
  const analysis = useMemo(() => {
    if (!predictions || predictions.length < 2) return null;

    // Get the first and last predictions
    const firstPrediction = predictions[0];
    const lastPrediction = predictions[predictions.length - 1];
    
    // Calculate overall trend
    const overallChange = ((lastPrediction["Predicted Close"] - firstPrediction["Predicted Close"]) / 
      firstPrediction["Predicted Close"]) * 100;

    // Calculate volatility
    let totalVolatility = 0;
    for (let i = 1; i < predictions.length; i++) {
      const dailyChange = Math.abs(
        (predictions[i]["Predicted Close"] - predictions[i-1]["Predicted Close"]) / 
        predictions[i-1]["Predicted Close"]
      );
      totalVolatility += dailyChange;
    }
    const avgVolatility = (totalVolatility / (predictions.length - 1)) * 100;

    // Find highest and lowest predictions
    const highestPrediction = Math.max(...predictions.map(p => p["Predicted Close"]));
    const lowestPrediction = Math.min(...predictions.map(p => p["Predicted Close"]));
    const priceRange = ((highestPrediction - lowestPrediction) / lowestPrediction) * 100;

    return {
      overallChange,
      avgVolatility,
      priceRange,
      currentPrice: lastPrediction["Predicted Close"],
      highestPrice: highestPrediction,
      lowestPrice: lowestPrediction
    };
  }, [predictions]);

  if (!analysis) return null;

  return (
    <div className="p-2">
      <Card className="dark:bg-[#2d2d30] dark:border-[#2d2d30]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-blue-600" />
            Business Performance Analysis
          </CardTitle>
          <CardDescription>Based on the analysis on stock data provided, we have found some actionable insights.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-4 px-6 bg-gray-50  dark:bg-gray-200 rounded-2xl">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Target className="w-4 h-4" />
                Projected Change
              </div>
              <div className={`text-xl font-bold ${analysis.overallChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {analysis.overallChange.toFixed(2)}%
              </div>
            </div>
            <div className="p-4 px-6 bg-gray-50  dark:bg-gray-200 rounded-2xl">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <ArrowUpRight className="w-4 h-4" />
                Average Volatility
              </div>
              <div className="text-xl font-bold text-blue-600">
                {analysis.avgVolatility.toFixed(2)}%
              </div>
            </div>
            <div className="p-4 px-6 bg-gray-50 dark:bg-gray-200 rounded-2xl">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <DollarSign className="w-4 h-4" />
                Price Range
              </div>
              <div className="text-xl font-bold text-blue-600">
                {analysis.priceRange.toFixed(2)}%
              </div>
            </div>
          </div>

          <div className="space-y-4 text-xl">
            <Alert className="dark:border-none">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <AlertDescription>
                  <span className="font-semibold text-md">Strategic Planning Window:</span>{' '}
                  Predictions suggest a {analysis.overallChange >= 0 ? 'favorable' : 'challenging'} {Math.abs(analysis.overallChange) > 10 ? 'significant' : 'moderate'} trend. 
                  {analysis.overallChange >= 0 
                    ? " Consider accelerating growth initiatives and capital investments."
                    : " Focus on operational efficiency and cost management strategies."}
                </AlertDescription>
              </div>
            </Alert>

            {/* Risk Assessment */}
            {analysis.avgVolatility > 2 ? (
              <Alert className="dark:border-none">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                  <AlertDescription>
                    <span className="font-semibold text-md">Risk Management Focus:</span>{' '}
                    Higher than normal market volatility expected. Recommend reviewing hedge positions and diversifying revenue streams.
                  </AlertDescription>
                </div>
              </Alert>
            ) : (
              <Alert className="dark:border-none">
                <div className="flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-green-600" />
                  <AlertDescription>
                    <span className="font-semibold text-md ">Stability Indicator:</span>{' '}
                    Low volatility period ahead. Favorable conditions for long-term strategic planning and investor communications.
                  </AlertDescription>
                </div>
              </Alert>
            )}

            {/* Growth Strategy */}
            {analysis.overallChange >= 5 ? (
              <Alert className="dark:border-none">
                <div className="flex items-center gap-2">
                  <TrendingUpIcon className="w-5 h-5 text-green-600" />
                  <AlertDescription>
                    <span className="font-semibold  text-md">Growth Opportunities:</span>{' '}
                    Strong positive trajectory indicates favorable conditions for market expansion, M&A activities, or new product launches.
                  </AlertDescription>
                </div>
              </Alert>
            ) : (
              <Alert className="dark:border-none">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  <AlertDescription>
                    <span className="font-semibold text-md">Focus Areas:</span>{' '}
                    Consider strengthening core business operations and customer retention strategies to build momentum.
                  </AlertDescription>
                </div>
              </Alert>
            )}

            <Alert className="dark:border-none">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-blue-600" />
                <AlertDescription>
                  <span className="font-semibold text-md">Resource Planning:</span>{' '}
                  Price range of {analysis.priceRange.toFixed(2)}% suggests 
                  {analysis.priceRange > 15 
                    ? " that we need more flexible resource allocation and cash management."
                    : " good conditions for long-term investments and commitments."}
                </AlertDescription>
              </div>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StockSuggestions;
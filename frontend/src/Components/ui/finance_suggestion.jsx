import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { TrendingUp, TrendingDown, Wallet, Clock, CreditCard, BarChart2, PieChart, ChevronDown, ChevronUp } from 'lucide-react';

const getSuggestionIcon = (category) => {
  const iconProps = { className: "w-5 h-5", strokeWidth: 1.5 };
  switch (category) {
    case 'profitability': return <TrendingUp {...iconProps} className="text-green-500" />;
    case 'efficiency': return <Clock {...iconProps} className="text-purple-500" />;
    case 'liquidity': return <Wallet {...iconProps} className="text-blue-500" />;
    case 'leverage': return <CreditCard {...iconProps} className="text-orange-500" />;
    default: return <BarChart2 {...iconProps} className="text-gray-500" />;
  }
};

const generateDetailedSuggestions = (data) => {
  if (!data) return [];
  
  const suggestions = [];
  const latestData = data.balanceSheetAnalysis[0];
  const latestIncomeData = data.incomeStatementAnalysis[0];
  
  // Receivables Management
  if (latestData.averageAgeOfReceivables > 60) {
    suggestions.push({
      category: 'efficiency',
      title: 'Improve Receivables Collection',
      description: `Current average collection period is ${latestData.averageAgeOfReceivables.toFixed(1)} days, which is quite high.`,
      actions: [
        'Implement early payment discounts to incentivize faster payments',
        'Review and tighten credit policies for new customers',
        'Set up automated payment reminders for overdue accounts',
        'Consider factoring or invoice financing for immediate cash flow'
      ],
      type: 'negative'  // Negative suggestion
    });
  }

  // Working Capital Management
  if (data.growthBalanceSheet.find(m => m.BalanceSheetMetric === 'workingCapital').OverallGrowth > 20) {
    suggestions.push({
      category: 'liquidity',
      title: 'Optimize Working Capital',
      description: 'Working capital has grown significantly (31.65%). Consider ways to utilize this capital more efficiently.',
      actions: [
        'Evaluate investment opportunities for excess working capital',
        'Consider expanding operations or entering new markets',
        'Look into supply chain financing to optimize cash flow',
        'Review inventory management systems to prevent over-capitalization'
      ],
      type: 'positive'  // Positive suggestion
    });
  }

  // Profitability Analysis
  if (latestIncomeData.grossProfitMargin > 65) {
    suggestions.push({
      category: 'profitability',
      title: 'Leverage Strong Margins',
      description: `High gross profit margin of ${latestIncomeData.grossProfitMargin.toFixed(1)}% indicates strong pricing power.`,
      actions: [
        'Analyze product mix to focus on highest-margin items',
        'Consider strategic expansion into related markets',
        'Invest in customer retention to maintain premium pricing',
        'Look for opportunities to increase market share'
      ],
      type: 'positive'  // Positive suggestion
    });
  }

  // Leverage and Debt Management
  const debtToEquityChange = data.growthBalanceSheet.find(m => m.BalanceSheetMetric === 'debtToEquityRatio').OverallGrowth;
  if (debtToEquityChange < -10) {
    suggestions.push({
      category: 'leverage',
      title: 'Debt Reduction Strategy',
      description: 'Your debt-to-equity ratio has decreased by 16.12%, showing improved financial stability.',
      actions: [
        'Consider if current debt levels are optimal for growth',
        'Evaluate opportunities for strategic investments',
        'Review cost of capital across different funding sources',
        'Maintain strong relationships with lenders for future flexibility'
      ],
      type: 'positive'  // Positive suggestion
    });
  }

  // Asset Efficiency
  if (latestIncomeData.AssetTurnover < 0.15) {
    suggestions.push({
      category: 'efficiency',
      title: 'Improve Asset Utilization',
      description: 'Low asset turnover ratio indicates potential for improved asset efficiency.',
      actions: [
        'Review unutilized or underutilized assets',
        'Consider selling or repurposing non-performing assets',
        'Optimize production schedules to increase asset usage',
        'Evaluate lease vs. buy decisions for new equipment'
      ],
      type: 'negative'  // Negative suggestion
    });
  }

  return suggestions;
};

const FinancialSuggestions = ({ data }) => {
    const [openIndex, setOpenIndex] = useState(null);
    const suggestions = generateDetailedSuggestions(data);
  
    const toggleAccordion = (index) => {
      setOpenIndex(openIndex === index ? null : index);
    };
  
    return (
      <Card className="w-full shadow-lg border-gray-300 dark:border-none bg-white dark:bg-[#24222e] transition-all">
        <CardHeader className="border-b border-gray-100 dark:border-gray-800">
          <CardTitle className="text-xl font-bold flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <PieChart className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            Recommended changes in strategy
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          {suggestions.map((suggestion, index) => {
            const isOpen = openIndex === index;
            const borderColor = suggestion.type === 'positive' ? 
              {
                profitability: 'border-green-400',
                efficiency: 'border-purple-400',
                liquidity: 'border-blue-400',
                leverage: 'border-orange-400'
              }[suggestion.category] : 'border-red-400';
  
            return (
              <div 
                key={index} 
                className={`rounded-lg overflow-hidden border transition-ease duration-200 
                  ${borderColor} ${isOpen ? 'shadow-md' : 'shadow-sm'}`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className={`w-full flex justify-between items-center p-4 
                    ${isOpen ? 
                      'bg-gray-50 dark:bg-gray-800' : 
                      'bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800'} 
                    transition-colors duration-200`}
                >
                  <div className="flex items-center space-x-3">
                    {getSuggestionIcon(suggestion.category)}
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                      {suggestion.title}
                    </h4>
                  </div>
                  {isOpen ? 
                    <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" /> : 
                    <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  }
                </button>
                
                {isOpen && (
                  <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                      {suggestion.description}
                    </p>
                    <div className="space-y-2">
                      <h5 className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                        Recommended Actions:
                      </h5>
                      <ul className="space-y-2">
                        {suggestion.actions.map((action, actionIndex) => (
                          <li 
                            key={actionIndex}
                            className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-400"
                          >
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-600 flex-shrink-0" />
                            <span>{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>
    );
  };
  
  export default FinancialSuggestions;
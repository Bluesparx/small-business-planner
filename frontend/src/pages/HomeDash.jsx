import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Link } from 'react-router-dom'; 
import emptyDashImage from '@/assets/empty_dash.svg';  // Import the image correctly

const gettingStarted = [
  {
    title: "Upload Income Statement",
    description: "Upload your company's income statement to get started with financial analysis.",
    link: "/incomeS",
  },
  {
    title: "Upload Balance Sheet",
    description: "Upload the balance sheet to track your company's assets and liabilities.",
    link: "/balanceS",
  },
  {
    title: "Upload Stock Data",
    description: "Upload stock data to monitor your investments and track market performance.",
    link: "/stockS",
  },
];

const Dashboard = () => {
  return (
    <>
      <div className="flex flex-row gap-4 my-12 mx-20">
        <div className="flex-4 flex flex-col items-center justify-center p-4 w-full md:w-3/4">
          <div
            className="w-1/2 h-80 bg-cover bg-center rounded-lg"
            style={{ 
              backgroundImage: `url(${emptyDashImage})`, 
              backgroundPosition: 'center',
              backgroundSize: 'cover', 
              backgroundRepeat: 'no-repeat', 
            }}
          >
          </div>
          <div className="text-center mt-4">
            <h2 className='font-bold text-xl text-gray-950'>No Analytics</h2>
            <p className='font-semibold text-lg text-gray-800 mt-2'>Please upload files to see detailed analytics</p>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          <Card className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">
                Getting Started
              </CardTitle>
            </CardHeader>
            <CardContent className="mt-4 space-y-4">
              <ul className="space-y-6">
                {gettingStarted.map((item, index) => (
                  <li key={index} className="flex flex-col space-y-2">
                    <Link to={item.link} className="text-blue-600 hover:text-blue-800 text-md font-medium">
                      {item.title}
                    </Link>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StockPredictionGraph from '@/Components/StockPredictionGraph';
import { Card } from '@/components/ui/card';
import { uploadHistoricalData } from '@/utils/apiRequest';

const StockDataInput = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a file to upload.');
      return;
    }

    setLoading(true);
    setPredictions([]);

    try {
      const response = await uploadHistoricalData(selectedFile);

      if (response.historical_analysis) {
        setPredictions(response.historical_analysis);
        toast.success('File uploaded and processed successfully!');
      } else {
        toast.error('Unexpected response from the server.');
      }
    } catch (err) {
      toast.error('An error occurred while processing your file. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  const filtered_predictions = predictions.filter((_, index) => index % 10 === 0);

  return (
    <div className='min-h-screen h-full p-6'>
    <div className=" text-center mt-10">
      <ToastContainer />
      <div className="w-full justify-around flex flex-row text-center py-6 mt-10 dark:bg-gray-900">
      <ToastContainer />
      <div className="mt-2">
        <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 p-8">Sample Data Format</h3>
        <table className="table-auto w-full border-collapse border border-gray-300 mb-4">
          <thead>
            <tr className="bg-gray-400 text-gray-950">
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">Close/Last</th>
              <th className="border border-gray-300 px-4 py-2">Volume</th>
              <th className="border border-gray-300 px-4 py-2">Open</th>
              <th className="border border-gray-300 px-4 py-2">High</th>
              <th className="border border-gray-300 px-4 py-2">Low</th>
            </tr>
          </thead>
          <tbody>
            {sampleStockData.map((row, index) => (
              <tr
                key={index}
                className='bg-gray-200 text-gray-800'   >
                <td className="border border-gray-300 px-4 py-2">{row.date}</td>
                <td className="border border-gray-300 px-4 py-2">{row.close}</td>
                <td className="border border-gray-300 px-4 py-2">{row.volume}</td>
                <td className="border border-gray-300 px-4 py-2">{row.open}</td>
                <td className="border border-gray-300 px-4 py-2">{row.high}</td>
                <td className="border border-gray-300 px-4 py-2">{row.low}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-sm text-gray-500 mt-4 dark:text-gray-200 text-center">
          * Please format your data to match the structure shown above.
        </p>
      </div>

      <div className="mb-4 flex flex-col gap-4">
        
      <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400 p-8">
        Upload Stocks Data
      </h1>
        <input
          type="file"
          onChange={handleFileChange}
          accept=".csv"
          className="p-2 border border-gray-300 rounded-md"
        />
        <button
        onClick={handleFileUpload}
        className="mt-4 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
      >
        {loading ? 'Uploading...It may take a while as we process the data..' : 'Upload'}
      </button>
      </div>

      </div>

      {predictions.length > 0 && (
        <div className='flex align-center flex-col justify-center mx-10 mt-2'>
      <StockPredictionGraph predictions={predictions} />
        <Card className="mt-2">
          <h2 className="text-xl font-bold text-green-600">Predicted Stock Prices</h2>
          <table className="mt-4 border-collapse border border-gray-300 w-full">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Date</th>
                <th className="border border-gray-300 px-4 py-2">Predicted Close</th>
              </tr>
            </thead>
            <tbody>
              {filtered_predictions.map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">{item.Date}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item['Predicted Close'].toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
        </div> 
      )}
    </div>
    </div>
  );
};

export default StockDataInput;

// Sample Stock Data for Display
const sampleStockData = [
  {
    date: '2024-01-01',
    close: '150.00',
    volume: '100000',
    open: '148.50',
    high: '151.00',
    low: '147.00',
  },
  {
    date: '2024-01-02',
    close: '152.30',
    volume: '120000',
    open: '150.00',
    high: '153.00',
    low: '149.00',
  },
  {
    date: '2024-01-03',
    close: '154.10',
    volume: '130000',
    open: '152.00',
    high: '155.00',
    low: '151.00',
  },
];

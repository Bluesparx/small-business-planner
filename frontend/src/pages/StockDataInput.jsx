import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

  return (
    <div className="text-center mb-6">
      <ToastContainer />
      <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400 p-8">
        Upload Stocks Data
      </h1>

      <div className="mb-4">
        <input
          type="file"
          onChange={handleFileChange}
          accept=".csv"
          className="p-2 border border-gray-300 rounded-md"
        />
      </div>

      <button
        onClick={handleFileUpload}
        className="mt-4 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
      >
        {loading ? 'Uploading...It may take a while as we process the data..' : 'Upload'}
      </button>

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
              {predictions.map((item, index) => (
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
  );
};

export default StockDataInput;

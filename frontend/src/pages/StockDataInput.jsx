import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StockPredictionGraph from '@/Components/StockPredictionGraph';

const StockDataInput = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId] = useState("678c9f752d7b14bf4aac6b7a"); // Hardcoded user ID (replace this with real user info)

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

    const formData = new FormData();
    formData.append('historical_data', selectedFile);

    try {
      const response = await axios.post(`http://localhost:5000/analyze_historical?user_id=${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.historical_analysis) {
        setPredictions(response.data.historical_analysis);
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
        {loading ? 'Uploading...' : 'Upload'}
      </button>

      {predictions.length > 0 && (
        <div className="mt-8">
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
                  <td className="border border-gray-300 px-4 py-2">{item['Predicted Close'].toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* If you want to display the graph here */}
      {predictions.length > 0 && (
        <StockPredictionGraph predictions={predictions} />
      )}
    </div>
  );
};

export default StockDataInput;

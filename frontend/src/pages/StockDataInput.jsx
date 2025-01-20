import FileUploadDemo from '@/Components/fileUploadDemo';
import React from 'react';

const StockDataInput = () => {
  return (
    
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400 p-8">
          Upload Stocks Data
        </h1>
       
          
        <FileUploadDemo />
        <button
        type="submit"
        className="mt-4 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
      >
        Upload
      </button>
      </div>
   
  );
};

export default StockDataInput;

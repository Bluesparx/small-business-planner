import React, { useState, useRef } from 'react';
import { 
  FileSpreadsheet, 
  Upload, 
  Trash2 
} from 'lucide-react';

const UploadCSV = ({ onFileUpload, maxSizeInMB = 10, acceptedFileTypes = ['.csv'] }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    processFile(selectedFile);
  };

  const processFile = (selectedFile) => {
    // File type validation
    if (!acceptedFileTypes.some(type => 
      selectedFile.name.toLowerCase().endsWith(type.replace('.', ''))
    )) {
      setError('Invalid file type. Please upload a CSV.');
      return;
    }

    // File size validation
    if (selectedFile.size > maxSizeInMB * 1024 * 1024) {
      setError(`File too large. Max size is ${maxSizeInMB}MB.`);
      return;
    }

    setFile(selectedFile);
    setError(null);

    // Notify parent component via callback
    if (onFileUpload) onFileUpload(selectedFile);
  };

  const removeFile = () => {
    setFile(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".csv"
        className="hidden"
      />

      <div 
        onClick={() => fileInputRef.current?.click()}
        className="p-6 rounded-lg cursor-pointer border-2 border-dashed border-gray-300 dark:border-gray-600 text-center"
      >
        {!file ? (
          <div className="flex flex-col items-center">
            <Upload size={40} className="text-blue-500 mb-4" />
            <p className="text-gray-600 dark:text-gray-300">
              Drag and drop CSV file or click to upload
            </p>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileSpreadsheet size={30} className="text-blue-500" />
              <div>
                <p className="text-sm font-medium">{file.name}</p>
                <p className="text-xs text-gray-500">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile();
                }}
                className="text-gray-500 hover:text-red-500"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-2 text-red-500 text-sm">
          {error}
        </div>
      )}
    </div>
  );
};

export default UploadCSV;

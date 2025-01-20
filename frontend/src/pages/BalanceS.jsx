import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../Components/ui/dropdown-menu";
import IncomeSForm from "@/Components/IncomeSForm";
import FileUploadDemo from "@/Components/fileUploadDemo";
import BalanceSForm from "@/Components/BalanceSForm";

// Example components for form and CSV upload

const CSVUploadComponent = () => (
  <div className="mt-6">
    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
    </h2>
    <form className="mt-4">
      
      <FileUploadDemo />
      <button
        type="submit"
        className="mt-4 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md "
      >
        Upload
      </button>
    </form>
  </div>
);

const BalanceS = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className="min-h-screen  dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-6">
      {/* Header Section */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          Upload Balance Statement Data
        </h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          You can manually enter your data using the form below or upload a
          CSV/Excel file for faster processing.
        </p>
      </div>

      {/* Dropdown Menu */}
      <div className="flex justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-md shadow-md">
            Select
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg p-2">
            <DropdownMenuItem
              onClick={() => setSelectedOption("form")}
              className="cursor-pointer"
            >
              Manually (form)
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setSelectedOption("csv")}
              className="cursor-pointer"
            >
              CSV file
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Conditional Rendering */}
      <div className="mt-6">
        {selectedOption === "form" && <BalanceSForm />}
        {selectedOption === "csv" && <CSVUploadComponent />}
        {!selectedOption && (
          <p className="text-center text-gray-600 dark:text-gray-400">
            Please select an option from the dropdown above.
          </p>
        )}
      </div>
    </div>
  );
};

export default BalanceS;

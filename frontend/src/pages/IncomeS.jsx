import React, { useState } from "react";
import { Link } from "react-router-dom";
import UploadCSV from "@/Components/csvUpload_financial";
import { createBalanceSheetTable, createIncomeTable, triggerUserAnalysis } from "@/apiRequest";
import { toast } from "react-toastify";
import Papa from "papaparse";

const IncomeS = () => {
  const [uploadedFiles, setUploadedFiles] = useState({
    balance_sheet: null,
    income_statement: null,
  });
  const [balanceSheetRows, setBalanceSheetRows] = useState([]);
  const [incomeStatementRows, setIncomeStatementRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalysisComplete, setIsAnalysisComplete] = useState(false);

  const parseCSVFile = (file, fileType) => {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        complete: (result) => {
          if (result.errors.length > 0) {
            reject("Error parsing CSV");
          } else {
            let rows = [];
            if (fileType === "balance_sheet") {
              rows = result.data.map((row) => ({
                date: row["date"] ? new Date(row["date"]) : new Date(),
                totalCurrentAssets: parseFloat(row["totalCurrentAssets"] || 0),
                totalCurrentLiabilities: parseFloat(row["totalCurrentLiabilities"] || 0),
                inventory: parseFloat(row["inventory"] || 0),
                totalLiabilities: parseFloat(row["totalLiabilities"] || 0),
                totalStockholdersEquity: parseFloat(row["totalStockholdersEquity"] || 0),
                netReceivables: parseFloat(row["netReceivables"] || 0),
                totalAssets: parseFloat(row["totalAssets"] || 0),
              }));
              setBalanceSheetRows(rows);
            } else if (fileType === "income_statement") {
              rows = result.data.map((row) => ({
                date: row["date"] ? new Date(row["date"]) : new Date(),
                revenue: parseFloat(row["revenue"] || 0),
                costOfRevenue: parseFloat(row["costOfRevenue"] || 0),
                operatingIncome: parseFloat(row["operatingIncome"] || 0),
                interestExpense: parseFloat(row["interestExpense"] || 0),
                incomeBeforeTax: parseFloat(row["incomeBeforeTax"] || 0),
                netIncome: parseFloat(row["netIncome"] || 0),
              }));
              setIncomeStatementRows(rows);
            }
            resolve(rows);
          }
        },
        header: true,
        skipEmptyLines: true,
      });
    });
  };

  const handleFileUpload = async (fileType, file) => {
    try {
      await parseCSVFile(file, fileType);
      toast.success(`${fileType} uploaded successfully`);
      setUploadedFiles((prev) => ({
        ...prev,
        [fileType]: file,
      }));
    } catch (error) {
      toast.error("Error processing CSV file");
      console.error(error);
    }
  };

  const triggerAnalysis = async () => {
    if (!uploadedFiles.balance_sheet || !uploadedFiles.income_statement) {
      toast.warn("Please upload both Balance Sheet and Income Statement");
      return;
    }

    setIsLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user ? user._id : null;

      const balanceSheetPayload = {
        userId,
        name: "financial_data",
        rows: balanceSheetRows
      };

      const incomeStatementPayload = {
        userId,
        name: "financial_data",
        rows: incomeStatementRows
      };

      await createBalanceSheetTable(balanceSheetPayload);
      await createIncomeTable(incomeStatementPayload);
      await triggerUserAnalysis(userId);

      toast.success("Financial analysis completed successfully");
      setIsAnalysisComplete(true);
    } catch (error) {
      console.error("Analysis error:", error);
      toast.error(error.response?.data?.error || "Failed to complete financial analysis");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          Upload Financial Data
        </h1>
      </div>

      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold mb-2">Balance Sheet</h2>
          <UploadCSV onFileUpload={(file) => handleFileUpload("balance_sheet", file)} />
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Income Statement</h2>
          <UploadCSV onFileUpload={(file) => handleFileUpload("income_statement", file)} />
        </div>

        <div className="text-center mt-6">
          <button
            onClick={triggerAnalysis}
            className={`px-6 py-3 text-white rounded-md ${
              uploadedFiles.balance_sheet && uploadedFiles.income_statement
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={isLoading || !uploadedFiles.balance_sheet || !uploadedFiles.income_statement}
          >
            {isLoading ? "Processing..." : "Trigger Financial Analysis"}
          </button>
        </div>

        {isAnalysisComplete && (
          <div className="text-center mt-6">
            <Link
              to="/dash"
              className="px-6 py-3 text-white bg-green-600 rounded-md hover:bg-green-700"
            >
              Check Analysed Data
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default IncomeS;
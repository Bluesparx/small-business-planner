import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
// API request function
const apiRequest = async (url, method, data = null) => {
  const token = localStorage.getItem("token");

  const config = {
    method,
    url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: data ? data : undefined,
    credentials: true,
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Unknown error";
    console.error("API Request Error:", errorMessage);
    throw new Error(errorMessage);
  }
};
// User API requests
export const userSignUp = async (userData) =>
  apiRequest(`${API_URL}/users/signUp`, 'POST', userData);  // POST - Send user data

export const userLogin = async (credentials) =>
  apiRequest(`${API_URL}/users/login`, 'POST', credentials);

export const getUser = async () =>
  apiRequest(`${API_URL}/users/me`, 'GET');

// Balance Sheet API
export const createBalanceSheetTable = async (balanceSheetData) =>
  apiRequest(`${API_URL}/balance-sheet/table`, 'POST', balanceSheetData);

export const getAllBalanceSheetTables = async () =>
  apiRequest(`${API_URL}/balance-sheet/table`, 'GET');

export const getBalanceSheetTableById = async (tableId) =>
  apiRequest(`${API_URL}/balance-sheet/table/${tableId}`, 'GET');

// Income Statement API
export const createIncomeTable = async (incomeData) =>
  apiRequest(`${API_URL}/income/table`, 'POST', incomeData);

export const getAllIncomeTables = async () =>
  apiRequest(`${API_URL}/income/table`, 'GET');

export const getIncomeTableById = async (tableId) =>
  apiRequest(`${API_URL}/income/table/${tableId}`, 'GET');

// Data Analytics API
export const triggerUserAnalysis = async () =>
  apiRequest(`${API_URL}/data/trigger-analysis`, 'POST');

export const getUserAnalysis = async () =>
  apiRequest(`${API_URL}/data/user-analysis`, 'GET');


export const getPredictions = async () => 
  apiRequest(`${API_URL}/stock/getprediction`, 'GET');



export const uploadHistoricalData = async (file) => {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append('historical_data', file);

  try {
    const response = await axios.post(`${API_URL}/stock/analyze_historical`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      credentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading historical data:', error.message);
  }
};


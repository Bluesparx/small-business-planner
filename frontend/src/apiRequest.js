import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; 

// User API requests
export const userSignUp = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users/signUp`, userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const userLogin = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, credentials);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const getUser = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Balance Sheet API
export const createBalanceSheetTable = async (userId, balanceSheetData) => {
  try {
    const response = await axios.post(`${API_URL}/balance-sheet/table`, {
      userId,
      ...balanceSheetData
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const getAllBalanceSheetTables = async () => {
  try {
    const response = await axios.get(`${API_URL}/balance-sheet/table`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const getBalanceSheetTableById = async (tableId) => {
  try {
    const response = await axios.get(`${API_URL}/balance-sheet/table/${tableId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Income Statement API requests
export const createIncomeTable = async (userId, incomeData) => {
  try {
    const response = await axios.post(`${API_URL}/income-statement/table`, {
      userId, 
      ...incomeData
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const getAllIncomeTables = async () => {
  try {
    const response = await axios.get(`${API_URL}/income-statement/table`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const getIncomeTableById = async (tableId) => {
  try {
    const response = await axios.get(`${API_URL}/income-statement/table/${tableId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Data Analytics API 
export const triggerUserAnalysis = async (userId) => {
  try {
    const response = await axios.post(`${API_URL}/data/trigger-analysis`, { userId });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const getUserAnalysis = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/data/user-analysis/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

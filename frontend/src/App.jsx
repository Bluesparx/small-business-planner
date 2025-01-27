import React from "react";
import { Route, Routes } from "react-router-dom"; // Import Route and Routes for routing

// Example Components

import Landing from "./pages/Landing";
import { Navbar } from "./Components/Navbar";
import { Footer } from "./pages/Footer";

import Dashboard from "./pages/HomeDash";
import SignUpForm from "./pages/SignUpForm";
import LoginForm from "./pages/LoginForm";
import { ThemeProvider } from "../components/ui/ThemeContext";
import IncomeS from "./pages/IncomeS";
import BalanceS from "./pages/BalanceS";
import StockDataInput from "./pages/StockDataInput";
import SubscriptionPage from "./pages/SubscriptionPage";
import About from "./pages/About";
import Chatbot from "./Components/Chatbot";
import StockAnalysis from "./pages/stockAnalysis";
import AnalyticsPage from "./pages/AnalyticsPage";
import EMICalculator from "./pages/EMICalculator";
import SIPCalculator from "./pages/SIPCalculator";

function App() {
  return (
    <>
      <ThemeProvider>
        <Navbar />
        <Routes>
          {/* Define your routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/dash" element={<Dashboard />} />
          <Route path="/incomeS" element={<IncomeS />} />
          <Route path="/balanceS" element={<BalanceS />} />
          <Route path="/stockInput" element={<StockDataInput />} />
          <Route path="/subscription" element={<SubscriptionPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/stock-analysis" element={<StockAnalysis />} />
          <Route path="/analysis" element={<AnalyticsPage />} />
          <Route path="/emi" element={<EMICalculator />} />
          <Route path="/sip" element={<SIPCalculator />} />
        </Routes>
        <Chatbot />
      </ThemeProvider>
    </>
  );
}

export default App;

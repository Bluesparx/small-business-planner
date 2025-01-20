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
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;

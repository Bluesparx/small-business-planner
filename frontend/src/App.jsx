import React from 'react';
import { Route, Routes } from 'react-router-dom'; // Import Route and Routes for routing

// Example Components

import Landing from './Components/Landing';
import { Navbar } from './Components/Navbar';
import { Footer } from './Components/Footer';

import Homedash from './Components/Homedash';
import SignUpForm from './Components/SignUpForm';
import LoginForm from './Components/LoginForm';
import { ThemeProvider } from "../components/ui/ThemeContext";
function App() {
  return (
    <>
     <ThemeProvider>
      <Navbar/>
      <Routes>
        
        {/* Define your routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/dash" element={<Homedash />} />
      </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;

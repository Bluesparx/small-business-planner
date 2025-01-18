import React from 'react';
import { Route, Routes } from 'react-router-dom'; // Import Route and Routes for routing

// Example Components
import Login from './Components/Login';
import Landing from './Components/Landing';
import { Navbar } from './Components/Navbar';
import { Footer } from './Components/Footer';

function App() {
  return (
    <>
       <Navbar/>
      <Routes>
        {/* Define your routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <div className='mt-4'>
      <Footer/>
    </div>
    </>
  );
}

export default App;

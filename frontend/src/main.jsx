import React from 'react';
import { createRoot } from 'react-dom/client'; // Correct import for React 18+
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import './index.css';
import App from './App';
import 'react-toastify/ReactToastify.css';
// Get the root element where your React app will be rendered
const rootElement = document.getElementById('root');

// Create a root and render the App component inside it
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    {/* Wrap your app with BrowserRouter */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

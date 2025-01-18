import React, { createContext, useContext, useState } from 'react';

// Create the RouteContext
const RouteContext = createContext();

// Custom hook to use the RouteContext
export const useRoute = () => {
  return useContext(RouteContext);
};

// Provider to wrap around the components where routing will be used
export const RouteProvider = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState('/'); // Default route

  return (
    <RouteContext.Provider value={{ currentRoute, setCurrentRoute }}>
      {children}
    </RouteContext.Provider>
  );
};

// ApiContext.js
import React, { createContext, useState, useContext } from 'react';

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [ipAddress, setIpAddress] = useState('172.21.51.242'); // Set your initial IP address here

  return (
    <ApiContext.Provider value={{ ipAddress, setIpAddress }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => {
  return useContext(ApiContext);
};

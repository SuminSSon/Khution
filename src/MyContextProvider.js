import React, { createContext, useState } from 'react';

export const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
    const [sidebarFiles, setSidebarFiles] = useState([]);
  

  return (
    <MyContext.Provider value={{ 
        sidebarFiles, setSidebarFiles
    }}>
      {children}
    </MyContext.Provider>
  );
};
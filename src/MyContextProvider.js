import React, { createContext, useState } from 'react';

export const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
    const [sidebarFiles, setSidebarFiles] = useState([]);
    const [currentPageId, setCurrentPageId] = useState('');
    const [currentPageContent, setCurrentPageContent] = useState('');
    const [quizlist, setquizlist] = useState([]);

  

  return (
    <MyContext.Provider value={{ sidebarFiles, setSidebarFiles, 
    currentPageId, setCurrentPageId, currentPageContent, setCurrentPageContent, quizlist, setquizlist}}>
      {children}
    </MyContext.Provider>
  );
};
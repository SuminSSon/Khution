import React from 'react';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DynamicPage from './pages/DynamicPage/DynamicPage';
import Notepage from './pages/notepage/notepage';
import Sidebar from './components/Sidebar/Sidebar';
import { MyContextProvider } from './MyContextProvider';
import Quiz from './pages/quiz';

function App() {
  return (
   
    <BrowserRouter>
    <MyContextProvider>
    <Sidebar/>
      <Routes>
        <Route path="/" element={<Notepage />} />
        <Route path=':fileName/*' element={<DynamicPage />} />
        <Route path='/Quiz' element={<Quiz/>} />
        <Route path=':fileName/Quiz' element={<Quiz />} />
      </Routes>
    </MyContextProvider>
    </BrowserRouter>
  
  );
}

export default App;

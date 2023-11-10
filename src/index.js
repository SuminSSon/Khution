import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DynamicPage from './pages/DynamicPage/DynamicPage';
import Notepage from './pages/notepage/notepage';
import reportWebVitals from './reportWebVitals';
import Quiz from './pages/quiz';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Notepage />} />
        <Route path=':fileName/*' element={<DynamicPage />} />
        <Route path='/Quiz' element={<Quiz/>} />
        <Route path=':fileName/Quiz' element={<Quiz />} />
      </Routes>
      
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DynamicPage from './pages/DynamicPage/DynamicPage';
import Notepage from './pages/notepage/notepage';
import reportWebVitals from './reportWebVitals';
import App from './App';
import Sidebar from './components/Sidebar/Sidebar';
import Quiz from './pages/quiz';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import DynamicPage from './pages/DynamicPage/DynamicPage';
import Notepage from './pages/notepage/notepage';
import Sidebar from './components/Sidebar/Sidebar';
import { MyContextProvider } from './MyContextProvider';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Quiz from './pages/quiz';

function App() {
  return (
    <BrowserRouter initialEntries={['/Login']} initialIndex={0}>
      <MyContextProvider>
        <AppContent />
      </MyContextProvider>
    </BrowserRouter>
  );
}

function AppContent() {
  const [pageList, setPageList] = useState([]);
  const [currentPage, setCurrentPage] = useState('');

  const location = useLocation();
  const routesWithoutSidebar = ['/', '/Signup'];
  const isRouteWithoutSidebar = routesWithoutSidebar.includes(location.pathname);

  return (
    <>
      {!isRouteWithoutSidebar && <Sidebar />}
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path="/Main" element={<Notepage  pageList={pageList} setPageList={setPageList}/>} />
        <Route path='/Main/:fileName/*' element={<DynamicPage currentPage={currentPage} setCurrentPage={setCurrentPage} pageList={pageList}/>} />
        <Route path='/Quiz' element={<Quiz />} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        <Route path='/Main/:fileName/Quiz' element={<Quiz />} />
        <Route path='*' element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;

import React from 'react';
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
  const location = useLocation();
  const routesWithoutSidebar = ['/login', '/Login', '/Signup'];
  const isRouteWithoutSidebar = routesWithoutSidebar.includes(location.pathname);

  return (
    <>
      {!isRouteWithoutSidebar && <Sidebar />}
      <Routes>
        <Route path='/Login' element={<Login />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path="/" element={<Notepage />} />
        <Route path=':fileName/*' element={<DynamicPage />} />
        <Route path='/Quiz' element={<Quiz />} />
        <Route path=':fileName/Quiz' element={<Quiz />} />
        <Route path='*' element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;

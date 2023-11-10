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
    <BrowserRouter>
      <MyContextProvider>
        <AppContent />
      </MyContextProvider>
    </BrowserRouter>
  );
}

function AppContent() {
  // 이제 useLocation을 여기서 사용할 수 있습니다.
  const location = useLocation();

  // Define an array of routes where you want to hide the Sidebar
  const routesWithoutSidebar = ['/Login', '/Signup'];

  // Check if the current route is in the array of routes without Sidebar
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
        {/* Redirect to home if an unknown route is accessed */}
        <Route path='*' element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;

import react from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Quiz from './pages/Quiz';

import Sidebar from './components/SideBar';
import ProtectedRoute from './components/ProtectedRoute';
import SideBarItems from './components/SideBarItems';

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <>
              <div className='flex font-poppins'>
                <Sidebar>
                  <SideBarItems />
                </Sidebar>
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              </div>

            </>
          } />

          <Route path="/quiz" element={
            <>
              <div className='flex font-poppins'>
                <Sidebar>
                  <SideBarItems />
                </Sidebar>
              </div>
              <Quiz />
            </>
          } />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterAndLogout />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;

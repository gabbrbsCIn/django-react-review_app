import react from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Quiz from './pages/Quiz';
import Revision from './pages/Revision';

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


const ProtectedRouteLayout = ({ children }) => (
  <div className='flex font-poppins'>
    <ProtectedRoute>
      <Sidebar>
        <SideBarItems />
      </Sidebar>
    </ProtectedRoute>
    {children}
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <ProtectedRouteLayout>
            <Home />
          </ProtectedRouteLayout>
        } />

        <Route path="/quiz" element={
          <ProtectedRouteLayout>
            <Quiz />
          </ProtectedRouteLayout>
        } />

        <Route path="/fichamentos" element={
          <ProtectedRouteLayout>
            <Revision />
          </ProtectedRouteLayout>
        } />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;

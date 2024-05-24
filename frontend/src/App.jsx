import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from 'react';


import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Quiz from './pages/Quiz';
import Revision from './pages/Revision';
import RevisionItem from './pages/RevisionItem';

import Sidebar from './components/SideBar';
import ProtectedRoute from './components/ProtectedRoute';
import SideBarItems from './components/SideBarItems';

import UserContext from './contexts/userContext';
import { LoaderIcon } from 'lucide-react';

import getUser from "./services/userService";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function ProtectedRouteLayout({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await getUser(setUser, setIsLoading);
    };

    fetchData();
  }, []);

  return (
    <div className='flex font-poppins'>
      {isLoading ? (
        <div className="flex justify-center items-center "><LoaderIcon /></div>
      ) : (
        <>
          <UserContext.Provider value={{ user }}>
            <ProtectedRoute>
              <Sidebar>
                <SideBarItems />
              </Sidebar>
            </ProtectedRoute>
            {children}
          </UserContext.Provider>
        </>
      )}
    </div>
  );
}

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
        <Route path="/fichamentos/:id" element={
          <ProtectedRouteLayout>
            <RevisionItem />
          </ProtectedRouteLayout>
        } />
        <Route path="*" element={
          <ProtectedRouteLayout>
            <NotFound />
          </ProtectedRouteLayout>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

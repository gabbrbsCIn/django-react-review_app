import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { REFRESH_TOKEN, ACCESS_TOKEN } from '../services/constants';
import { useState, useEffect } from 'react';
import api from '../services/api';


function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false));
    }, []);


    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            const response = await api.post('app/token/refresh/', {
                refresh: refreshToken,
            });
            if (response.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, response.data.access);
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
            };
        } catch (error) {
            setIsAuthorized(false);
        };
    };
    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuthorized(false);
            return;
        };

        const decoded = jwtDecode(token);
        const tokenExp = decoded.exp;
        const now = Date.now() / 1000;

        if (tokenExp < now) {
            await refreshToken();
        } else {
            setIsAuthorized(true);
        };
    };

    if ((isAuthorized) === null) {
        return <div>Loading...</div>;
    }

    return isAuthorized ? children : <Navigate to="/login" />;

};

export default ProtectedRoute;
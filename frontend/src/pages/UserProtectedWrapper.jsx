import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const UserProtectedWrapper = ({ children }) => {
    const token = localStorage.getItem('token');
    const [isLoading, setIsLoading] = useState(Boolean(token));
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        let isCurrent = true;

        const validateUser = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/users/profile`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                if (response.status !== 200 || !response.data?.user) {
                    throw new Error('User profile validation failed');
                }

                if (isCurrent) {
                    setUser(response.data.user);
                }
            } catch {
                if (isCurrent) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    setUser(null);
                    navigate('/UserLogin', { replace: true });
                }
            } finally {
                if (isCurrent) {
                    setIsLoading(false);
                }
            }
        };

        if (token) {
            validateUser();
        }

        return () => {
            isCurrent = false;
        };
    }, [navigate, setUser, token]);

    if (!token) {
        return <Navigate to="/UserLogin" replace />;
    }

    if (isLoading) {
        return <p className="p-7 text-center">Verifying user session...</p>;
    }

    return children;
};

export default UserProtectedWrapper;

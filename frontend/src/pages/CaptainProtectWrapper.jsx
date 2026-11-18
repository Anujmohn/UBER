import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainProtectWrapper = ({ children }) => {
    const token = localStorage.getItem('captainToken');
    const [isLoading, setIsLoading] = useState(Boolean(token));
    const { setCaptain } = useContext(CaptainDataContext);
    const navigate = useNavigate();

    useEffect(() => {
        let isCurrent = true;

        const validateCaptain = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/captain/profile`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                if (response.status !== 200 || !response.data?.captain) {
                    throw new Error('Captain profile validation failed');
                }

                if (isCurrent) {
                    setCaptain(response.data.captain);
                }
            } catch {
                if (isCurrent) {
                    localStorage.removeItem('captainToken');
                    localStorage.removeItem('captain');
                    setCaptain(null);
                    navigate('/CaptainLogin', { replace: true });
                }
            } finally {
                if (isCurrent) {
                    setIsLoading(false);
                }
            }
        };

        if (token) {
            validateCaptain();
        }

        return () => {
            isCurrent = false;
        };
    }, [navigate, setCaptain, token]);

    if (!token) {
        return <Navigate to="/CaptainLogin" replace />;
    }

    if (isLoading) {
        return <p className="p-7 text-center">Verifying captain session...</p>;
    }

    return children;
};

export default CaptainProtectWrapper;

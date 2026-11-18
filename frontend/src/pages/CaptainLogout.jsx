import { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainLogout = () => {
    const navigate = useNavigate();
    const { setCaptain } = useContext(CaptainDataContext);
    const [error, setError] = useState('');
    const [retryCount, setRetryCount] = useState(0);
    const requestStarted = useRef(false);

    useEffect(() => {
        if (requestStarted.current) {
            return;
        }

        requestStarted.current = true;
        const token = localStorage.getItem('captainToken');

        const logout = async () => {
            try {
                await axios.post(
                    `${import.meta.env.VITE_BASE_URL}/captain/logout`,
                    {},
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            } catch (logoutError) {
                if (logoutError.response?.status !== 401) {
                    setError(
                        logoutError.response?.data?.message ||
                            'Unable to log out. Please try again.'
                    );
                    return;
                }
            }

            localStorage.removeItem('captainToken');
            localStorage.removeItem('captain');
            setCaptain(null);
            navigate('/CaptainLogin', { replace: true });
        };

        logout();
    }, [navigate, retryCount, setCaptain]);

    return (
        <div className="p-7">
            {error ? (
                <div role="alert" className="text-center">
                    <p className="mb-4 text-red-700">{error}</p>
                    <button
                        type="button"
                        onClick={() => {
                            requestStarted.current = false;
                            setError('');
                            setRetryCount((count) => count + 1);
                        }}
                        className="rounded bg-black px-4 py-2 text-white"
                    >
                        Retry logout
                    </button>
                </div>
            ) : (
                <p className="text-center">Logging out...</p>
            )}
        </div>
    );
};

export default CaptainLogout;

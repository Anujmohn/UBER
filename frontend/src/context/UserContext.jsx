import React, { createContext, useState } from 'react';

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {

    const [user, setUser] = useState(() => {
        try {
            const savedUser = localStorage.getItem('user');

            return savedUser ? JSON.parse(savedUser) : null;
        } catch {
            return null;
        }
    });

    const [token, setToken] = useState(
        () => localStorage.getItem('token') || null
    );

    // Save user data and authentication token
    const updateUser = (userData, authToken) => {
        setUser(userData);
        setToken(authToken);

        if (userData) {
            localStorage.setItem('user', JSON.stringify(userData));
        } else {
            localStorage.removeItem('user');
        }

        if (authToken) {
            localStorage.setItem('token', authToken);
        } else {
            localStorage.removeItem('token');
        }
    };

    // Clear user data and authentication token on logout
    const clearUser = () => {
        setUser(null);
        setToken(null);

        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                token,
                setToken,
                updateUser,
                clearUser,
                isAuthenticated: Boolean(token),
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
// UserContext.js
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({ name: '', email: '' });

    const login = (name, email) => {
        setUser({ name, email });
    };

    return (
        <UserContext.Provider value={{ user, login }}>
            {children}
        </UserContext.Provider>
    );
};

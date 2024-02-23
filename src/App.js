import React from 'react';
// Import the BitcoinRates component

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LoginForm from './LoginForm'; // Adjust path as necessary
import BitcoinRates2 from './BitcoinRates-2'; // Adjust path as necessary
import { UserProvider } from './UserContext';
import UserForm from "./UserForm"; // Adjust path as necessary

function App() {
    return (
        <UserProvider>
            <BrowserRouter>
                <nav>
                    <ul>
                        <li><Link to="/">Login</Link></li>
                        <li><Link to="/bitcoin">Bitcoin Rates</Link></li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<LoginForm />} />
                    <Route path="/bitcoin" element={<BitcoinRates2 />} />
                </Routes>
            </BrowserRouter>
        </UserProvider>
    );
}

export default App;

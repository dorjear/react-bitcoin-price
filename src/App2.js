import React from 'react';
import {UserProvider, useUser} from './UserContext';
import LoginForm from './LoginForm';
import Profile from "./Profile";


function App() {
    return (
        <UserProvider>
            <div className="App">
                <LoginForm />
                {/* Other components that might use UserContext */}
                <Profile />

            </div>
        </UserProvider>
    );
}

export default App;

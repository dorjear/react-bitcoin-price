import React from 'react';
import {UserProvider, useUser} from './UserContext';
import LoginForm from './LoginForm';


function UserForm() {
    // const { user } = useUser();
    return (
        <UserProvider>
            <div className="App">
                <LoginForm />
                {/* Other components that might use UserContext */}
                {/*{user && <h3>Welcome, {user.name}!</h3>}*/}

            </div>
        </UserProvider>
    );
}

export default UserForm;

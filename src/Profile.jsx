import React from 'react';
import { useUser } from './UserContext'; // Adjust the path as necessary

function Profile() {
    const { user } = useUser(); // Use the custom hook to access context

    return (
        <div>
            <h2>User Profile</h2>
            {user ? (
                <ul>
                    <li>Name: {user.name}</li>
                    <li>Email: {user.email}</li>
                </ul>
            ) : (
                <p>No user logged in.</p>
            )}
        </div>
    );
}

export default Profile;

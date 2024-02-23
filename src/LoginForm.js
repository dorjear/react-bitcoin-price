import React, { useState } from 'react';
import { useUser } from './UserContext';
import Profile from "./Profile";

const LoginForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const { login } = useUser();

    const validateForm = () => {
        let isValid = true;
        let errors = {};

        if (!name) {
            isValid = false;
            errors.name = 'Name is required';
        }

        if (!email) {
            isValid = false;
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            isValid = false;
            errors.email = 'Email is invalid';
        }

        if (!password) {
            isValid = false;
            errors.password = 'Password is required';
        } else if (password.length < 6) {
            isValid = false;
            errors.password = 'Password must be at least 6 characters';
        }

        setErrors(errors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            login(name, email);
            // Reset form or redirect user as needed
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                {errors.name && <p>{errors.name}</p>}
            </div>
            <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                {errors.email && <p>{errors.email}</p>}
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                {errors.password && <p>{errors.password}</p>}
            </div>
            <button type="submit">Login</button>
            <Profile />
        </form>
    );
};

export default LoginForm;

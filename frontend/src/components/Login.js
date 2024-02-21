// Login.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import the Login.css file

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Correct usage of useNavigate instead of const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/login/', formData);
            localStorage.setItem('token', response.data.token); // Store token in local storage
            navigate('/forum'); // Use navigate instead of history.push for navigation
        } catch (error) {
            setError('Invalid username or password');
            console.error('Error:', error);
        }
    };

    return (
        <div className="login-container"> {/* Add className for styling */}
            <h2 className="title">Login</h2> {/* Add className for styling */}
            {error && <p>{error}</p>}
            <form className="login-form" onSubmit={handleSubmit}> {/* Add className for styling */}
                <label>
                    Username:
                    <input type="text" name="username" value={formData.username} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                </label>
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;

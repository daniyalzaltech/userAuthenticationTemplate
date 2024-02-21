// Signup.js

import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css'; // Import CSS file for styling
import logo from '../assets/download.png'; // Import logo image

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/signup/', formData);
            console.log(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="signup-container">
            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo" /> {/* Display logo */}
                <h1 className="title">MYNTIST ECOSYSTEM</h1> {/* Title at the top center */}
            </div>
            <h2 className="signup-heading">Signup</h2> {/* Signup heading below the title */}
            <form onSubmit={handleSubmit} className="signup-form">
                <label>
                    Username:
                    <input type="text" name="username" value={formData.username} onChange={handleChange} />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                </label>
                <label>
                    Password:
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                </label>
                <button type="submit">Signup</button>
            </form>
        </div>
    );
};

export default Signup;

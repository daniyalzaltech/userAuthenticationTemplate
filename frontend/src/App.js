// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Forum from './components/Forum';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forum" element={<Forum />} />
                <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

const isLoggedIn = () => {
    // Check if user is logged in (e.g., check local storage for token)
    // Return true if logged in, false otherwise
    return localStorage.getItem('token') !== null;
};

export default App;

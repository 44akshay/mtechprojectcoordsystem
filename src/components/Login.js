import React, { useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import './login.css'; // Import the login.css file
import { useAuthStateValue } from '../context/AuthStateProvider';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [{ user }, dispatch] = useAuthStateValue();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Redirect to '/' if token exists
      navigate('/')
    }
  }, []); // Run only once after component mounts

  const handleLogin = async () => {
    try {
      // Prepare data to be sent in the request body
      const data = {
        username: email,
        password: password
      };

      // Make the API call
      const response = await fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      // Check if response is successful
      if (response.ok) {
        // Parse response body as JSON
        const responseData = await response.json();
        localStorage.setItem('token', responseData.token);
        dispatch({ type: "LOGIN", payload: responseData });

        console.log('Login response:', responseData);
        window.location.reload()
        // Redirect to '/' URL after successful login
        navigate('/');
      } else {
        // Handle error scenario
        console.error('Login failed');
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error:', error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        <p className="forgot-password">Forgot Password?</p>
      </div>
    </div>
  );
};

export default Login;

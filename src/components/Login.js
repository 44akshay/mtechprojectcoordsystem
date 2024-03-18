import React, { useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import './login.css'; // Import the login.css file
import { useAuthStateValue } from '../context/AuthStateProvider';
import { PopupMessage } from './PopupMessage';
import { TailSpin } from 'react-loader-spinner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [{ user }, dispatch] = useAuthStateValue();
  const [loading, setLoading] = useState(false);
  const [isopen,setisopen]=useState(false)
  const [error,setError]=useState('')

  const onClose=()=>{
    setisopen(false);
    setError('')
  }

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
      setLoading(true);
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
        
      setError("some error(try checking  your input)");
      setisopen(true);
      }
    } catch (error) {
      setError(error);
      setisopen(true);
    }finally{
      setLoading(false);
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
       {loading ? (
        <div style={{display:"flex",justifyContent:"center"}}>
        <TailSpin color='darkblue' />
        </div>
        ) : (
          <button onClick={handleLogin}>Login</button>
        )}
        <p className="forgot-password" >Forgot Password?</p>
        <PopupMessage isOpen={isopen} onClose={onClose} message={error} />
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from 'react';
import './login.css'; // Import the login.css file

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('student'); // Default role is 'student'

  const handleLogin = () => {
    // Handle login logic here
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Selected Role:', selectedRole);
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
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
        >
          <option value="student">Student</option>
          <option value="guide">Guide</option>
          <option value="chairperson">Chairperson</option>
          <option value="coordinator">Coordinator</option>
          <option value="expert">Expert</option>
        </select>
        <button onClick={handleLogin}>Login</button>
        <p className="forgot-password">Forgot Password?</p>
      </div>
    </div>
  );
};

export default Login;

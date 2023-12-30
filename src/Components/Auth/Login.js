// src/components/Auth/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../Authservice.js';


function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });


  const showAlert = (message) => {
    console.log(message);
  };


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = AuthService.login(formData.username, formData.password);
    if (user) {
      showAlert('Login successful!');
      navigate('/dashboard');
    } else {
      showAlert('Invalid username or password');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          Username:
          <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} />
        </label>
        <br />
        <label htmlFor="password">
          Password:
          <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;

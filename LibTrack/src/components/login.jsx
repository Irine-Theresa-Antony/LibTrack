// src/components/login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import axios from 'axios';

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  // Set axios defaults to include credentials
  axios.defaults.withCredentials = true;

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3000/api/adminlogin', values, { // Updated URL
      withCredentials: true // Ensure cookies are included in the request
    })
    .then(result => {
      console.log('Login successful:', result.data);
      navigate('/dashboard'); // Redirect to the dashboard
    })
    .catch(err => {
      if (err.response && err.response.status === 401) {
        alert("Invalid email or password");
      } else {
        alert("An unexpected error occurred. Please try again later.");
      }
    });
  };

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 LoginPage'>
  <div className="custom-border">
    <div className="translucent-layer">
      <h2><center>LOGIN</center></h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <center><label htmlFor='emailInput'><strong>Email</strong></label>
          <input
            type='email'
            name='email'
            id='emailInput'
            autoComplete='off'
            placeholder='Enter Email'
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            className='form-control rounded-0'
          /></center>
        </div>
        <div className='mb-3'>
          <center><label htmlFor='passwordInput'><strong>Password</strong></label>
          <input
            type='password'
            name='password'
            id='passwordInput'
            placeholder='Enter Password'
            onChange={(e) => setValues({ ...values, password: e.target.value })}
            className='form-control rounded-0'
          /></center>
        </div>
        <center><button className='btn btn-success w-100 rounded-0'>Log in</button></center>
      </form>
    </div>
  </div>
</div>


  );
}

export default Login;


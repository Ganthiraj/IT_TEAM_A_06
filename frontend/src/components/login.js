import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);

  const navigate = useNavigate();
  const handleSwitch = () => {
    setIsLogin(!isLogin);
  };

  const handleLogin = () => {
    
    console.log("handle login");
    if (!email || !password) {
      alert('Email and password are required.');
      return;
    }
    console.log("Entered email: ", email, " Entered Password: ", password);
    axios
      .post('http://localhost:3002/login', {
        email,
        password,
      })
      .then((response) => {
        console.log('Login successful', response.data);
        navigate('/chatbot');

        // Replace the login page entry in the history stack with the chatbot page entry
        navigate('/chatbot', { replace: true });
      })
      .catch((error) => {
        console.error('Login error', error);
        if (error.response && error.response.status === 401) {

          alert("Invalid email or password");
        } else {
          // Other error (e.g., network issue)
          alert('An error occurred. Please try again.');
        }
      });
  };

  const handleRegister = () => {
    console.log("Entered email: ", email, " Entered Password: ", password);
    console.log("handle register");
    if (!email || !password || !confirmPassword) {
      alert('Email is required.');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    axios
      .post('http://localhost:3002/register', {
        email,
        password,
      })
      .then((response) => {
        console.log('Registration successful', response.data);
        alert('Registration successful! Please log in.');
        navigate('/');
      })
      .catch((error) => {
        console.error('Registration error', error);
        if (error.response && error.response.status === 401) {
          // Unauthorized: Invalid credentials
          alert('Invalid email or password.');
        } else {
          // Other error (e.g., network issue)
          alert('An error occurred. Please try again.');
        }
        // Handle registration error, e.g., display an error message
      });
  };

return (
  <div className="login-page">
    <div className='login-main-container'>
    <div className="switcher">
      <button id='switch-button' className={isLogin ? 'login-active' : ''} onClick={handleSwitch}>
        Login
      </button>
      <button id='switch-button' className={!isLogin ? 'register-active' : ''} onClick={handleSwitch}>
        Register
      </button>
    </div>
    <div className="login-container">
      <div className="form-container">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <h2 className='login-h2'>{isLogin ? 'Login' : 'Create an Account'}</h2>
            <input
              className={`login-input ${isEmailFocused ? 'focused' : ''}`}
              type="email"
              placeholder={isLogin ? 'Email' : 'Email'}
              value={email}
              onChange={(e) => setemail(e.target.value)}
              onFocus={() => setIsEmailFocused(true)}
              onBlur={() => setIsEmailFocused(false)}
              required
            />
            <input
              className={`login-input ${isPasswordFocused ? 'focused' : ''}`}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
              required
            />
            {!isLogin && (
              <input
                className={`login-input ${isConfirmPasswordFocused ? 'focused' : ''}`}
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onFocus={() => setIsConfirmPasswordFocused(true)}
                onBlur={() => setIsConfirmPasswordFocused(false)}
                required
              />
            )}
            <button className="login-button" onClick={isLogin ? handleLogin : handleRegister}>
              {isLogin ? 'Login' : 'Register'}
            </button>
            <p className="switch-text" onClick={handleSwitch}>
              {isLogin ? 'New user? Register' : 'Already have an account? Login'}
            </p>
          </div>
        </form>
      </div>
      </div>
    </div>
  </div>
);
};

export default Login;
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/actions/authActions';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isUsernameActive, setIsUsernameActive] = useState(false);
  const [isPasswordActive, setIsPasswordActive] = useState(false);
  const dispatch = useDispatch();
  const error = useSelector(state => state.authState.error);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(username, password));
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <div className="logo-icon">📝</div>
            <h1>Todo App</h1>
          </div>
          <p className="login-subtitle">Welcome back! Please login to continue.</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {error && (
            <div className="login-error">
              <span className="error-icon">⚠️</span>
              <p>{error}</p>
            </div>
          )}

          <div className="form-group">
            <div className={`input-wrapper ${isUsernameActive ? 'active' : ''}`}>
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onFocus={() => setIsUsernameActive(true)}
                onBlur={() => setIsUsernameActive(username !== '')}
                className="login-input"
              />
              <span className="input-icon">👤</span>
            </div>
          </div>

          <div className="form-group">
            <div className={`input-wrapper ${isPasswordActive ? 'active' : ''}`}>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setIsPasswordActive(true)}
                onBlur={() => setIsPasswordActive(password !== '')}
                className="login-input"
              />
              <span className="input-icon">🔒</span>
            </div>
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <a href="#forgot" className="forgot-password">Forgot password?</a>
          </div>

          <button 
            type="submit" 
            className="login-button"
            disabled={!username || !password}
          >
            Login
            <span className="button-icon">→</span>
          </button>
        </form>

        <div className="login-footer">
          <p>Don't have an account? <a href="#signup">Sign up</a></p>
        </div>
      </div>
      
      <div className="login-decoration">
        <div className="decoration-circle circle-1"></div>
        <div className="decoration-circle circle-2"></div>
        <div className="decoration-circle circle-3"></div>
      </div>
    </div>
  );
};

export default Login;
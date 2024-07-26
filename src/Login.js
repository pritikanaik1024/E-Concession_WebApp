import React, { useState, useEffect } from 'react';
import { fireapp, firestore } from './firebase';
import './Login.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [resetSuccess, setResetSuccess] = useState(false); // State for password reset success
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const unsubscribe = fireapp.auth().onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        checkAdminStatus(user.uid);
      } else {
        setIsLoggedIn(false);
        setIsAdmin(false);
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const checkAdminStatus = async (uid) => {
    try {
      const userDoc = await firestore.collection('users').doc(uid).get();
      if (userDoc.exists && userDoc.data().is_admin === 1) {
        setIsAdmin(true);
        navigate('/AdminDash');
      } else {
        setIsAdmin(false);
        navigate('/UserDash');
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await fireapp.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error('Login failed:', error.message);
      setError('Invalid email or password');
    }
  };

  const handleForgotPassword = async () => {
    try {
      await fireapp.auth().sendPasswordResetEmail(email);
      setResetSuccess(true);
    } catch (error) {
      console.error('Password reset email sending failed:', error.message);
    }
  };

  return (
    <div className="login-form">
      <img src="./loginclip.png" alt="Login" />
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      {resetSuccess && (
          <div className="success-message">Check your email for password reset instructions.</div>
        )}
        <br/>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className={`password-toggle ${showPassword ? 'show' : ''}`}
            onClick={handleTogglePasswordVisibility}
          >
            {showPassword ? 'Hide' : 'Show'}
          </span>
        </div>
        <div className="forgot-password-link" onClick={handleForgotPassword}>
          Forgot Password?
        </div>
        <div>
          <button type="submit" className='Login-button'>Login</button>
        </div>
      </form>
    </div>
  );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '../context/AuthContext';
import { AuthProvider } from '../context/AuthContext';
import './globals.css';

export function LoginPage() {
  const navigate = useNavigate();
  const { userLoggedIn, login, register, loginWithGoogle, resetUserPassword } = useAuth();
  const [loginerror, setLoginError] = useState('');
  const [signuperror, setSignupError] = useState('');
  const [page, setPage] = useState('login');
  const [loginusername, setLoginUsername] = useState('');
  const [loginpassword, setLoginPassword] = useState('');
  const [signupusername, setUsername] = useState('');
  const [signuppassword, setPassword] = useState('');
  const [signuppassword2, setPassword2] = useState('');
  const [forgotPassword, setForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [forgetpassworderror, setForgetPasswordError] = useState('');
  const [forgetpasswordsuccess, setForgetPasswordSuccess] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (page === 'login') {
      const response = await login(loginusername, loginpassword);
      if (response.message) {
        setLoginError('Error: ' + response.code);
      } else {
        setLoginError('');
        if (loginusername === 'kaursimar1149@gmail.com') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      }
    } else {
      if (signuppassword !== signuppassword2) {
        setSignupError('Passwords do not match');
      } else {
        const response = await register(signupusername, signuppassword);
        if (response.message) {
          setSignupError('Error: ' + response.code);
        } else {
          setSignupError('');
          navigate('/');
        }
      }
    }
  };

  const onGoogleSignIn = async (e) => {
    e.preventDefault();
    const response = await loginWithGoogle();
    if (!response.message) {
      navigate('/');
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    const response = await resetUserPassword(forgotPasswordEmail);
    if (response) {
      setForgetPasswordError('Error: ' + response.code);
    } else {
      setForgetPasswordSuccess(true);
      setForgetPasswordError('');
    }
  };

  return (
    <main className="login-main">
      <div className="login-container">
        <div className="login-left">
          <h1>Elite Estate</h1>
          <p>
            Welcome to Elite Estate, your go-to platform for premium real estate listings and services. Sign up to explore a variety of properties tailored to your needs.
          </p>
        </div>
        <div className="login-right">
          <div className="login-right-content">
            <div className="form-container">
              {forgotPassword ? (
                <form onSubmit={handleForgotPassword}>
                  <label>Enter your Email:</label>
                  <input type="text" placeholder="Email Address" value={forgotPasswordEmail} onChange={(e) => setForgotPasswordEmail(e.target.value)} />
                  {forgetpassworderror && <span className="text-red-500">{forgetpassworderror}</span>}
                  <button type="submit" className="reset-button">Send Reset Email</button>
                  {forgetpasswordsuccess && <div className="text-green-500 mt-2">Email Sent! Check your email for the reset link.<br />Refresh the page to login again.</div>}
                </form>
              ) : (
                <>
                  {page === 'login' ? (
                    <form onSubmit={onSubmit}>
                      <label>Email:</label>
                      <input type="text" placeholder="Email Address" value={loginusername} onChange={(e) => setLoginUsername(e.target.value)} />
                      <label>Password:</label>
                      <input type="password" placeholder="Password" value={loginpassword} onChange={(e) => setLoginPassword(e.target.value)} />
                      <span className="text-blue-500 underline cursor-pointer" onClick={() => setForgotPassword(true)}>
                        Forget Password?
                      </span>
                      {loginerror && <span className="text-red-500">{loginerror}</span>}
                      <button type="submit" className="login-button">Login</button>
                      <div className="text-center">OR</div>
                      <button onClick={onGoogleSignIn} className="google-button">
                        <FcGoogle /> Continue with Google
                      </button>
                      <div className="text-center mt-4">
                        <p>If you are a new user,</p>
                        <button className="signup-button" onClick={() => setPage('signup')}>Sign Up</button>
                      </div>
                    </form>
                  ) : (
                    <form onSubmit={onSubmit}>
                      <label>Email:</label>
                      <input type="text" placeholder="Your Email Address" value={signupusername} onChange={(e) => setUsername(e.target.value)} />
                      <label>Set Password:</label>
                      <input type="password" placeholder="Set your Password" value={signuppassword} onChange={(e) => setPassword(e.target.value)} />
                      <label>Confirm Password:</label>
                      <input type="password" placeholder="Confirm your Password" value={signuppassword2} onChange={(e) => setPassword2(e.target.value)} />
                      {signuperror && <span className="text-red-500">{signuperror}</span>}
                      <button type="submit" className="signup-button">Sign Up</button>
                    </form>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <AuthProvider>
      <LoginPage />
    </AuthProvider>
  );
}

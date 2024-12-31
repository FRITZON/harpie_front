import React, { useContext, useEffect, useState } from 'react';
import './login.css';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as Google } from '../../../assets/svg/google.svg';
import { ReactComponent as Facebook } from '../../../assets/svg/facebook.svg';
import { ReactComponent as LinkedIn } from '../../../assets/svg/linkedin.svg';
import { auth } from '../../../api';
import useLocalStorage from '../../../lib/LocalStorage';
import { GoogleLogin } from 'react-google-login';
import Loader from '../../../components/loader/Loader';
import GoogleSignIn from './buttons/GoogleSign';
import FacebookSignIn from './buttons/FacebookSignIn';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useLocalStorage('user');
    const [curerntBuy, setCurrentBuy] = useLocalStorage('current-buy', false);
    const location = useLocation();


    const { redirect, url } = location.state || {};

    console.log(redirect, url)

    const handleGoogleSuccess = async (response) => {
    };

    const handleGoogleFailure = (error) => {
        setMessage('Google Sign-In failed. Please try again.');
    };

    const login_user = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const response = await auth('/auth/login/', { "email_or_phone": email, password: password });
            console.log(response);
            
            if (response.status === 200) {
                setUser(response.data);
                window.location.href = redirect || curerntBuy ? url : '/my-insurances';
            } else if (response.status === 401) {
                setMessage('Invalid Account details, try again.');
            }
            setLoading(false)
        } catch (error) {
            if (error.response && error.response.status === 500) {
                setMessage('Server error, please try again later.');
            } else {
                setMessage('An unexpected error occurred. Please check your details and try again.');
            }
        }
    };

    return (
        <div className='auth'>
            <div className='container'>
                <div className='auth_card_wrapper'>
                    <form onSubmit={login_user} className='main_heading'>
                        <div className='auth_heading_thing'>
                            <h1>Login to your Account</h1>
                            <p>Join the fastest growing insurance manager in Cameroon</p>
                            <p>Welcome back!!</p>
                        </div>

                        {message && (
                            <div className='auth_form_input logout'>
                                <p className='error'>{message}</p>
                            </div>
                        )}
                        
                        <div className='auth_form_input'>
                            <input 
                                type='text' 
                                placeholder='Email or Phone' 
                                onChange={e => setEmail(e.target.value)} 
                                value={email} 
                            />
                        </div>
                        
                        <div className='auth_form_input'>
                            <input 
                                type='password' 
                                placeholder='Password' 
                                onChange={e => setPassword(e.target.value)} 
                                value={password} 
                            />
                        </div>
                        <p className='forgot_password'>
                            <Link to='/auth/forgot-password'>Forgot Password?</Link>
                        </p>
                        {
                            loading
                            ?
                            <div className='auth_form_input loading btn'>
                                <Loader />
                            </div>
                            :
                            <div className='auth_form_input btn'>
                                <input type='submit' value='Sign In' />
                            </div>
                        }

                        <div className='auth_or'>OR</div>

                        <div className='auth_form_input_flex o_auth'>
                            {/* <div className='facebook_button social_auth_btn auth_form_input'>
                                <span><Facebook /></span>
                                Sign in with Facebook
                            </div> */}
                            <FacebookSignIn />
                            <div className='linkedin_button social_auth_btn auth_form_input'>
                                <span><LinkedIn /></span>
                                Sign in with LinkedIn
                            </div>
                        </div>
                        <div className='google_btn_wrapper'>
                            <GoogleSignIn />
                        </div>
                    </form>
                    <div className='auth_account_status'>
                        You don't have an account yet? <Link to='/auth/register'>Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

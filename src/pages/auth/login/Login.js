import React, { useEffect, useState } from 'react'
import './login.css'
import { Link } from 'react-router-dom'
import { ReactComponent as Google } from '../../../assets/svg/google.svg'
import { ReactComponent as Facebook } from '../../../assets/svg/facebook.svg'
import { ReactComponent as LinkedIn } from '../../../assets/svg/linkedin.svg'
import { auth } from '../../../api'
import useLocalStorage from '../../../lib/LocalStorage'
import { GoogleLogin } from 'react-google-login';

const Login = () => {
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPaswsord] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useLocalStorage('user')

    

    const handleGoogleSuccess = async (response) => {
        console.log("response: ", response);

        // setLoading(true);
        // try {
        //     const res = await auth('/auth/google/', { id_token: response.tokenId });
        //     if (res.status === 200) {
        //         setUser(res.data);
        //         window.location.href = '/my-insurances';
        //     } else {
        //         setMessage('Google Sign-In failed. Please try again.');
        //     }
        // } catch (error) {
        //     setMessage('An error occurred during Google Sign-In. Please try again.');
        // }
        // setLoading(false);
    };

    const handleGoogleFailure = (error) => {
        console.log('Google Sign-In Error:', error);
        setMessage('Google Sign-In failed. Please try again.');
    };


    const login_user = async(e) => {
        e.preventDefault()
        const response = await auth('/auth/login/', {email, password})
        console.log(response)
        if(response.status === 200) {
            console.log(response.data)
            setUser(response?.data)
            window.location.href = '/my-insurances'
        } 
        if(response.status === 401) {
            setMessage('Invalid Account details, try again')
        }
        else {
            setMessage('An error occured, try again')
        }
    }
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

                        {
                            message && <div className='auth_form_input logout'>
                                <p className='error'>{message}</p>
                            </div>
                        }
                        <div className='auth_form_input'>
                            <input type='text' placeholder='Email or Phone' onChange={e => setEmail(e.target.value)} value={email} />
                        </div>
                        
                        <div className='auth_form_input'>
                            <input type='password' placeholder='Password' onChange={e => setPaswsord(e.target.value)} value={password} />
                        </div>
                        <p className='forgot_password'><Link to='/auth/forgot-password'>Forgot Password?</Link></p>
                        <div className='auth_form_input btn'>
                            <input type='submit' value='Sign In' />
                        </div>

                        <div className='auth_or'>OR</div>

                        <GoogleLogin
                            clientId="1086958839206-shumhednu0e6ickb6q9vhsnm1rvt9lhg.apps.googleusercontent.com"
                            render={renderProps => (
                                <button onClick={renderProps.onClick} disabled={renderProps.disabled} className='google_button social_auth_btn auth_form_input'>
                                    <span><Google /></span>
                                    Sign in with Google
                                </button>
                            )}
                            onSuccess={handleGoogleSuccess}
                            onFailure={handleGoogleFailure}
                            cookiePolicy={'single_host_origin'}
                        />
                        <div className='auth_form_input_flex o_auth'>
                            <div className='facebook_button social_auth_btn auth_form_input'>
                                <span><Facebook /></span>
                                Sign in with Facebook
                            </div>
                            <div className='linkedin_button social_auth_btn auth_form_input'>
                                <span><LinkedIn /></span>
                                Sign in with LinkedIn
                            </div>
                        </div>

                        <div className='google_button social_auth_btn auth_form_input'>
                            <span><Google /></span>
                            Sign in with Google
                        </div>
                    </form>
                    <div className='auth_account_status'>You don't have an account yet? <Link to='/auth/register'>Sign Up</Link></div>
                </div>
        </div>

    </div>
  )
}

export default Login 
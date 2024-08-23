import React, { useState } from 'react'
import './login.css'
import { Link } from 'react-router-dom'
import { ReactComponent as Google } from '../../../assets/svg/google.svg'
import { ReactComponent as Facebook } from '../../../assets/svg/facebook.svg'
import { ReactComponent as LinkedIn } from '../../../assets/svg/linkedin.svg'

const Login = () => {
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPaswsord] = useState('')
    
  return (
    <div className='auth'>
        
        <div className='container'>
            <div className='auth_card_wrapper'>
                    <form className='main_heading'>
                        <div className='auth_heading_thing'>
                            <h1>Login to your Account</h1>
                            <p>Join the fastest growing insurance manager in Cameroon</p>
                            <p>Welcome back!!</p>
                        </div>


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
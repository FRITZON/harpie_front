import React, { useState } from 'react'
import './login.css'
import { Link } from 'react-router-dom'
import { ReactComponent as Google } from '../../../assets/svg/google.svg'
import { ReactComponent as Facebook } from '../../../assets/svg/facebook.svg'
import { ReactComponent as LinkedIn } from '../../../assets/svg/linkedin.svg'
import { auth } from '../../../api'

const Register = () => {
    const [first_name, setFirst_name] = useState('')
    const [last_name, setLast_name] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPaswsord] = useState('')
    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const validate_user = () => {
        if(first_name === '') {
            alert('First Name is required')
        }
        if(last_name === '') {
            alert('Last Name is required')
        }
        if(email === '') {
            alert('Email is required')
        }
        if(phone === '') {
            alert('Phone is required')
        }
        if(password === '') {
            alert('Password is required')
        }
    }

    const alert = (msg) => {
        setMessage(msg)
        setTimeout(() => {
            setMessage('')
        }, 3000);
    }

    const register_user = async(e) => {
        e.preventDefault()
        validate_user()
        setIsLoading(true)
        const response = await auth('/auth/register/', {first_name, last_name, email, phone, password, "ip_address": "192.168.63.1"})

        if(response.status === 201) {
            handle_login_success(response.data)
        }
        else {
            alert('An error occured')
        }
        console.log(response)
        setIsLoading(false)
    }


    const handle_login_success = (data) => {
        window.location.href = '/auth/account-created'
    }

    

    
  return (
    <div className='auth'>
        
        <div className='container'>
            <div className='auth_card_wrapper'>
                    <form onSubmit={register_user} className='main_heading'>
                        <div className='auth_heading_thing'>
                            <h1>Create an Account</h1>
                            <p>Join the fastest growing insurance manager in Cameroon</p>
                            <p>Welcome to Harpie</p>
                        </div>

                        {
                            message && <div className='auth_form_input logout'><p>{message}</p></div>
                        }

                        <div className='auth_form_input_flex'>
                            <div className='auth_form_input'>
                                <input type='text' placeholder='First Name'  onChange={e => setFirst_name(e.target.value)} value={first_name} />
                            </div>
                            <div className='auth_form_input'>
                                <input type='text' placeholder='Last Name' onChange={e => setLast_name(e.target.value)}  value={last_name} />
                            </div>
                        </div>

                        <div className='auth_form_input'>
                            <input type='email' placeholder='Email' onChange={e => setEmail(e.target.value)} value={email} />
                        </div>
                        
                        <div className='auth_form_input'>
                            <input type='text' name='phone' placeholder='Phone' onChange={e => setPhone(e.target.value)} value={phone} />
                        </div>
                        
                        <div className='auth_form_input'>
                            <input type='password' placeholder='Password' onChange={e => setPaswsord(e.target.value)} value={password} />
                        </div>
                        <div className='auth_form_input btn'>
                            <button type='submit' disabled={isLoading}>{isLoading ? 'Loading...' : 'Sign Up'}</button>
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
                    <div className='auth_account_status'>I agree to the 
                        <Link to='/terms-of-service'>Terms of Service</Link>, 
                        <Link to='/general-terms-and-conditions'> General Terms and Conditions</Link>, and
                        <Link to='/privacy-policy'> Privacy Policy</Link>  
                    </div>
                    <div className='auth_account_status'>Already have an account? <Link to='/auth/login'>Login</Link></div>
                </div>
        </div>

    </div>
  )
}

export default Register
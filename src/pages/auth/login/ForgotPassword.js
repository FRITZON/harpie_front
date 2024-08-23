import React, { useState } from 'react'
import './login.css'
import { Link } from 'react-router-dom'
import { ReactComponent as Google } from '../../../assets/svg/google.svg'
import { ReactComponent as Facebook } from '../../../assets/svg/facebook.svg'
import { ReactComponent as LinkedIn } from '../../../assets/svg/linkedin.svg'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPaswsord] = useState('')
    
  return (
    <div className='auth'>
        
        <div className='container'>
            <div className='auth_card_wrapper'>
                    <form className='main_heading'>
                        <div className='auth_heading_thing'>
                            <h1>Forgot Your Password</h1>
                            <p>Enter your email below to request for a new password</p>
                            <p>We will send you an email on instructions to reset your password</p>
                        </div>


                        <div className='auth_form_input'>
                            <input type='text' placeholder='Email or Phone' onChange={e => setEmail(e.target.value)} value={email} />
                        </div>
                        
                        <div className='auth_form_input btn'>
                            <input type='submit' value='Request Password' />
                        </div>
                        
                    </form>
                    <div className='auth_account_status'>Would you want another try? <Link to='/auth/login'>Log In</Link></div>
                </div>
        </div>

    </div>
  )
}

export default ForgotPassword
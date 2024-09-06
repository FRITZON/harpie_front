import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaCheckCircle } from 'react-icons/fa'

const PasswordResetNotify = () => {

    const location = useLocation();
    const user = location.state?.email;

  return (
    <div className='auth'>
        
        <div className='container'>
            <div className='auth_card_wrapper'>
                    <div className='auth_heading_thing'>
                        <h1>New Password Requested</h1>
                        <p>An Email has been sent to <strong style={{ fontWeight: '600'}}>{ user }</strong></p>
                        <p>Follow the procedure in the email to change your password</p>
                    </div>
                    <div className='reset_password_icon'>
                        <FaCheckCircle />
                    </div>
                    <div className='auth_account_status'>Use My <Link to='/auth/request-otp'>Phone Number</Link> Instead</div>
                    <div className='auth_account_status' style={{ marginTop: '0px'}}>Would you want another try? <Link to='/auth/login'>Log In</Link></div>
                </div>
        </div>

    </div>
  )
}

export default PasswordResetNotify
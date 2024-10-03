import React, { useState } from 'react'
import './login.css'
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as Google } from '../../../assets/svg/google.svg'
import { ReactComponent as Facebook } from '../../../assets/svg/facebook.svg'
import { ReactComponent as LinkedIn } from '../../../assets/svg/linkedin.svg'
import { auth } from '../../../api'
import Loader from '../../../components/loader/Loader'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const navigate = useNavigate()
    
    const handle_request_password = async(e) => {
        e.preventDefault()
        setLoading(true)
        const response = await auth('/auth/request-password-reset/', { email })

        if(response.status === 200) {
            navigate('/auth/password-reset-sent', { state: {  email } });
        }
        else {
            setMessage('Unable to find account with this email. try again')
        }
        setLoading(false)
    }
  return (
    <div className='auth'>
        
        <div className='container'>
            <div className='auth_card_wrapper'>
                    <form onSubmit={ handle_request_password } className='main_heading'>
                        <div className='auth_heading_thing'>
                            <h1>Forgot Your Password</h1>
                            <p>Enter your email below to request for a new password</p>
                            <p>We will send you an email on instructions to reset your password</p>
                        </div>
                        {message && (
                            <div className='auth_form_input logout'>
                                <p className='error'>{message}</p>
                            </div>
                        )}
                        

                        <div className='auth_form_input'>
                            <input type='text' placeholder='Email Address' onChange={e => setEmail(e.target.value)} value={email} />
                        </div>
                        {
                            loading
                            ?
                            <div className='auth_form_input loading btn'>
                                <Loader />
                            </div>
                            :
                            <div className='auth_form_input btn'>
                                <input type='submit' value='Request Password' />
                            </div>
                        }
                        
                    </form>
                    <div className='auth_account_status'>Use My <Link to='/auth/request-otp'>Phone Number</Link> Instead</div>
                    <div className='auth_account_status' style={{ marginTop: '0px'}}>Would you want another try? <Link to='/auth/login'>Log In</Link></div>
                </div>
        </div>

    </div>
  )
}

export default ForgotPassword
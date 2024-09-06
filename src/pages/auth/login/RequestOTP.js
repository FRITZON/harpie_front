import React, { useState } from 'react'
import Loader from '../../../components/loader/Loader'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../../api'

const RequestOTP = () => {
    const [phone, setphone] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handle_request_otp = async(e) => {
        e.preventDefault()
        setLoading(true)
        const response = await auth('/auth/verify/otp/', { phone })

        if(response.status === 200) {
            navigate('/auth/password-reset-sent', { state: {  phone } });
        }
        else {
            setMessage('Unable to find account with this Phone. try again')
        }
        
        setLoading(false)
    }
  return (
    <div className='auth'>
        
        <div className='container'>
            <div className='auth_card_wrapper'>
                    <form onSubmit={ handle_request_otp } className='main_heading'>
                        <div className='auth_heading_thing'>
                            <h1>Request One-Time-Password</h1>
                            <p>Enter your phone number below to login</p>
                            <p>A code will be sent to your phone which you will use to login</p>
                        </div>
                        {message && (
                            <div className='auth_form_input logout'>
                                <p className='error'>{message}</p>
                            </div>
                        )}
                        

                        <div className='auth_form_input'>
                            <input type='text' placeholder='Phone Number' onChange={e => setphone(e.target.value)} value={phone} />
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
                    <div className='auth_account_status'>Use My <Link to='/auth/forgot-password'> Email Address </Link> Instead</div>
                    <div className='auth_account_status' style={{ marginTop: '0px'}}>Would you want another try? <Link to='/auth/login'>Log In</Link></div>
                </div>
        </div>

    </div>
  )
}

export default RequestOTP
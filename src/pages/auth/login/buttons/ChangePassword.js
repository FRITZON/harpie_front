import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../../../api'
import Loader from '../../../../components/loader/Loader'


const ChangePassword = () => {
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handle_request_otp = async(e) => {
        e.preventDefault()
        setLoading(true)
        const response = await auth('/auth/verify/otp/', { password })

        if(response.status === 200) {
            navigate('/auth/password-reset-sent', { state: {  password } });
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
                            <h1>Create new Password</h1>
                            <p>Once you confirm your new password, your password</p>
                            <p>will be changed permenently</p>
                        </div>
                        {message && (
                            <div className='auth_form_input logout'>
                                <p className='error'>{message}</p>
                            </div>
                        )}
                        

                        <div className='auth_form_input'>
                            <input type='text' placeholder='New password' onChange={e => setPassword(e.target.value)} value={password} />
                        </div>
                        <div className='auth_form_input'>
                            <input type='text' placeholder='Confirm new password' onChange={e => setPassword(e.target.value)} value={password} />
                        </div>
                        {
                            loading
                            ?
                            <div className='auth_form_input loading btn'>
                                <Loader />
                            </div>
                            :
                            <div className='auth_form_input btn'>
                                <input type='submit' value='Change Password' />
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

export default ChangePassword
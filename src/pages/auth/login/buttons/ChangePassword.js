import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { auth } from '../../../../api'
import Loader from '../../../../components/loader/Loader'


const ChangePassword = () => {
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [success, setSuccess] = useState('')
    const location = useLocation()
    
    const query = new URLSearchParams(location.search);
    const uid = query.get('uid');
    const token = query.get('token');
    
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handle_submit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!newPassword) {
            setMessage('Please enter a new password.');
            return;
        }

        if (newPassword !== confirmPassword){
            setMessage('Passwords do not match.');
            return;
        }

       setLoading(true);

        const payload = {
            uid,
            token,
            new_password: newPassword
        }
        const response = await auth('/auth/reset-password', payload);
        setLoading(false);

        if(response.status === 202) {
            window.location.href = '/auth/login';
        }
  
      
    };
  

    /*const handle_request_otp = async(e) => {
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
    }*/
  return (
    <div className='auth'>
        
        <div className='container'>
            <div className='auth_card_wrapper'>
                    <form onSubmit={ handle_submit } className='main_heading'>
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
                            <input type='password' placeholder='New password' onChange={(e) => setNewPassword(e.target.value)} value={newPassword} />
                        </div>
                        <div className='auth_form_input'>
                            <input type='password' placeholder='Confirm new password' onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />

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
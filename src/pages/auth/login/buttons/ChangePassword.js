import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../../../api'
import Loader from '../../../../components/loader/Loader'


const ChangePassword = () => {
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [success, setSuccess] = useState('')
    
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handle_submit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!newPassword) {
            setError('Please enter a new password.');
            return;
        }

        if (newPassword !== confirmPassword){
            setError('Passwords do not match.');
            return;
        }

       setLoading(true);

       const user = JSON.parse(localStorage.getItem('user'));
       const uid = user?.uid; 
       const token = user?.token; 
       
        
        const response = await auth('/auth/reset-password', { uid,
            token,
           
            new_password: newPassword });
            console.log(response);
  
        if (response.status === 200) {
          setSuccess('Password changed successfully');
          navigate('/auth/password-reset-sent'); 
        } else {
          setError('Failed to change password');
        }
      
       setLoading(false);
      
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
                        {error && <p style={{ color: 'red'}}>{error}</p>}
                        {success && <p style={{ color: 'gren'}}>{success}</p>}
                        
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
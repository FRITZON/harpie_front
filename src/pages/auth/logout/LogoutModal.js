import React from 'react'
import { VscClose } from 'react-icons/vsc'
import './logout.css'

const LogoutModal = ({ handle_remove_modal }) => {

    const logout_user = () => {
        localStorage.removeItem('user')
        window.location.href = '/auth/login'
    }

  return (
    <div className='logout_modal'>
        <div className='logout_modal_content'>
            <h1>Are you sure you want to logout?</h1>
            <p>Click yes to logout or no to cancel</p>
            <div className='logout_modal_btns'>
                <button onClick={logout_user}>log me out</button>
            </div>
            <div onClick={handle_remove_modal} className='logout_modal_close'>
                <VscClose />
            </div>
        </div>
        <div className='logout_modal_underlay' />
    </div>
  )
}

export default LogoutModal
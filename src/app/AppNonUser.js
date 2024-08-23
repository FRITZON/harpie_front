import { Route, Routes, useLocation } from 'react-router-dom'
import React from 'react'


import Header from '../components/header/Header'
import Footer from '../components/Footer/Footer'
import HomePage from '../pages/Home/HomePage'
import Login from '../pages/auth/login/Login'
import Register from '../pages/auth/login/Register'
import ForgotPassword from '../pages/auth/login/ForgotPassword'
import About from '../pages/about/About'
import { Contact } from '../pages/contact/Contact'

const AppNonUser = () => {
    const route = useLocation()
  return (
    <>

        { route.pathname.startsWith('/auth')  ? '' : <Header /> }
        
        <Routes>
            <Route path='/auth/login' element={<Login />} />
            <Route path='/auth/register' element={<Register />} />
            <Route path='/auth/forgot-password' element={<ForgotPassword />} />
            <Route path='/about' element={<About />} />
            <Route path='/contacts' element={<Contact />} />
            <Route path='/' element={<HomePage />} />
        </Routes>

        {/* <div class="loader"></div>*/}

        { route.pathname.startsWith('/auth')  ? '' : <Footer /> }
        
    </>
  )
}

export default AppNonUser
import { Route, Routes } from 'react-router-dom'
import React from 'react'
  

import Footer from '../components/Footer/Footer'
import About from '../pages/about/About'
import { Contact } from '../pages/contact/Contact'
import HomeUser from '../pages/Home/HomeUser'
import HeaderUser from '../components/header/HeaderUser'

const AppNonUser = () => {
  return (
    <>

        <HeaderUser />
        <Routes>
            <Route path='/about' element={<About />} />
            <Route path='/contacts' element={<Contact />} />
            <Route path='/' element={<HomeUser />} />
        </Routes>

        {/* <div class="loader"></div>*/}

        <Footer />
        
    </>
  )
}

export default AppNonUser
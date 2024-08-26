import { Route, Routes } from 'react-router-dom'
import React from 'react'
  

import Footer from '../components/Footer/Footer'
import About from '../pages/about/About'
import { Contact } from '../pages/contact/Contact'
import HomeUser from '../pages/Home/HomeUser'
import HeaderUser from '../components/header/HeaderUser'
import FAQPage from '../pages/faq/FaqPage'
import HomePage from '../pages/Home/HomePage'
import NotFound from '../pages/not_found/NotFound'
import GeneralTermsAndConditions from '../pages/policy/GeneralTermsAndConditions'
import PrivacyPolicy from '../pages/policy/PrivacyPolicy'
import TermsOfService from '../pages/policy/TermsOfService'
import Service from '../pages/services/Service'

const AppNonUser = () => {
  return (
    <>

        <HeaderUser />
        <Routes>
            <Route path='/about' element={<About />} />
            <Route path='/contacts' element={<Contact />} />
            <Route path='/faq' element={<FAQPage />} />
            <Route path='/services' element={<Service />} />
            <Route path='/' element={<HomePage />} />



            {/* ACCOUNTS AND POLICIES */}
            <Route path='/general-terms-and-conditions' element={<GeneralTermsAndConditions />} />
            <Route path='/privacy-policy' element={<PrivacyPolicy />} />
            <Route path='/terms-of-service' element={<TermsOfService />} />
            <Route path='*' element={<NotFound />} />
              
        </Routes>

        {/* <div class="loader"></div>*/}

        <Footer />
        
    </>
  )
}

export default AppNonUser
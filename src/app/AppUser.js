import { Route, Routes } from 'react-router-dom'
import React from 'react'
  

import Footer from '../components/Footer/Footer'
import About from '../pages/about/About'
import { Contact } from '../pages/contact/Contact'
import HomeUser from '../pages/Home/HomeUser'
import HeaderUser from '../components/header/HeaderUser'
import FAQPageFR from '../pages/faq/FAQPageFR'
import HomePage from '../pages/Home/HomePage'
import NotFound from '../pages/not_found/NotFound'
import Service from '../pages/services/Service'
import PrivacyPolicyFR from '../pages/policy/PrivacyPolicyFR'
import GeneralTermsAndConditionsFR from '../pages/policy/GeneralTermsAndConditionsFR'
import TermsOfServiceFR from '../pages/policy/TermsOfServiceFR'

const AppNonUser = () => {
  return (
    <>

        <HeaderUser />
        <Routes>
            <Route path='/about' element={<About />} />
            <Route path='/contacts' element={<Contact />} />
            <Route path='/faq' element={<FAQPageFR />} />
            <Route path='/services' element={<Service />} />
            <Route path='/' element={<HomePage />} />



            {/* ACCOUNTS AND POLICIES */}
            <Route path='/general-terms-and-conditions' element={<GeneralTermsAndConditionsFR />} />
            <Route path='/privacy-policy' element={<PrivacyPolicyFR />} />
            <Route path='/terms-of-service' element={<TermsOfServiceFR />} />
            <Route path='*' element={<NotFound />} />
              
        </Routes>

        {/* <div class="loader"></div>*/}

        <Footer />
        
    </>
  )
}

export default AppNonUser
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
import AccountCreated from '../pages/auth/login/AccountCreated'
import NotFound from '../pages/not_found/NotFound'
import Service from '../pages/services/Service'
import Results from '../pages/comparison/Results'
import StartComparision from '../pages/comparison/StartComparision'
import ComparisionQuestions from '../pages/comparison/questions/ComparisionQuestions'
import { changeLanguage } from 'i18next'
import PrivacyPolicyFR from '../pages/policy/PrivacyPolicyFR'
import GeneralTermsAndConditionsFR from '../pages/policy/GeneralTermsAndConditionsFR'
import TermsOfServiceFR from '../pages/policy/TermsOfServiceFR'
import FAQPageEN from '../pages/faq/FaqPageEN'
import FAQPageFR from '../pages/faq/FAQPageFR'

const AppNonUser = () => {
    const route = useLocation()

    const changeUserLanguage = (lang) => {
        changeLanguage(lang)
        window.location.reload()
    }
  return (
    <>

        { route.pathname.startsWith('/auth')  ? '' : <Header changeLang={changeUserLanguage} /> }
        
        <Routes>
            <Route path='/auth/account-created' element={<AccountCreated />} />
            <Route path='/auth/login' element={<Login />} />
            <Route path='/auth/register' element={<Register />} />
            <Route path='/auth/forgot-password' element={<ForgotPassword />} />
            <Route path='/about' element={<About />} />

            {/* GENERAL PAGES  */}
            <Route path='/contacts' element={<Contact />} />
            <Route path='/faq' element={<FAQPageEN />} />
            <Route path='/faq' element={<FAQPageFR/> }/>
            <Route path='/' element={<HomePage />} />

            {/* ACCOUNTS AND POLICIES */}
            <Route path='/general-terms-and-conditions' element={<GeneralTermsAndConditionsFR />} />
            <Route path='/privacy-policy' element={<PrivacyPolicyFR />} />
            <Route path='/terms-of-service' element={<TermsOfServiceFR />} />
              
              <Route path='/services' element={<Service />} />
              <Route path='/comparison/insurances' element={<Results />} />
              <Route path='/comparison/start' element={<StartComparision />} />
              <Route path='/comparison/questions' element={<ComparisionQuestions />} />
              <Route path='*' element={<NotFound />} />
        </Routes>

        {/* <div class="loader"></div>*/}

        { route.pathname.startsWith('/auth')  ? '' : <Footer /> }
        
    </>
  )
}

export default AppNonUser
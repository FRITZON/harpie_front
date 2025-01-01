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
import PrivacyPolicyFR from '../pages/policy/PrivacyPolicy/PrivacyPolicyFR'
import GeneralTermsAndConditionsFR from '../pages/policy/GeneralTermsAndCondition/GeneralTermsAndConditionsFR'
import TermsOfServiceFR from '../pages/policy/TermsOfServiceFR'
import RequestOTP from '../pages/auth/login/RequestOTP'
import PasswordResetNotify from '../pages/auth/login/PasswordResetNotify'
import ChangePassword from '../pages/auth/login/buttons/ChangePassword'
import HealthInsuanceResults from '../pages/results/HealthInsuanceResults'
import FaqPage from '../pages/faq/FaqPage'
import GeneralTermsAndCondition from '../pages/policy/GeneralTermsAndCondition'
import TermsOfService from '../pages/policy/TermsOfService'
import PrivacyPolicy from '../pages/policy/PrivacyPolicy'
import { VehicleDetailedResult } from '../pages/comparison/results/VehicleDetailedResult'
import PaymentPage from '../pages/pay/PaymentPage'
import LifeInsuanceResults from '../pages/results/LifeInsuanceResults'
import HealthInsuranceDetail from '../pages/comparison/results/Life/LifeInsuranceDetail'
import LifeInsuranceDetail from '../pages/comparison/results/Life/LifeInsuranceDetail'
import DeathInsuanceComparisonResults from '../pages/results/death/DeathInsuanceComparisonResults'
import ComingSoon from '../pages/coming/ComingSoon'

const AppNonUser = () => {
    const route = useLocation()

    const changeUserLanguage = (lang) => {
        changeLanguage(lang)
        window.location.reload()
    }
  return (
    <>

        { route.pathname.startsWith('/auth')  ? '' : <Header changeLang={changeUserLanguage} /> }
        <div className='appWrapper'>
        <Routes>
            <Route path='/auth/account-created' element={<AccountCreated />} />
            <Route path='/auth/login' element={<Login />} />
            <Route path='/auth/register' element={<Register />} />
            <Route path='/auth/forgot-password' element={<ForgotPassword />} />
            <Route path='/auth/request-otp' element={<RequestOTP />} />
            <Route path='/auth/password-reset-sent' element={<PasswordResetNotify />} />
            <Route path='/auth/reset-password' element={<ChangePassword/>} />
            <Route path='/about' element={<About />} />
            <Route path='/coming-soon' element={<ComingSoon />} />

            {/* GENERAL PAGES  */}
            <Route path='/contacts' element={<Contact />} />
            <Route path='/faq' element={<FaqPage />} />
            <Route path='/' element={<HomePage />} />

            {/* ACCOUNTS AND POLICIES */}
            <Route path='/general-terms-and-conditions' element={<GeneralTermsAndCondition />} />
            <Route path='/privacy-policy' element={<PrivacyPolicy />} />
            <Route path='/terms-of-service' element={<TermsOfService />} />
              
            <Route path='/services' element={<Service />} />
            <Route path='/comparison/start' element={<StartComparision />} />
            <Route path='/comparison/questions' element={<ComparisionQuestions />} />


            <Route path='/comparison/result/vehicle' element={<Results />} />
            <Route path='/comparison/result/health' element={<HealthInsuanceResults />} />
            <Route path='/comparison/result/life' element={<LifeInsuanceResults />} />
            <Route path='/comparison/result/death' element={<DeathInsuanceComparisonResults />} />


            <Route path='/vehicle/result' element={<VehicleDetailedResult />} />
            <Route path='/life/result' element={<LifeInsuranceDetail />} />

          
            <Route path='/payment' element={<PaymentPage />} />

            <Route path='*' element={<NotFound />} />
        </Routes>
        </div>

        

        { route.pathname.startsWith('/auth')  ? '' : <Footer /> }
        
    </>
  )
}

export default AppNonUser

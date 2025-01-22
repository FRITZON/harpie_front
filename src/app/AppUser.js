import { Route, Routes } from 'react-router-dom'
import React from 'react'
  

import Footer from '../components/Footer/Footer'
import About from '../pages/about/About'
import { Contact } from '../pages/contact/Contact'
import HomeUser from '../pages/Home/HomeUser'
import HeaderUser from '../components/header/HeaderUser'
import HomePage from '../pages/Home/HomePage'
import NotFound from '../pages/not_found/NotFound'
import Service from '../pages/services/Service'
import PrivacyPolicyFR from '../pages/policy/PrivacyPolicy/PrivacyPolicyFR'
import GeneralTermsAndConditionsFR from '../pages/policy/GeneralTermsAndCondition/GeneralTermsAndConditionsFR'
import TermsOfServiceFR from '../pages/policy/TermsOfServiceFR'
import FaqPage from '../pages/faq/FaqPage'
import GeneralTermsAndCondition from '../pages/policy/GeneralTermsAndCondition'
import PrivacyPolicy from '../pages/policy/PrivacyPolicy'
import TermsOfService from '../pages/policy/TermsOfService'
import Results from '../pages/comparison/Results'
import HealthInsuanceResults from '../pages/results/HealthInsuanceResults'
import { VehicleDetailedResult } from '../pages/comparison/results/VehicleDetailedResult'
import StartComparision from '../pages/comparison/StartComparision'
import ComparisionQuestions from '../pages/comparison/questions/ComparisionQuestions'
import PaymentPage from '../pages/pay/PaymentPage'
import PreviousResults from '../pages/user/PreviousResults'
import MyInsurances from '../pages/Insurance/MyInsurances'
import LifeInsuanceResults from '../pages/results/LifeInsuanceResults'
import LifeInsuranceDetail from '../pages/comparison/results/Life/LifeInsuranceDetail'
import HealthInsuanceComparisonResults from '../pages/results/health/HealthInsuranceComparisonResults'
import HealthInsuranceDetail from '../pages/comparison/results/health/HealthInsuranceDetail'
import DeathInsuanceComparisonResults from '../pages/results/death/DeathInsuanceComparisonResults'
import ComingSoon from '../pages/coming/ComingSoon'
import { changeLanguage } from 'i18next'
import VehicleInsuranceProcedureQuestions from '../pages/comparison/results/vehicle/VehicleInsuranceProcedureQuestions'
import HealthInsuranceProcedureQuestions from '../pages/comparison/results/health/questions/HealthInsuranceProcedureQuestions'
import LifeInsuranceProcedureQuestions from '../pages/comparison/results/Life/questions/LifeInsuranceProcedureQuestions'

const AppNonUser = () => {
  const changeUserLanguage = (lang) => {
          changeLanguage(lang)
          window.location.reload()
    }

  return (
    <>

        <HeaderUser changeLang={changeUserLanguage} />
        <div className='appWrapper'>
          <Routes>


              {/* GENERAL PAGES  */}
              <Route path='/about' element={<About />} />
              <Route path='/contacts' element={<Contact />} />
              <Route path='/faq' element={<FaqPage />} />
              <Route path='/' element={<HomePage />} />
              <Route path='/coming-soon' element={<ComingSoon />} />


              {/* ACCOUNTS AND POLICIES */}
              <Route path='/general-terms-and-conditions' element={<GeneralTermsAndCondition />} />
              <Route path='/privacy-policy' element={<PrivacyPolicy />} />
              <Route path='/terms-of-service' element={<TermsOfService />} />
              <Route path='/my-insurances' element={<MyInsurances />} />
                
              <Route path='/services' element={<Service />} />
              <Route path='/comparison/start' element={<StartComparision />} />
              <Route path='/comparison/questions' element={<ComparisionQuestions />} />


              <Route path='/comparison/result/vehicle' element={<Results />} />
              <Route path='/comparison/result/life' element={<LifeInsuanceResults />} />
              <Route path='/comparison/result/health' element={<HealthInsuanceComparisonResults />} />
              <Route path='/comparison/result/death' element={<DeathInsuanceComparisonResults />} />

              
              <Route path='/vehicle/result' element={<VehicleDetailedResult />} />
              <Route path='/vehicle/insuree/questions' element={<VehicleInsuranceProcedureQuestions />} />
              <Route path='/health/insuree/questions' element={<HealthInsuranceProcedureQuestions />} />
              <Route path='/life/insuree/questions' element={<LifeInsuranceProcedureQuestions />} />
              <Route path='/health/result' element={<HealthInsuranceDetail />} />
              {/* <Route path='/death/result' element={<DeathInsuranceDetail />} /> */}
              <Route path='/life/result' element={<LifeInsuranceDetail />} />


              <Route path='/payment' element={<PaymentPage />} />

              <Route path='/previous-comparison/vehicle' element={<PreviousResults />} />

              <Route path='*' element={<NotFound />} />
                
          </Routes>

        </div>

        {/* <div class="loader"></div>*/}

        <Footer />
        
    </>
  )
}

export default AppNonUser
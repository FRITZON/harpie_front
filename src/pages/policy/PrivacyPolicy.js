import React, { useEffect, useState } from 'react'
import { tabTitle } from '../..'
import i18next from 'i18next'
import './policy.css'
import PrivacyPolicyEN from './PrivacyPolicy/PrivacyPolicyEN'
import PrivacyPolicyFR from './PrivacyPolicy/PrivacyPolicyFR'

const PrivacyPolicy = () => {
  const [lang, setLang] = useState('fr')

  tabTitle("Frequently asked questions about Harpie App")
  useEffect(() => {
    setLang(i18next.language)
  }, [])

  return (
    <>
    {
      lang === 'en'
      ?
      <PrivacyPolicyEN />
      :
      <PrivacyPolicyFR />
    }
    </>
  )
}

export default PrivacyPolicy
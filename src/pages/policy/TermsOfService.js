import React, { useEffect, useState } from 'react'
import { tabTitle } from '../..'
import i18next from 'i18next'
import TermsOfServiceEN from './TermsOfServiceEN'
import TermsOfServiceFR from './TermsOfServiceFR'
import './policy.css'

const TermsOfService = () => {
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
      <TermsOfServiceEN />
      :
      <TermsOfServiceFR />
    }
    </>
  )
}

export default TermsOfService
import React, { useEffect, useState } from 'react'
import { tabTitle } from '../..'
import i18next from 'i18next'
import './policy.css'
import GeneralTermsAndConditionsEN from './GeneralTermsAndCondition/GeneralTermsAndConditionsEN'
import GeneralTermsAndConditionsFR from './GeneralTermsAndCondition/GeneralTermsAndConditionsFR'

const GeneralTermsAndCondition = () => {
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
      <GeneralTermsAndConditionsEN />
      :
      <GeneralTermsAndConditionsFR />
    }
    </>
  )
}

export default GeneralTermsAndCondition
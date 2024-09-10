import React, { useEffect, useState } from 'react'
import { tabTitle } from '../..'
import i18next from 'i18next'
import FAQPageEN from './FaqPageEN'
import FAQPageFR from './FAQPageFR'

const FaqPage = () => {
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
      <FAQPageEN />
      :
      <FAQPageFR />
    }
    </>
  )
}

export default FaqPage
import React from 'react'
import { useTranslation } from 'react-i18next';

const Quote = () => {
  const { t } = useTranslation();
  return (
    <section className='home_quote'>
      <p className='home_quote_text'>{t("home.hero_section.quote.paragraph1")}</p>
      <p className='home_quote_text'>{t("home.hero_section.quote.paragraph2")}</p>
      <p className='home_quote_text'>{t("home.hero_section.quote.paragraph3")}</p>
    </section>
  )
}

export default Quote
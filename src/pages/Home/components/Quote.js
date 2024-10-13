import React from 'react'
import { useTranslation } from 'react-i18next';
import CreditInsurance from '../../../assets/img/landing/bank.png'
import HealthInsurance from '../../../assets/img/landing/health.png'
import DeathInsurance from '../../../assets/img/landing/medical.png'
import LifeInsurance from '../../../assets/img/landing/life.png'
import CarInsurance from '../../../assets/img/landing/car.png'
import { Link } from 'react-router-dom';

const Quote = () => {
  const { t } = useTranslation();
  return (
    <>


    <section className='home_quote'>
      <p className='home_quote_text'>{t("home.hero_section.quote.paragraph1")} {t("home.hero_section.quote.paragraph2")} {t("home.hero_section.quote.paragraph3")}</p>
      {/* <p className='home_quote_text'></p>
      <p className='home_quote_text'></p> */}
    </section>

    <section className='home_services_list_wrapper'>
    <div className='home_services_list'>

      <Link to='/comparison/start?insurance_type=vehicle' className='home_services_list_item'>
        <div className='home_services_list_item_icon'>
          <img src={CarInsurance} alt='vehicle Insurance' />
        </div>
        <p className='home_services_list_item_text'>{ t('home.hero_section.cards.title1') }</p>
      </Link>

      <Link to='/comparison/start?insurance_type=health' className='home_services_list_item'>
        <div className='home_services_list_item_icon'>
          <img src={HealthInsurance} alt='health Insurance' />
        </div>
        <p className='home_services_list_item_text'>{ t('home.hero_section.cards.title7') }</p>
      </Link>

      <Link to='/comparison/start?insurance_type=credit' className='home_services_list_item'>
        <div className='home_services_list_item_icon'>
          <img src={CreditInsurance} alt='Credit Insurance' />
        </div>
        <p className='home_services_list_item_text'>{ t('home.hero_section.cards.title10') }</p>
      </Link>

      <Link to='/comparison/start?insurance_type=life' className='home_services_list_item'>
        <div className='home_services_list_item_icon'>
          <img src={LifeInsurance} alt='Life Insurance' />
        </div>
        <p className='home_services_list_item_text'>{ t('home.hero_section.cards.title3') }</p>
      </Link>

      <Link to='/comparison/start?insurance_type=death' className='home_services_list_item'>
        <div className='home_services_list_item_icon'>
          <img src={DeathInsurance} alt='Death Insurance' />
        </div>
        <p className='home_services_list_item_text'>{ t('home.hero_section.cards.title5') }</p>
      </Link>

    </div>
    </section>

    </>
  )
}

export default Quote
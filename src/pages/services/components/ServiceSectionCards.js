import React from 'react'
import { useTranslation } from 'react-i18next'

const ServiceSectionCards = () => {
    const { t } = useTranslation();
  return (
    <div className='service_card_section'>
        <div className='service_card_description_section'>
            <h1 className=''>{ t("services_page.service_hero_page.service_card_section.title")}</h1>
        </div>
        <div className='service_card_card_section'>
            <div className='service_card_wrapper'>
                <div className='service_card_item'>
                    <h3>18</h3>
                    <p>{ t("services_page.service_hero_page.service_card_section.paragraph1")}</p>
                </div>
                <div className='service_card_item'>
                    <h3>198K</h3>
                    <p>{ t("services_page.service_hero_page.service_card_section.paragraph2")}</p>
                </div>
                <div className='service_card_item'>
                    <h3>3</h3>
                    <p>{ t("services_page.service_hero_page.service_card_section.paragraph3")}</p>
                </div>
                <div className='service_card_item'>
                    <h3>6</h3>
                    <p>{ t("services_page.service_hero_page.service_card_section.paragraph4")}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ServiceSectionCards
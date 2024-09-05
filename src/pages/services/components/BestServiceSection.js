import React from 'react'
import './service_components.css'
import { FaHeadset, FaWindowClose } from 'react-icons/fa'
import { VscGitMerge } from 'react-icons/vsc'
import { useTranslation } from 'react-i18next'

const BestServiceSection = () => {
    const { t } = useTranslation();
  return (
    <section className='service_page_best_service'>
        <h1 className='section_title'>{ t("services_page.service_hero_page.service_page_best_service.title")}</h1>
        <div className='best_service_flex'>

            <div className='best_service_item'>
                <div className='icon'>
                    <FaHeadset />
                </div>
                <h3 className='best_service_title'>{ t("services_page.service_hero_page.service_page_best_service.sub_title1")}</h3>
                <p>{ t("services_page.service_hero_page.service_page_best_service.paragraph1")}</p>
            </div>

            <div className='best_service_item'>
                <div className='icon'>
                    <VscGitMerge />
                </div>
                <h3 className='best_service_title'>{ t("services_page.service_hero_page.service_page_best_service.sub_title2")}</h3>
                <p>{ t("services_page.service_hero_page.service_page_best_service.paragraph2")}</p>
            </div>

            <div className='best_service_item'>
                <div className='icon'>
                    <FaWindowClose />
                </div>
                <h3 className='best_service_title'>{ t("services_page.service_hero_page.service_page_best_service.sub_title3")}</h3>
                <p>{ t("services_page.service_hero_page.service_page_best_service.paragraph3")}</p>
            </div>


        </div>
    </section>
  )
}

export default BestServiceSection
import React from 'react'
import { FaArrowAltCircleRight } from 'react-icons/fa'
import ImageOne from '../../../assets/img/about/12.png'
import ImageTwo from '../../../assets/img/about/inner_about02.jpg'
import ImageThree from '../../../assets/img/about/about_list_img02.png'
import { useTranslation } from 'react-i18next'

const AboutTrustSection = () => {
    const { t } = useTranslation();

  return (
    <section className='many_trust_us'>
        <div className='container'>
            <div className='flex_many_trust_us'>
                <div className='trust_us_image'>
                    <img src={ImageOne} alt='trust us' />
                    <img src={ImageTwo} className='no_mobile' alt='trust us' />
                </div>
                <div className='trust_us_content'>
                    <div className='many_trust_us_content_head'>
                        <h1>{ t("about_page.many_trust_us_section.title")}<span>{ t("about_page.many_trust_us_section.span")}</span></h1>
                        <p>{ t("about_page.many_trust_us_section.paragraph")}</p>
                    </div>
                    <div className='trust_us_content_reasons'>
                        <div className='trust_us_inner_flex'>
                            <div>
                                <div className='trust_us_reason'>
                                    <FaArrowAltCircleRight />
                                    <p>{ t("about_page.many_trust_us_reason.paragraph1")}</p>
                                </div>
                                <div className='trust_us_reason'>
                                    <FaArrowAltCircleRight />
                                    <p>{ t("about_page.many_trust_us_reason.paragraph2")}</p>
                                </div>
                                <div className='trust_us_reason'>
                                    <FaArrowAltCircleRight />
                                    <p>{ t("about_page.many_trust_us_reason.paragraph3")}</p>
                                </div>
                            </div>

                            <div className='trust_us_reason_inner_flex_img'>
                                <img src={ImageThree} alt='trust us' />
                            </div>
                        </div>
                        <p>{ t("about_page.many_trust_us_reason.paragraph4")}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default AboutTrustSection
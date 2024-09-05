import React from 'react'
import BrandOne from '../../../assets/img/brands/brand_img01.png'
import BrandTwo from '../../../assets/img/brands/brand_img02.png'
import BrandThree from '../../../assets/img/brands/brand_img03.png'
import BrandFour from '../../../assets/img/brands/brand_img04.png'
import BrandFive from '../../../assets/img/brands/brand_img05.png'
import BrandSix from '../../../assets/img/brands/brand_img06.png'
import { useTranslation } from 'react-i18next';

const Partners = () => {
    const { t } = useTranslation();
  return (
    <div className='home_partners_section'>
        <h2 className='home_section_title'>{t("home.hero_section.partners.title")}</h2>
        <div className='home_partners'>
            <div className='home_partner'>
                <img src={BrandOne} alt='partner' />
            </div>
            <div className='home_partner'>
                <img src={BrandTwo} alt='partner' />
            </div>
            <div className='home_partner'>
                <img src={BrandThree} alt='partner' />
            </div>
            <div className='home_partner'>
                <img src={BrandFour} alt='partner' />
            </div>
            <div className='home_partner'>
                <img src={BrandFive} alt='partner' />
            </div>
            <div className='home_partner'>
                <img src={BrandSix} alt='partner' />
            </div>
        </div>
    </div>
  )
}

export default Partners
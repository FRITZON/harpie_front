import React, { useState, useEffect } from 'react';
import { motion, LayoutGroup } from 'framer-motion';
import LaindImageOne from '../../../assets/img/landing/landing_carousel_slide_one.png';
import LaindImageTwo from '../../../assets/img/landing/landing_carousel_slide_two.png';
import LaindImageThree from '../../../assets/img/landing/landing_carousel_slide_three.png';
import { useTranslation } from 'react-i18next';

const LandingSection = () => {
  const { t } = useTranslation();
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
      {
        title: t("home.hero_section.landing_section.slides_section.title1"),
        description: t("home.hero_section.landing_section.slides_section.description1"),
        image: LaindImageOne,
        gradient: ['#FFF5E6', '#FFE0B2']
      },
      {
        title: t("home.hero_section.landing_section.slides_section.title3"),
        description: t("home.hero_section.landing_section.slides_section.description3"),
        image: LaindImageThree,
        gradient: ['#E8F5E9', '#C8E6C9']
      },
      {
        title: t("home.hero_section.landing_section.slides_section.title3"),
        description: t("home.hero_section.landing_section.slides_section.description3"),
        image: LaindImageTwo,
        gradient: ['#E3F2FD', '#BBDEFB']
      }
    ];
  
    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
      }, 5000);
  
      return () => clearInterval(timer);
    }, [slides.length]); 
  
    return (
      <section>
        <LayoutGroup>
          <section className='landing_section'>
            {slides.map((slide, index) => (
              <motion.div
                key={index}
                className={`landing_carousel_wrapper ${index === currentSlide ? 'active' : ''}`}
                initial={false}
                animate={{
                  opacity: index === currentSlide ? 1 : 0,
                  zIndex: index === currentSlide ? 1 : 0
                }}
                transition={{ duration: 0.5 }}
                style={{
                  background: `radial-gradient(circle, ${slide.gradient[0]} 0%, ${slide.gradient[1]} 100%)`
                }}
              >
                <div className="content">
                  <motion.div 
                    className="main_heading"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <h1>{slide.title}</h1>
                    <p>{slide.description}</p>
                    <div className='landing_carousel_buttons'>
                      <button className='landing_carousel_button'>{t("home.hero_section.landing_section.slides_section.landing_carousel_button1")}</button>
                      <button className='landing_carousel_button'>{t("home.hero_section.landing_section.slides_section.landing_carousel_button2")}</button>
                    </div>
                  </motion.div>
                  <motion.div 
                    className="landing_carousel_image"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <div className='landing_img_placeolder'>
                      <img src={slide.image} alt="" />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </section>
        </LayoutGroup>
        <div className='landing_page_shadow' />
      </section>
    );
}

export default LandingSection;

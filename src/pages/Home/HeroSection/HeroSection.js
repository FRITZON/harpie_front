import React, { useState, useEffect } from 'react';
import './HeroSection.css';
import ImageOne from './image_1.png'
import ImageTwo from './image_2.png'
import ImageThree from './image_4.png'
import { Link, useNavigate } from 'react-router-dom';
import { SquarePlayIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const { t } = useTranslation()
  const slides = [
    {
      title: t('home.hero_section.section_two.title'),
      description: t('home.hero_section.section_two.description'),
      icon: "🏠🚗",
      image: ImageOne,
      bgColor: "#f6fdfe"
    },
    {
      title: t('home.hero_section.section_three.title'),
      description: t('home.hero_section.section_three.description'),
      icon: "👨‍👩‍👧‍👦💼",
      image: ImageTwo,
      bgColor: "#fef6fd"
    },
    {
      title: t('home.hero_section.section_four.title'),
      description: t('home.hero_section.section_four.description'),
      icon: "🧠🔒",
      image: ImageThree,
      bgColor: "#f6fefa"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const navigate = useNavigate();

  const scroll = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  }
  return (
    <>
    <section className="hero-section" style={{ backgroundColor: slides[currentSlide].bgColor }}>
      <div className="hero-background"></div>
      <div className="hero-content">
        <div className="hero-image-container">
          <img 
            src={slides[currentSlide].image} 
            alt={slides[currentSlide].title} 
            className="hero-image"
          />
        </div>
        <div className="hero-text-content">
          <h1 className="hero-title">{ t('home.hero_section.section_one.title') } <span className="highlight">Harpie</span></h1>
          <div className="hero-carousel">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
              >
                <div className="slide-content">
                  <div className="slide-icon">{slide.icon}</div>
                  <h2>{slide.title}</h2>
                  <p>{slide.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="hero-cta">
            <button onClick={() => scroll('services')} className="cta-button primary">{ t('home.hero_section.cta.btn_primary') }</button>
            <button  onClick={() => navigate('https://blog.harpiecm.com')} className="cta-button secondary"><span>{ t('home.hero_section.cta.btn_secondary') }</span> <SquarePlayIcon /> </button>
          </div>
        </div>
      </div>
      <div className="hero-shapes">
        <div className="hero_shape shape-1"></div>
        <div className="hero_shape shape-2"></div>
        <div className="hero_shape shape-3"></div>
        <div className="hero_shape shape-4"></div>
        <div className="hero_shape shape-5"></div>
      </div>
    </section>
    {/* <div className='landing_page_shadow' /> */}
    </>
  );
};

export default HeroSection;


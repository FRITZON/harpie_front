import React, { useState, useEffect } from 'react';
import { motion, LayoutGroup } from 'framer-motion';
import LaindImageOne from '../../../assets/img/landing/landing_carousel_slide_one.png';
import LaindImageTwo from '../../../assets/img/landing/landing_carousel_slide_two.png';
import LaindImageThree from '../../../assets/img/landing/landing_carousel_slide_three.png';


const LandingSection = () => {
  
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
      {
        title: "100% IMPARTIAL insurance Comparator",
        description: "Protect what matters the most. From your home to your car, Harpie provides an easy way to compare insurance options",
        image: LaindImageOne,
        gradient: ['#FFF5E6', '#FFE0B2']
      },
      {
        title: "Insurance for everyone",
        description: "Get the best insurance plans for your family and business",
        image: LaindImageTwo,
        gradient: ['#E8F5E9', '#C8E6C9']
      },
      {
        title: "Chooses the best Coverage for your valuable assets",
        description: "Get the best insurance plans for your family and business",
        image: LaindImageThree,
        gradient: ['#E3F2FD', '#BBDEFB']
      }
    ];
  
    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
      }, 5000);
  
      return () => clearInterval(timer);
    }, []);
  
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
                      <button className='landing_carousel_button'>Get Started</button>
                      <button className='landing_carousel_button'>Learn More</button>
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
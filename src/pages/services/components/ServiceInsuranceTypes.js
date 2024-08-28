import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaBriefcase, FaCar, FaCheckCircle, FaHeart, FaHome, FaUmbrella } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './service_list.css'
import CarCard from '../../../assets/img/about/12.png'
import HouseCard from '../../../assets/img/about/about_us.png'
import FamilyCard from '../../../assets/img/about/inner_about02.jpg'
import LifeCard from '../../../assets/img/about/about_us.png'

const offers = [
    {
        icon: <FaCar />,
        title: 'Car Insurance',
        description: 'Compare car insurance policies and save up to 70% on your insurance.',
        image: CarCard,
        url: '/vehicle-insurance',
        options: [
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime ',
          'mollitia, molestiae quas vel sint commodi repudiandae',
          'consequuntur voluptatum laborum numquam blanditiis ',
          'harum quisquam eius sed odit fugiat iusto fuga praesentium',
          'Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa l',
          'audantium molestias eos  sapiente officiis modi at sunt excepturi expedita sint? ',
          'Sed quibusdam recusandae alias error harum maxime adipisci amet laborum. Perspiciatis',
        ]
      },
      {
        icon: <FaHome />,
        title: 'Home Insurance',
        description: 'Protect your home and your belongings with the best home insurance policies.',
        image: HouseCard,
        url: '/home-insurance',
        options: [
          'Building Insurance',
          'Contents Insurance',
          'Combined Building and Contents',
          'Save Time',
          'Reliable Analysis',
          'Save Money', 
          '100% Secure',
        ]
      },
      {
        icon: <FaHeart />,
        title: 'Life Insurance',
        description: 'Get the best life insurance policy for you and your family.',
        image: FamilyCard,
        url: '/life-insurance',
        options: [
          'Term Life Insurance',
          'Whole Life Insurance',
          'Universal Life Insurance',
          'secure the future of your loved ones',
          'Get the best deal',
          'Save Money', 
          '100% Secure',
        ]
      },
      {
        icon: <FaBriefcase />,
        title: 'Business Insurance',
        description: 'Protect your business with the best business insurance policies.',
        image: LifeCard,
        url: '/business-insurance',
        options: [
          'Public Liability Insurance',
          'Employers Liability Insurance',
          'Professional Indemnity Insurance',
          'Save Time',
          'Reliable Analysis',
          'Save Money', 
          'All risks insurance',
        ]
      },
      {
        icon: <FaUmbrella />,
        title: 'Death Insurance',
        description: 'Insure your life and protect your loved ones with the best death insurance policies.',
        image: FamilyCard,
        url: '/death-insurance',
        options: [
          'Term Life Insurance',
          'Whole Life Insurance',
          'Universal Life Insurance',
          'secure the future of your loved ones',
          'Get the best deal',
          'Save Money', 
          '100% Secure',
        ]
      },
];

const ServiceOfferSection = () => {
  const [activeCard, setActiveCard] = useState(0);

  return (
    <div className='service_offer_section'>
      <div className='service_container'>
        <div className='service_section_content_wrapper'>
          <div className='service_buttons_wrapper'>
            {offers.map((offer, index) => (
              <motion.div
                key={index}
                className={`service_offer_button ${activeCard === index ? 'active' : ''}`}
                onClick={() => setActiveCard(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className='service_offer_icon'>{offer.icon}</span>
                {activeCard === index && (
                  <motion.div
                    className='service_active_ring'
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                    <div className='service_active_ring_inner' />
                    <div className='service_active_ring_inner_two' />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          <div className='service_section_card_wrapper'>
            <AnimatePresence mode="wait">
              <h2>About Our {offers[activeCard].title}</h2>
              <motion.div
                key={activeCard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className='service_offer_card'
                >
                <div className='service_card_content'>
                  <p>{offers[activeCard].description}</p>
                  <div className='service_card_options'>
                    {offers[activeCard].options.map((option, index) => (
                      <div className='service_card_option' key={index}>
                        <>{option}</>
                      </div>
                    ))}
                  </div>

                  <Link to={offers[activeCard].url} >
                    <button class="service_learn_more_link">
                      <span class="circle" aria-hidden="true">
                      <span class="icon arrow"></span>
                      </span>
                      <span class="button-text">Begin Compare</span>
                    </button>
                  </Link>
                </div>
                <div className='service_card_image'>
                  <img src={offers[activeCard].image} alt={offers[activeCard].title} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default ServiceOfferSection;
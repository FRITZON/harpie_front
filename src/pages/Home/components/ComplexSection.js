import React, { useState } from 'react';
import { FaArrowRight, FaBriefcase, FaCar, FaCheckCircle, FaHome, FaUmbrella } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './component.css'; // We'll create this CSS fil
import FamilyCard from '../../../assets/img/landing/family.jpg'
import HouseCard from '../../../assets/img/landing/house.jpg'
import LifeCard from '../../../assets/img/landing/life.jpg'
import CarCard from '../../../assets/img/landing/car.jpg'

const ComplexSection = () => {
  const [activeCard, setActiveCard] = useState(0);

  const offers = [
    { icon: <FaCar />, title: 'Car Insurance' },
    { icon: <FaHome />, title: 'Home Insurance' },
    { icon: <FaUmbrella />, title: 'Life Insurance' },
    { icon: <FaBriefcase />, title: 'Business Insurance' },
  ];

  const cards = [
    {
      icon: <FaCar />,
      title: 'Car Insurance',
      description: 'Compare car insurance policies and save up to 70% on your insurance.',
      image: CarCard,
      url: '/vehicle-insurance',
      options: [
        'Third Party Only',
        'Third Party Fire and Theft',
        'Comprehensive',
        'Save Time',
        'Reliable Analysis',
        'Save Money', 
        '100% Secure',
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
      icon: <FaUmbrella />,
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
    
  ];

  return (
    <section className='home_complicated_section'>
      
      
      <div className='home_what_we_offer'>
        <div className='container'>
          <div className='what_we_offer_home_flex_container'>
            <div className='what_we_offer_home_flex_item'>
              <div className='what_we_offer_home_text_wrapper'>
                <h2 className='home_section_title colored'>What we offer</h2>
                <p>Discover our insurance comparison services. Let us help you achieve your goals.</p>
              </div>
              <div className='what_we_offer_home_insurances'>
                {offers.map((offer, index) => (
                  <motion.div
                    key={index}
                    className={`what_we_offer_home_insurance ${activeCard === index ? 'active' : ''}`}
                    onClick={() => setActiveCard(index)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 1.03 }}
                  >
                    {offer.icon}
                    <h3>{offer.title}</h3>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className='what_we_offer_home_cards'>
              <div className='what_we_offer_home_flex_item'>
                <Link to='/services' className='see-more-link'>
                  See more services <span><FaArrowRight /></span>
                </Link>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCard}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className='what_we_offer_home_card'
                >
                  <div className='what_we_offer_home_card_flex'>
                    <div className='what_we_offer_home_card_image'>
                      <img src={cards[activeCard].image} alt={cards[activeCard].title} />
                    </div>
                    <div className='what_we_offer_home_card_title'>
                      {cards[activeCard].icon}
                      <h3>{cards[activeCard].title}</h3>
                      <p>{cards[activeCard].description}</p>
                      <div className='what_we_offer_home_card_options'>
                        {cards[activeCard].options?.map((option, index) => (
                          <div className='what_we_offer_home_card_option' key={index}>
                            <FaCheckCircle />
                            <span key={index}>{option}</span>
                          </div>
                        ))}
                      </div>
                      <Link to={cards[activeCard].url} className='home_card_compare_link'>
                        Learn more <span><FaArrowRight /></span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
                    <br />      
                    <br />      
                    <br />      

      <div className='home_what_we_offer_video_contact_section'>
        <div className='container'>

          <div className='what_we_offer_video_contact_flex'>
            <div className='what_we_offer_video_contact_item'>
              <div className='what_we_offer_video_contact_text'>
                <h2 className='home_section_title'>Get a quote</h2>
                <p>Compare insurance policies and save up to 70% on your insurance.</p>
                <Link to='/get-a-quote' className='home_get_a_quote_link'>
                  Get a quote <span><FaArrowRight /></span>
                </Link>
              </div>
            </div>
            <div className='what_we_offer_video_contact_item'>
              <div className='what_we_offer_video_contact_text'>
                <h2 className='home_section_title'>Contact us</h2>
                <p>Do you have any questions? Contact us and we will help you.</p>
                <Link to='/contact' className='home_contact_us_link'>
                  Contact us <span><FaArrowRight /></span>
                </Link>
              </div>
            </div>
            <div className='what_we_offer_video_contact_item'>
              <div className='what_we_offer_video_contact_text'>
                <h2 className='home_section_title'>Watch our video</h2>
                <p>Discover our insurance comparison services. Let us help you achieve your goals.</p>
                <Link to='/services' className='home_watch_video_link'>
                  Watch video <span><FaArrowRight /></span>
                </Link>
              </div>
            </div>
          </div>

          <div className='what_we_offer_video_contact_video'>
            <iframe
              src="https://www.youtube.com/embed/7e90gBu4pas"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>                  


    </section>
  );
};

export default ComplexSection;
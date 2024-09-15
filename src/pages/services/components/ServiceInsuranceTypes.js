import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaBriefcase, FaCar, FaCheckCircle, FaHeart, FaHome, FaUmbrella } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './service_list.css'
import CarCard from '../../../assets/img/about/12.png'
import HouseCard from '../../../assets/img/about/about_us.png'
import FamilyCard from '../../../assets/img/about/inner_about02.jpg'
import LifeCard from '../../../assets/img/about/about_us.png'
import { IoAccessibility, IoCarSport, IoHome } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';

const ServiceOfferSection = () => {
  const { t } = useTranslation();
const offers = [
    {
        icon: <IoCarSport />,
        title: t("services_page.service_hero_page.offers.title1"),
        description: t("services_page.service_hero_page.offers.description1"),
        image: CarCard,
        url: 'vehicle',
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
        icon: <IoHome />,
        title: t("services_page.service_hero_page.offers.title2"),
        description: t("services_page.service_hero_page.offers.description2"),
        image: HouseCard,
        url: 'health',
        options: [
          t("services_page.service_hero_page.offers.option2"),
          t("services_page.service_hero_page.offers.option2a"),
          t("services_page.service_hero_page.offers.option2b"),
          t("services_page.service_hero_page.offers.option2c"),
          t("services_page.service_hero_page.offers.option2d"),
          t("services_page.service_hero_page.offers.option2e"), 
          t("services_page.service_hero_page.offers.option2f"),
        ]
      },
      {
        icon: <FaHeart />,
        title: t("services_page.service_hero_page.offers.title3"),
        description: t("services_page.service_hero_page.offers.description3"),
        image: FamilyCard,
        url: 'life',
        options: [
          t("services_page.service_hero_page.offers.option3"),
          t("services_page.service_hero_page.offers.option3a"),
          t("services_page.service_hero_page.offers.option3b"),
          t("services_page.service_hero_page.offers.option3c"),
          t("services_page.service_hero_page.offers.option3d"),
          t("services_page.service_hero_page.offers.option3e"), 
          t("services_page.service_hero_page.offers.option3f"),
        ]
      },
      {
        icon: <FaBriefcase />,
        title: t("services_page.service_hero_page.offers.title4"),
        description: t("services_page.service_hero_page.offers.description4"),
        image: LifeCard,
        url: 'business',
        options: [
          t("services_page.service_hero_page.offers.option3"),
          t("services_page.service_hero_page.offers.option3a"),
          t("services_page.service_hero_page.offers.option3b"),
          t("services_page.service_hero_page.offers.option3c"),
          t("services_page.service_hero_page.offers.option3d"),
          t("services_page.service_hero_page.offers.option3e"), 
          t("services_page.service_hero_page.offers.option3f"),
        ]
      },
      {
        icon: <IoAccessibility />,
        title: t("services_page.service_hero_page.offers.title5"),
        description:  t("services_page.service_hero_page.offers.description5"),
        image: FamilyCard,
        url: 'death',
        options: [
          t("services_page.service_hero_page.offers.option3"),
          t("services_page.service_hero_page.offers.option3a"),
          t("services_page.service_hero_page.offers.option3b"),
          t("services_page.service_hero_page.offers.option3c"),
          t("services_page.service_hero_page.offers.option3d"),
          t("services_page.service_hero_page.offers.option3e"), 
          t("services_page.service_hero_page.offers.option3f"),
        ]
      },
];


  const [activeCard, setActiveCard] = useState(0);

  return (
    <div className='service_offer_section'>
      <div className='service_container'>
        <div className='service_section_content_wrapper'>
          <div className='service_buttons_wrapper'>
            {offers.map((offer, index) => (
              <>
                {/* <span>{offer?.url} Insurance</span> */}
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
              </>
            ))}
          </div>

          <div className='service_section_card_wrapper'>
            <AnimatePresence mode="wait">
              <h2>{t("services_page.service_hero_page.offers.heading")} {offers[activeCard].title}</h2>
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

                  <Link to={'/comparison/start?insurance_type=' + offers[activeCard].url} >
                    <button class="service_learn_more_link">
                      <span class="circle" aria-hidden="true">
                      <span class="icon arrow"></span>
                      </span>
                      <span class="button-text">{t("services_page.service_hero_page.offers.button-text")}</span>
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
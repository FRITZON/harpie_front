import React, { useState } from 'react';
import { FaAccessibleIcon, FaArrowRight, FaBriefcase, FaBus, FaCar, FaCheckCircle, FaCross, FaFirstAid, FaHome, FaOldRepublic, FaPlane, FaUmbrella } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './component.css'; // We'll create this CSS fil
import FamilyCard from '../../../assets/img/landing/family.jpg'
import HouseCard from '../../../assets/img/landing/house.jpg'
import LifeCard from '../../../assets/img/landing/life.jpg'
import DeathCard from '../../../assets/img/landing/death.jpg'
import TravelCard from '../../../assets/img/landing/travel.jpg'
import BusinessCard from '../../../assets/img/landing/business.jpg'
import HealthCard from '../../../assets/img/landing/health.jpg'
import CarCard from '../../../assets/img/landing/car.jpg'
import { IoCarSport, IoHome, IoPeople } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';
import { FaFileWaveform, FaManatSign, FaWaveSquare } from 'react-icons/fa6';
import {
  Car,
  Plane,
  Home,
  Heart,
  HandHeart,
  Church,
  Briefcase,
} from "lucide-react";



const ComplexSection = () => {
  const { t } = useTranslation();
  const [activeCard, setActiveCard] = useState(0);

  const offers = [
    { icon: <Car />, title:  t("home.hero_section.offers.title1") },
    { icon: <HandHeart />, title: t("home.hero_section.offers.title5") },
    { icon: <Heart />, title: t("home.hero_section.offers.title3") },
    { icon: <Church />, title: t("home.hero_section.offers.title6") },
    { icon: <Home />, title: t("home.hero_section.offers.title2") },
    { icon: <Briefcase />, title: t("home.hero_section.offers.title4") },
    { icon: <Plane />, title: t("home.hero_section.offers.title7") },
  ];

  const cards = [
    {
      icon: <Car />,
      title: t("home.hero_section.cards.title1"),
      description: t("home.hero_section.cards.description1"),
      image: CarCard,
      url: '/comparison/start?insurance_type=vehicle',
      options: [
        t("home.hero_section.cards.option1"),
        t("home.hero_section.cards.option1a"),
        t("home.hero_section.cards.option1b"),
        t("home.hero_section.cards.option1c"),
        t("home.hero_section.cards.option1d"),
        t("home.hero_section.cards.option1e"), 
      ]
    },
    {
      icon: <HandHeart />,
      title: t("home.hero_section.cards.title2"),
      description: t("home.hero_section.cards.description2"),
      image: HealthCard,
      url: '/comparison/start?insurance_type=health',
      options: [
        t("home.hero_section.cards.option2"),
        t("home.hero_section.cards.option2a"),
        t("home.hero_section.cards.option2b"),
        t("home.hero_section.cards.option2c"),
      ]
    },
    {
      icon: <Heart />,
      title: t("home.hero_section.cards.title3"),
      description: t("home.hero_section.cards.description3"),
      image: FamilyCard,
      url: '/comparison/start?insurance_type=life',
      options: [
        t("home.hero_section.cards.option3"),
        t("home.hero_section.cards.option3a"),
        t("home.hero_section.cards.option3b"),
        t("home.hero_section.cards.option3c"),
        t("home.hero_section.cards.option3d"),
        t("home.hero_section.cards.option3e"), 
        t("home.hero_section.cards.option3f"),
      ]
    },
    {
      icon: <Church />,
      title: t("home.hero_section.cards.title4"),
      description: t("home.hero_section.cards.description4"),
      image: DeathCard,
      url: '/comparison/start?insurance_type=death',
      options: [
        t("home.hero_section.cards.option4"),
        t("home.hero_section.cards.option4a"),
        t("home.hero_section.cards.option4b"),
        t("home.hero_section.cards.option4c"),
        t("home.hero_section.cards.option4d"),
        t("home.hero_section.cards.option4e"),
        t("home.hero_section.cards.option4f"),
      ]
    },
    {
      icon: <Home />,
      title: t("home.hero_section.cards.title5"),
      description: t("home.hero_section.cards.description5"),
      image: HouseCard,
      url: '/comparison/start?insurance_type=home',
      options: [
        t("home.hero_section.cards.option5"),
        t("home.hero_section.cards.option5a"),
        t("home.hero_section.cards.option5b"),
        t("home.hero_section.cards.option5c"),
        t("home.hero_section.cards.option5d"),
      ]
    },
    {
      icon: <Briefcase />,
      title: t("home.hero_section.cards.title6"),
      description: t("home.hero_section.cards.description6"),
      image: BusinessCard,
      url: '/comparison/start?insurance_type=business',
      options: [
        t("home.hero_section.cards.option6"),
        t("home.hero_section.cards.option6a"),
        t("home.hero_section.cards.option6b"),
        t("home.hero_section.cards.option6c"),
        t("home.hero_section.cards.option6d"),
        t("home.hero_section.cards.option6e"),
        t("home.hero_section.cards.option6f"),
      ]
    },
    {
      icon: <Plane />,
      title: t("home.hero_section.cards.title7"),
      description: t("home.hero_section.cards.description7"),
      image: TravelCard,
      url: '/comparison/start?insurance_type=travel',
      options: [
        t("home.hero_section.cards.option7"),
        t("home.hero_section.cards.option7a"),
        t("home.hero_section.cards.option7b"),
        t("home.hero_section.cards.option7c"),
        t("home.hero_section.cards.option7d"),
        t("home.hero_section.cards.option7e"),
        t("home.hero_section.cards.option7f"),
      ]
    },
    
  ];

  return (
    <section className='home_complicated_section'>
      
      <div className='container'>
        <div className='home_what_we_offer'>
          <div className='container'>
            <div className='what_we_offer_home_flex_container'>
              <div className='what_we_offer_home_flex_item'>
                <div className='what_we_offer_home_text_wrapper'>
                  <h2 className='home_section_title colored'>{t("home.hero_section.home_complicated_section.title")}</h2>
                  <p>{t("home.hero_section.home_complicated_section.paragraph")}</p>
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
                  <br />
                  <Link to='/services' className='see-more-link'>
                  {t("home.hero_section.home_complicated_section.see-more-link")} <span><FaArrowRight /></span>
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

            {/* <div className='what_we_offer_video_contact_flex'>
              <div className='what_we_offer_video_contact_item'>
                <div className='what_we_offer_video_contact_text'>
                  <h2 className='home_section_title'>{t("home.hero_section.home_what_we_offer_video_contact_section.title1")}</h2>
                  <p>{t("home.hero_section.home_what_we_offer_video_contact_section.paragraph1")}</p>
                  <Link to='/services' className='home_get_a_quote_link'>
                  {t("home.hero_section.home_what_we_offer_video_contact_section.home_get_a_quote_link1")} <span><FaArrowRight /></span>
                  </Link>
                </div>
              </div>
              <div className='what_we_offer_video_contact_item'>
                <div className='what_we_offer_video_contact_text'>
                  <h2 className='home_section_title'>{t("home.hero_section.home_what_we_offer_video_contact_section.title2")}</h2>
                  <p>{t("home.hero_section.home_what_we_offer_video_contact_section.paragraph2")}</p>
                  <Link to='/contacts' className='home_contact_us_link'>
                  {t("home.hero_section.home_what_we_offer_video_contact_section.home_get_a_quote_link2")}  <span><FaArrowRight /></span>
                  </Link>
                </div>
              </div>
              <div className='what_we_offer_video_contact_item'>
                <div className='what_we_offer_video_contact_text'>
                  <h2 className='home_section_title'>{t("home.hero_section.home_what_we_offer_video_contact_section.title3")}</h2>
                  <p>{t("home.hero_section.home_what_we_offer_video_contact_section.paragraph3")}</p>
                  <Link to='https://www.youtube.com/@harpiecomparateur' className='home_watch_video_link'>
                  {t("home.hero_section.home_what_we_offer_video_contact_section.home_get_a_quote_link3")}  <span><FaArrowRight /></span>
                  </Link>
                </div>
              </div>
            </div> */}

            <div className='what_we_offer_video_contact_video'>
              <iframe
                src="https://www.youtube.com/embed/8ObMonhigCY"
                title="Welcome to Harpie"
                frameBorder="0"
                height="100"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>                  

      </div>



    </section>
  );
};

export default ComplexSection;
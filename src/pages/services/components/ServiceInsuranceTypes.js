import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaBriefcase, FaCar, FaCheckCircle, FaCross, FaFirstAid, FaHeart, FaHome, FaPlane, FaUmbrella } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './service_list.css'
import CarCard from '../../../assets/img/landing/car.jpg'
import HealthCard from '../../../assets/img/landing/health.jpg'
import FamilyCard from '../../../assets/img/landing/family.jpg'
import DeathCard from '../../../assets/img/landing/death.jpg'
import HouseCard from '../../../assets/img/landing/house.jpg'
import TravelCard from '../../../assets/img/landing/travel.jpg'
import LifeCard from '../../../assets/img/about/about_us.png'
import BusinessCard from '../../../assets/img/landing/business.jpg'
import { IoAccessibility, IoCarSport, IoHome, IoPeople } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';
import {
  Car,
  Plane,
  Home,
  Heart,
  HandHeart,
  Church,
  Briefcase,
} from "lucide-react";

const ServiceOfferSection = () => {
  const { t } = useTranslation();
const offers = [
    {
        icon: <Car />,
        title: t("services_page.service_hero_page.offers.title1"),
        // description: t("services_page.service_hero_page.offers.description1"),
        description: t("home.hero_section.cards.description1_long"),
        image: CarCard,
        url: 'vehicle',
        options: [
          t("home.hero_section.cards.option1a"),
          t("home.hero_section.cards.option1b"),
          t("home.hero_section.cards.option1f"),
          t("home.hero_section.cards.option1g"),
          t("home.hero_section.cards.option1h"),
          t("home.hero_section.cards.option1i"),
        ],
        choice: t("home.hero_section.cards.choice_title1"),
        choices: [
          t("home.hero_section.cards.choice1a"),
          t("home.hero_section.cards.choice1b"),
          t("home.hero_section.cards.choice1c"),
        ],
        restriction_title: t("home.hero_section.cards.restriction_title1"),
        restrictions: [
          t("home.hero_section.cards.restriction1a"),
          t("home.hero_section.cards.restriction1b"),
          t("home.hero_section.cards.restriction1c"),
          t("home.hero_section.cards.restriction1d"),
        ]
      },

    {
      icon: <HandHeart />,
      title: t("home.hero_section.cards.title2"),
      description: t("home.hero_section.cards.description2"),
      image: HealthCard,
      url: '/comparison/start?insurance_type=health',
      restriction_title: t("home.hero_section.cards.restriction_title2"),
      restrictions: [
        t("home.hero_section.cards.restriction2a"),
        t("home.hero_section.cards.restriction2b"),
        t("home.hero_section.cards.restriction2c"),
        t("home.hero_section.cards.restriction2d"),
      ],
      options: [
        t("home.hero_section.cards.option2"),
        t("home.hero_section.cards.option2a"),
        t("home.hero_section.cards.option2b"),
        t("home.hero_section.cards.option2c"),
      ],
      choice: t("home.hero_section.cards.choice_title2"),
      choices: [
        t("home.hero_section.cards.choice2a"),
        t("home.hero_section.cards.choice2b"),
        t("home.hero_section.cards.choice2c"),
      ]
    },
    {
      icon: <Heart />,
      title: t("services_page.service_hero_page.offers.title3"),
      description: t("services_page.service_hero_page.offers.description3"),
      image: FamilyCard,
      url: 'life',
      options: [
        t("home.hero_section.cards.option3"),
        t("home.hero_section.cards.option3a"),
        t("home.hero_section.cards.option3b"),
        t("home.hero_section.cards.option3c"),
        t("home.hero_section.cards.option3d"),
      ],
      restriction_title: t("home.hero_section.cards.restriction_title"),
      restrictions: [
        t("home.hero_section.cards.restriction3a"),
        t("home.hero_section.cards.restriction3b"),
        t("home.hero_section.cards.restriction3c"),
        t("home.hero_section.cards.restriction3d"),
      ],
      choice: t("home.hero_section.cards.choice_title3"),
      choices: [
        t("home.hero_section.cards.choice3a"),
        t("home.hero_section.cards.choice3b"),
        t("home.hero_section.cards.choice3c"),
      ]
    },
    {
      icon: <Church />,
      title: t("home.hero_section.cards.title4"),
      description:  t("services_page.service_hero_page.offers.description8"),
      image: DeathCard,
      url: 'death',
      options: [
        t("home.hero_section.cards.option8"),
        t("home.hero_section.cards.option8a"),
        t("home.hero_section.cards.option8b"),
        t("home.hero_section.cards.option8c"),
        t("home.hero_section.cards.option8d")
      ],
      restriction_title: t("home.hero_section.cards.restriction_title8"),
      restrictions: [
        t("home.hero_section.cards.restriction8a"),
        t("home.hero_section.cards.restriction8b"),
        t("home.hero_section.cards.restriction8c"),
      ],
      choice: t("home.hero_section.cards.choice_title8"),
      choices: [
        t("home.hero_section.cards.choice8a"),
        t("home.hero_section.cards.choice8b"),
        t("home.hero_section.cards.choice8c"),
        t("home.hero_section.cards.choice8d"),
        t("home.hero_section.cards.choice8e"),
      ]
    },
      {
        icon: <Home />,
        title: t("services_page.service_hero_page.offers.title2"),
        description: t("services_page.service_hero_page.offers.description2"),
        image: HouseCard,
        url: 'health',
        options: [
          t("home.hero_section.cards.option5"),
          t("home.hero_section.cards.option5a"),
          t("home.hero_section.cards.option5b"),
          t("home.hero_section.cards.option5c"),
          t("home.hero_section.cards.option5d"),
        ],
        restriction_title: t("home.hero_section.cards.sub_title5_sub"),
        restrictions: [
          t("home.hero_section.cards.restriction5a"),
          t("home.hero_section.cards.restriction5b"),
          t("home.hero_section.cards.restriction5c"),
          t("home.hero_section.cards.restriction5d"),
        ],
        choice: t("home.hero_section.cards.choice_title5"),
        choices: [
          t("home.hero_section.cards.choice5a"),
          t("home.hero_section.cards.choice5b"),
          t("home.hero_section.cards.choice5c"),
        ]
      },
      
      {
        icon: <Briefcase />,
        title: t("services_page.service_hero_page.offers.title4"),
        description: t("home.hero_section.cards.description6"),
        image: BusinessCard,
        url: 'business',
        options: [
          t("home.hero_section.cards.option6"),
          t("home.hero_section.cards.option6a"),
          t("home.hero_section.cards.option6b"),
          t("home.hero_section.cards.option6c"),
          t("home.hero_section.cards.option6d"),
          t("home.hero_section.cards.option6e"),
          t("home.hero_section.cards.option6f"),
        ],
        restriction_title: t("home.hero_section.cards.restriction_title4"),
        restrictions: [
          t("home.hero_section.cards.restriction6a"),
          t("home.hero_section.cards.restriction6b"),
          t("home.hero_section.cards.restriction6c"),
          t("home.hero_section.cards.restriction6d"),
        ],
        choice: t("home.hero_section.cards.choice_title6"),
        choices: [
          t("home.hero_section.cards.choice6a"),
          t("home.hero_section.cards.choice6b"),
          t("home.hero_section.cards.choice6c"),
          t("home.hero_section.cards.choice6d"),
          t("home.hero_section.cards.choice6e"),
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
      ],
      restriction_title: t("home.hero_section.cards.restriction_title7"),
      restrictions: [
        t("home.hero_section.cards.restriction7a"),
        t("home.hero_section.cards.restriction7b"),
        t("home.hero_section.cards.restriction7c"),
        t("home.hero_section.cards.restriction7d"),
        t("home.hero_section.cards.restriction7e"),
        t("home.hero_section.cards.restriction7f"),
      ],
      choice: t("home.hero_section.cards.choice_title7"),
      choices: [
        t("home.hero_section.cards.choice7a"),
        t("home.hero_section.cards.choice7b"),
        t("home.hero_section.cards.choice7c"),
        t("home.hero_section.cards.choice7d"),
        t("home.hero_section.cards.choice7e"),
      ]
    },
      
];


  const [activeCard, setActiveCard] = useState(0);

  return (
    <div className='service_offer_section'>
      <div className='service_container'>
        <div className='service_section_content_wrapper'>
          <div className='service_section_heading'>
            <div className='service_buttons_wrapper'>
              {offers.map((offer, index) => (
                <>
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
                  <p className='service_card_sub_title'>{offers[activeCard].description}</p>
                  <div className='service_card_options'>
                    {offers[activeCard].options.map((option, index) => (
                      <div className='service_card_option' key={index}>
                        <>{option}</>
                      </div>
                    ))}
                  </div>
                  {
                    offers[activeCard].choices
                    && (
                      <>
                      <p className='service_card_sub_title'>{offers[activeCard].choice}</p>
                      <div className='service_card_options'>
                        {offers[activeCard].choices.map((option, index) => (
                          <li className='service_card_restriction service_card_choices' key={index}>
                            <>{option}</>
                          </li>
                        ))}
                      </div>
                      </>
                    )
                  }
                  {
                    offers[activeCard].restriction_title
                    && (
                      <>
                      <p className='service_card_sub_title'>{offers[activeCard].choice}</p>
                      <div className='service_card_options'>
                        {offers[activeCard].restrictions.map((option, index) => (
                          <li className='service_card_restriction' key={index}>
                            <>{option}</>
                          </li>
                        ))}
                      </div>
                      </>
                    )
                  }

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
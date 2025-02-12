import React from 'react';
import { Shield, Car, Plane, CreditCard, Heart, Home, Church, HandHeart } from 'lucide-react';
import './ServiceCards.css';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ServiceCards = () => {

  const { t } = useTranslation()
  const services = [
    {
      title: t('home.hero_section.offer_section.car.title'),
      description: t('home.hero_section.offer_section.car.description'),
      insurance_path: 'comparison/start?insurance_type=vehicle',
      icon: Car,
      color: '#F28A2D',
      gradient: 'from-[#F28A2D] to-[#da7620]'
    },
    {
      title: t('home.hero_section.offer_section.health.title'),
      description: t('home.hero_section.offer_section.health.description'),
      insurance_path: 'comparison/start?insurance_type=health',
      icon: HandHeart,
      // color for health
      color: '#FFDB00',
      gradient: 'from-[#FFDB00] to-[#e6c200]'
    },
    {
      title: t('home.hero_section.offer_section.life.title'),
      description: t('home.hero_section.offer_section.life.description'),
      insurance_path: 'comparison/start?insurance_type=life',
      icon: Heart,
      color: '#f50057',
      gradient: 'from-[#f50057] to-[#c30045]'
    },
    {
      title: t('home.hero_section.offer_section.death.title'),
      description: t('home.hero_section.offer_section.death.description'),
      insurance_path: 'comparison/start?insurance_type=death',
      icon: Church,
      color: '#293178',
      gradient: 'from-[#293178] to-[#1f2659]'
    },
    // {
    //   title: 'Travel Insurance',
    //   description: 'Protect your journeys with comprehensive travel coverage',
    //   insurance_path: '/coming-soon',
    //   icon: Plane,
    //   color: '#12AF9A',
    //   gradient: 'from-[#12AF9A] to-[#0d8b7a]'
    // },
    // {
    //   title: 'Credit Compare',
    //   description: 'Find the best credit options tailored to your needs',
    //   insurance_path: '/coming-soon',
    //   icon: CreditCard,
    //   color: '#0e81f4',
    //   gradient: 'from-[#0e81f4] to-[#0b66c2]'
    // },
  ];
  const navigate = useNavigate();

  return (
    <section id='services' className="services-section">
      <div className="services-container">
        <div className="services-header">
          <h2>{t('home.hero_section.offer_section.title')}</h2>
          <p>{ t('home.hero_section.offer_section.description') }</p>
        </div>
        <div className="services-grid">
          {services.map((service, index) => (
            <div 
              key={index} 
              onClick={()=> navigate(service.insurance_path)}
              className="service-card"
              style={{
                '--card-color': service.color,
                '--card-gradient': `linear-gradient(135deg, ${service.color}, ${service.color}dd)`
              }}
            >
              <div className="card-content">
                <div className="icon-wrapper">
                  <service.icon size={32} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <Link to={service?.insurance_path} className="learn-more">
                  { t("home.hero_section.offer_section.button") }
                  <Shield className="shield-icon" size={16} />
                </Link>
              </div>
              <div className="card-shapes">
                <div className="card_shape shape shape-1"></div>
                <div className="card_shape shape shape-2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCards;


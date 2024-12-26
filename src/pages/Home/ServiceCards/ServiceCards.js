import React from 'react';
import { Shield, Car, Plane, CreditCard, Heart, Home } from 'lucide-react';
import './ServiceCards.css';

const ServiceCards = () => {
  const services = [
    {
      title: 'Car Insurance',
      description: 'Get the best coverage for your vehicle with competitive rates',
      icon: Car,
      color: '#F28A2D',
      gradient: 'from-[#F28A2D] to-[#da7620]'
    },
    {
      title: 'Travel Insurance',
      description: 'Protect your journeys with comprehensive travel coverage',
      icon: Plane,
      color: '#12AF9A',
      gradient: 'from-[#12AF9A] to-[#0d8b7a]'
    },
    {
      title: 'Credit Compare',
      description: 'Find the best credit options tailored to your needs',
      icon: CreditCard,
      color: '#0e81f4',
      gradient: 'from-[#0e81f4] to-[#0b66c2]'
    },
    {
      title: 'Life Insurance',
      description: "Secure your family's future with reliable life insurance",
      icon: Heart,
      color: '#f50057',
      gradient: 'from-[#f50057] to-[#c30045]'
    },
    {
      title: 'Home Insurance',
      description: 'Protect your home and belongings with comprehensive coverage',
      icon: Home,
      color: '#293178',
      gradient: 'from-[#293178] to-[#1f2659]'
    }
  ];

  return (
    <section className="services-section">
      <div className="services-container">
        <div className="services-header">
          <h2>WHAT WE OFFER</h2>
          <p>Discover our insurance comparison services. Let us help you achieve your goals.</p>
        </div>
        <div className="services-grid">
          {services.map((service, index) => (
            <div 
              key={index} 
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
                <button className="learn-more">
                  Learn More
                  <Shield className="shield-icon" size={16} />
                </button>
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


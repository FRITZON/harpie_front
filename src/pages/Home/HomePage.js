import React, { useState, useEffect } from 'react';
import './home.css';
// import LandingSection from './components/LandingSection';
// import Quote from './components/Quote';
import Partners from './components/Partners';
import BlogSection from './components/BlogSection';
import ComplexSection from './components/ComplexSection';
import HeroSection from './HeroSection/HeroSection';
import ServiceCards from './ServiceCards/ServiceCards';

const HomePage = () => {
  
  return (
    <div className='home_page'>
      <HeroSection />
      <ServiceCards />
      {/* <LandingSection /> */}
      {/* <Quote /> */}
      <Partners />
      <ComplexSection />
      <BlogSection />
    </div>
  );
};

export default HomePage;


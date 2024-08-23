import React, { useState, useEffect } from 'react';
import './home.css';
import LandingSection from './components/LandingSection';
import Quote from './components/Quote';
import Partners from './components/Partners';
import BlogSection from './components/BlogSection';
import ComplexSection from './components/ComplexSection';

const HomePage = () => {
  
  return (
    <div className='home_page'>
      <LandingSection />
      <Quote />
      <Partners />
      <ComplexSection />
      <BlogSection />
    </div>
  );
};

export default HomePage;


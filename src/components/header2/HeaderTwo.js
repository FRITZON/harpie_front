import React, { useState } from 'react';
import { Car, Plane, Home, Heart, Building2, Plus, Users, Umbrella, ChevronDown, ArrowRight, Globe, Menu } from 'lucide-react';
import './Navbar.css';

const insuranceServices = [
  {
    category: "Personal Insurance",
    items: [
      {
        title: "Auto Insurance",
        description: "Comprehensive coverage for your vehicle with competitive rates and flexible plans",
        icon: Car,
        popular: true,
      },
      {
        title: "Home Insurance",
        description: "Protect your home and belongings with customizable coverage options",
        icon: Home,
        popular: true,
      },
      {
        title: "Life Insurance",
        description: "Secure your family's future with term and permanent life insurance solutions",
        icon: Heart,
      },
      {
        title: "Travel Insurance",
        description: "Stay protected worldwide with medical and trip cancellation coverage",
        icon: Plane,
      },
    ]
  },
  {
    category: "Business Insurance",
    items: [
      {
        title: "Commercial Property",
        description: "Protect your business premises, equipment, and inventory",
        icon: Building2,
      },
      {
        title: "Group Benefits",
        description: "Comprehensive employee benefit packages for your team",
        icon: Users,
      },
      {
        title: "Liability Coverage",
        description: "Shield your business from potential legal claims and damages",
        icon: Umbrella,
      },
      {
        title: "Additional Coverage",
        description: "Specialized insurance solutions for unique business needs",
        icon: Plus,
      },
    ]
  }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <div className="nav-logo">
          <img src="/placeholder.svg?height=40&width=40" alt="Harpie Logo" />
        </div>

        {/* Desktop Navigation */}
        <div className="nav-links desktop-nav">
          <div 
            className="nav-item has-dropdown"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            <button className="nav-button">
              Select Service
              <ChevronDown className={`icon ${isOpen ? 'rotate' : ''}`} />
            </button>

            {/* Mega Menu Dropdown */}
            <div className={`mega-menu ${isOpen ? 'open' : ''}`}>
              <div className="mega-menu-container">
                {insuranceServices.map((category, idx) => (
                  <div key={idx} className="menu-category">
                    <h3>{category.category}</h3>
                    <div className="menu-items">
                      {category.items.map((item, index) => (
                        <a key={index} href="#" className="menu-item">
                          <div className="menu-item-icon">
                            <item.icon size={24} />
                          </div>
                          <div className="menu-item-content">
                            <h4>
                              {item.title}
                              {item.popular && <span className="popular-tag">Popular</span>}
                            </h4>
                            <p>{item.description}</p>
                          </div>
                          <ArrowRight className="arrow-icon" size={16} />
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <a href="#" className="nav-link">Services</a>
          <a href="#" className="nav-link">About Us</a>
          <a href="#" className="nav-link">Contact</a>
          
          <div className="nav-item">
            <button className="nav-button">
              Languages
              <Globe className="icon" size={16} />
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu size={24} />
        </button>

        {/* Login Button */}
        <button className="login-button">Log In</button>

        {/* Mobile Navigation */}
        <div className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
          {insuranceServices.map((category, idx) => (
            <div key={idx} className="mobile-category">
              <h3>{category.category}</h3>
              {category.items.map((item, index) => (
                <a key={index} href="#" className="mobile-item">
                  <item.icon size={20} />
                  <span>{item.title}</span>
                </a>
              ))}
            </div>
          ))}
          <div className="mobile-links">
            <a href="#" className="mobile-link">Services</a>
            <a href="#" className="mobile-link">About Us</a>
            <a href="#" className="mobile-link">Contact</a>
            <button className="mobile-language-button">
              <Globe size={20} />
              Languages
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


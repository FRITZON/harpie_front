import React, { useEffect, useState } from 'react';
import './header.css';
import logo from '../../assets/img/logo.png';
import { NavLink, useNavigate } from 'react-router-dom';
import LogoutModal from '../../pages/auth/logout/LogoutModal';

const HeaderUser = ({ changeLang }) => {
    const [showMobileNav, setShowMobileNav] = useState(false);
    const [showSelectInsuranceNav, setShowSelectInsuranceNav] = useState(false);
    const [showSelectLanguageNav, setShowSelectLanguageNav] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [showLogoutModal, setSetshowLogoutModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggle_mobile_nav = () => {
        setShowMobileNav(!showMobileNav);
        setShowSelectInsuranceNav(false);
        setShowSelectLanguageNav(false);
    };

    const toggle_select_insurance_shadow = () => {
        setShowSelectInsuranceNav(!showSelectInsuranceNav);
    };

    const toggle_select_language_shadow = () => {
        setShowSelectLanguageNav(!showSelectLanguageNav);
    };

    const show_logout_alert = () => {
        setSetshowLogoutModal(true);
    };

    const remove_modal = () => {
        setSetshowLogoutModal(false);
    };

    return (
        <>
            <header>
                <div className="find_us">  
                    <div className="contact_top_links contact1">  
                        <li><a href="tel:+237696841831" target='_blank'>+237 696 841 831</a></li>  
                        <li><a href="https://maps.google.com" target='_blank'>Douala-Cameroun Lycée de la cité des palmiers</a></li>  
                    </div>  
                    <div className="contact_top_links contact2">  
                        <li><a href="mailto:contact@harpie.cm" target='_blank'>contact@harpie.cm</a></li>  
                        <li><a href="#">Mon-Fri 10:00am-09:00pm</a></li>  
                    </div>  
                </div>  
                <nav className={`nav_bar ${isScrolled ? 'scrolled' : ''}`}>
                    <NavLink to='/'>
                        <div className="logo">  
                            <img src={logo} alt="Logo" className="logo_img" />  
                        </div>  
                    </NavLink>
                    <div className={`${showMobileNav ? "active" : ""} nav_bar_content `}>  
                        <ul className='nav_list'>  
                            <li><NavLink to="/services">Services</NavLink></li>  
                            <li className='nav_list_dropdown_wrapper'>
                                <span onClick={toggle_select_insurance_shadow}>Select Insurance</span>
                                <div className={`${showSelectInsuranceNav ? 'show' : ''} inner_nav`}>
                                    <ul className="inner_nav_list">   
                                        <li value="general-insurance">Vehicle Insurance</li>  
                                        <li value="general-insurance">Health Insurance</li>  
                                        <li value="general-insurance">Life Insurance</li>  
                                        <li value="general-insurance">Death Insurance</li>  
                                        <li value="general-insurance">House Insurance</li>  
                                    </ul> 
                                    <div className='inner_nav_shadow' onClick={toggle_select_insurance_shadow} />
                                </div>
                            </li>  
                            <li><NavLink to="/about">About Us</NavLink></li>  
                            <li><NavLink to="/faq">FAQs</NavLink></li>  
                            <li><NavLink to="/contacts">Contacts</NavLink></li>  
                            <li className='nav_list_dropdown_wrapper'>
                                <span onClick={toggle_select_language_shadow}>Languages</span>
                                <div className={`${showSelectLanguageNav ? 'show' : ''} inner_nav`}>
                                    <ul className="inner_nav_list">   
                                        <li onClick={() => { changeLang('en'); toggle_select_language_shadow(); }}>English</li>  
                                        <li onClick={() => { changeLang('fr'); toggle_select_language_shadow(); }}>Français</li>   
                                    </ul> 
                                    <div className='inner_nav_shadow' onClick={toggle_select_language_shadow} />
                                </div>
                            </li> 
                            <li><button onClick={() => navigate('/my-insurances')} className="login-btn">My Insurances</button></li>  
                            <li onClick={show_logout_alert}>logout</li>  
                        </ul>  
                    </div> 
                    <div className='nav_right'>
                        <div className='language'>
                            <div className='language_icon'></div>
                            <div className='language_dropdown'></div>
                        </div>
                        <div onClick={toggle_mobile_nav} className={`${showMobileNav ? "animateMenu" : ""} burger_menu`}>
                            <label className="hamburger">...</label>
                        </div>
                    </div>
                </nav>
            </header>
            {showLogoutModal && <LogoutModal removeModal={remove_modal} />}
        </>
    );
};

export default HeaderUser;

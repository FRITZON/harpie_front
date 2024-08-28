import React, { useEffect, useState } from 'react'
import './header.css'
import logo from '../../assets/img/logo.png'
import { NavLink, useNavigate } from 'react-router-dom'
import 'flag-icon-css/css/flag-icon.min.css'

const Header = ({ changeLang, }) => {
    const [showMobileNav, setShowMobileNav] = useState(false)
    const [showSelectInsuranceNav, setShowSelectInsuranceNav] = useState(false)
    const [showSelectLanguageNav, setShowSelectLanguageNav] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const navigate = useNavigate()


    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])


    /**
     * @description Toggles the mobile navigation menu
     */
    const toggle_mobile_nav = () => {
        setShowMobileNav(!showMobileNav)
        setShowSelectInsuranceNav(false)
        setShowSelectLanguageNav(false)
    }

    /**
     * @description Toggles the select insurance shadow
     */
    const toggle_select_insurance_shadow = () => {
        setShowSelectInsuranceNav(!showSelectInsuranceNav)
    }



    /**
     * @description Toggles the select language shadow
     * @returns void
     */
    const toggle_select_language_shadow = () => {
        setShowSelectLanguageNav(!showSelectLanguageNav)
    }
    

    const [languages, setLanguages] = useState([
        {
        name: "English",
        code: 'en',
        flag: 'gb'
        },
        {
        name: "Français",
        code: 'fr',
        flag: 'fr'
        }
    ]);

  return (
    <header>
        <div class="find_us">  
            <div class="contact_top_links contact1">  
                <li><a href="tell:+237696841831" target='_blank'>+237 696 841 831</a></li>  
                <li><a href="maps.google.com" target='_blank'>Douala-Cameroun Lycée de la cité des palmiers</a></li>  
            </div>  
            <div class="contact_top_links contact2">  
                <li><a href="mailto:contact@harpie.cm" target='_blank'>contact@harpie.cm</a></li>  
                <li><a href="#">Mon-Fri 10:00am-09:00pm</a></li>  
            </div>  
        </div>   
        <nav className={`nav_bar ${isScrolled ? 'scrolled' : ''}`}>
            <NavLink to='/'>
                <div class="logo">  
                    <img src={ logo } alt="Logo" class="logo_img"  />  
                </div>  
            </NavLink>
            
            <div class={`${showMobileNav ? "active" : ""} nav_bar_content `}>  
                <ul className='nav_list'>  
                    <li><NavLink to="/" >Home</NavLink></li>  
                    <li><NavLink to="/services" >Services</NavLink></li>  
                    <li className='nav_list_dropdown_wrapper'>
                        <span onClick={ toggle_select_insurance_shadow } >Select Insurance</span>
                        <div className={`${showSelectInsuranceNav ? 'show' : ''} inner_nav`}>
                            <ul class="inner_nav_list">   
                                <li value="general-insurance" >Vehicle Insurance</li>  
                                <li value="general-insurance" >Health Insurance</li>  
                                <li value="general-insurance" >Life Insurance</li>  
                                <li value="general-insurance" >Death Insurance</li>  
                                <li value="general-insurance" >House Insurance</li>  
                            </ul> 
                            <div className='inner_nav_shadow' onClick={ toggle_select_insurance_shadow } />
                        </div>
                    </li>  
                    <li><NavLink to="/about">About Us</NavLink></li>  
                    <li><NavLink to="/faq">FAQs</NavLink></li>  
                    <li><NavLink to="/contacts" >Contacts</NavLink></li>  
                    <li className='nav_list_dropdown_wrapper'>
                        <span onClick={ toggle_select_language_shadow } >Languages</span>
                        <div className={`${showSelectLanguageNav ? 'show' : ''} inner_nav`}>
                            <ul class="inner_nav_list">    
                                {/* {
                                    languages.map((language, index) => (
                                    <li key={index} className="dropdownNav-item">
                                        <span  onClick={(e) => changeLang(language.code, e)} className={`flag flag-icon flag-icon-${language.flag}`}></span>
                                        <span  onClick={(e) => changeLang(language.code, e)} className='blacktext'>{language.name}</span>
                                    </li>
                                    ))
                                } */}
                            </ul> 
                            <div className='inner_nav_shadow' onClick={ toggle_select_language_shadow } />
                        </div>
                    </li> 
                    <li><button onClick={() => navigate('/auth/login')} class="login-btn">log in</button></li>  
                </ul>  
            </div> 
            
            
            <div className='nav_right'>
                <div className='language'>
                    <div className='language_icon'>

                    </div>
                    <div className='language_dropdown'>

                    </div>
                </div>
                <div onClick={ toggle_mobile_nav } className={`${ showMobileNav ? "animateMenu" : "" } burger_menu`}>
                    <label class="hamburger">
                        <svg viewBox="0 0 32 32">
                            <path class="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
                            <path class="line" d="M7 16 27 16"></path>
                        </svg>
                    </label>
                </div> 
            </div>

        </nav>
    </header>
  )
}

export default Header
import React, { useEffect, useState } from 'react'
import './header.css'
import logo from '../../assets/img/logo.png'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import 'flag-icon-css/css/flag-icon.min.css'
import { IoAccessibility, IoCarSport, IoHome, IoMedkit, IoPeople } from 'react-icons/io5'
import { useTranslation } from 'react-i18next'
import LogoutModal from '../../pages/auth/logout/LogoutModal'

const HeaderUser = ({ changeLang, }) => {
    const [showMobileNav, setShowMobileNav] = useState(false)
    const [showSelectInsuranceNav, setShowSelectInsuranceNav] = useState(false)
    const [showSelectLanguageNav, setShowSelectLanguageNav] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [showLogoutModal, setSetshowLogoutModal] = useState(false)

    const show_logout_alert = () => {
        setSetshowLogoutModal(true)
    }

    const remove_modal = () => {
        setSetshowLogoutModal(false)
    }

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

    const { t } = useTranslation();

  return (
    <>
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
                    <li><NavLink to="/" >{ t("nav.home")} </NavLink></li>  
                    <li><NavLink to="/services" >{ t("nav.services")} </NavLink></li>  
                    <li className='nav_list_dropdown_wrapper'>
                        <span onClick={ toggle_select_insurance_shadow } >{ t('nav.insurances.select_insurance') }</span>
                        <div className={`${showSelectInsuranceNav ? 'show' : ''} inner_nav`}>
                            <ul class="inner_nav_list">   
                                <Link to='/comparison/start?insurance_type=vehicle' value="general-insurance" ><span className='insurance_nav_icon'><IoCarSport /></span> { t('nav.insurances.vehicle_insurance') }</Link>  
                                <Link to='/comparison/start?insurance_type=health' value="general-insurance" ><span className='insurance_nav_icon'><IoMedkit /></span> { t('nav.insurances.health_insurance') }</Link>  
                                <Link to='/comparison/start?insurance_type=life' value="general-insurance" ><span className='insurance_nav_icon'><IoPeople /></span> { t('nav.insurances.life_insurance') }</Link>  
                                <Link to='/comparison/start?insurance_type=death' value="general-insurance" ><span className='insurance_nav_icon'><IoAccessibility /></span> { t('nav.insurances.death_insurance') }</Link>  
                                <Link to='/comparison/start?insurance_type=house' value="general-insurance" ><span className='insurance_nav_icon'><IoHome /></span> { t('nav.insurances.house_insurance') }</Link>  
                            </ul> 
                            <div className='inner_nav_shadow' onClick={ toggle_select_insurance_shadow } />
                        </div>
                    </li>  
                    <li><NavLink to="/comparison/start?insurance_type=bank">{ t("nav.insurances.bank_insurance")} </NavLink></li>  
                    {/* <li><NavLink to="/about">{ t("nav.about")} </NavLink></li>  
                    <li><NavLink to="/faq">FAQs</NavLink></li>   */}
                    <li><NavLink to="/contacts" >{ t("nav.contact")} </NavLink></li>  
                    <li className='nav_list_dropdown_wrapper'>
                        <span onClick={ toggle_select_language_shadow } >{ t('nav.languages') }</span>
                        <div className={`${showSelectLanguageNav ? 'show' : ''} inner_nav`}>
                            <ul class="inner_nav_list">    
                                {
                                    languages.map((language, index) => (
                                    <li key={index} className="dropdownNav-item">
                                        <span  onClick={(e) => changeLang(language.code)} className={`flag flag-icon flag-icon-${language.flag}`}></span>
                                        <span  onClick={(e) => changeLang(language.code)} className='blacktext'>{language.name}</span>
                                    </li>
                                    ))
                                }
                            </ul> 
                            <div className='inner_nav_shadow' onClick={ toggle_select_language_shadow } />
                        </div>
                    </li> 

                    <li><button onClick={() => navigate('/my-insurances')} class="login-btn">My Insurances</button></li>  
                    <li onClick={show_logout_alert}>logout</li>  
                    
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
    { showLogoutModal && <LogoutModal handle_remove_modal={ remove_modal }  /> }
    </>
    )
}

export default HeaderUser








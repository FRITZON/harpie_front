import React, { useEffect, useState } from "react";
import "./header.css";
import "./Navbar.css";
import logo from "../../assets/img/logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "flag-icon-css/css/flag-icon.min.css";
import {
  IoAccessibility,
  IoCarSport,
  IoHome,
  IoMedkit,
  IoPeople,
} from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { FaBriefcase, FaPlane } from "react-icons/fa";
import {
  Car,
  Plane,
  Home,
  Heart,
  Building2,
  Plus,
  Users,
  Umbrella,
  ChevronDown,
  ArrowRight,
  Globe,
  Menu,
  HandHeart,
  Church,
} from "lucide-react";
const insuranceServices = [
  {
    category: "Personal Insurance",
    items: [
      {
        title: "Auto Insurance",
        url: "comparison/start?insurance_type=vehicle",
        description:
          "Comprehensive coverage for your vehicle with competitive rates and flexible plans",
        icon: Car,
        popular: true,
      },
      {
        title: "Health Insurance",
        url: "comparison/start?insurance_type=health",
        description:
          "Protect your home and belongings with customizable coverage options",
        icon: HandHeart,
        popular: true,
      },
      {
        title: "Life Insurance",
        url: "comparison/start?insurance_type=life",
        description:
          "Secure your family's future with term and permanent life insurance solutions",
        icon: Heart,
      },
      {
        title: "Death Insurance",
        url: "comparison/start?insurance_type=death",
        description:
          "Financial protection for your loved ones in the event of your passing",
        icon: Church,
      },
      // {
      //   title: "Travel Insurance",
      //   url: "/coming-soon",
      //   description:
      //     "Stay protected worldwide with medical and trip cancellation coverage",
      //   icon: Plane,
      // },
    ],
  },
  {
    category: "Business Insurance",
    items: [
      // {
      //   title: "Commercial Property",
      //   url: "/coming-soon",
      //   description: "Protect your business premises, equipment, and inventory",
      //   icon: Building2,
      // },
      // {
      //   title: "Group Benefits",
      //   url: "/coming-soon",
      //   description: "Comprehensive employee benefit packages for your team",
      //   icon: Users,
      // },
      // {
      //   title: "Liability Coverage",
      //   url: "/coming-soon",
      //   description:
      //     "Shield your business from potential legal claims and damages",
      //   icon: Umbrella,
      // },
      // {
      //   title: "Additional Coverage",
      //   url: "/coming-soon",
      //   description:
      //     "Specialized insurance solutions for unique business needs",
      //   icon: Plus,
      // },
    ],
  },
];

const Header = ({ changeLang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [showSelectInsuranceNav, setShowSelectInsuranceNav] = useState(false);
  const [showSelectLanguageNav, setShowSelectLanguageNav] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const navBarContent = document.querySelector(".nav_bar_content");

    const handleNavClick = (e) => {
      // Check if the clicked element is a link or button
      if (
        e.target.tagName.toLowerCase() === "a" ||
        e.target.closest("a") ||
        e.target.tagName.toLowerCase() === "button" ||
        // Also handle the language selection spans
        (e.target.tagName.toLowerCase() === "span" &&
          e.target.closest(".dropdownNav-item"))
      ) {
        setShowMobileNav(false);
        setShowSelectInsuranceNav(false);
        setShowSelectLanguageNav(false);
      }
    };

    if (navBarContent) {
      navBarContent.addEventListener("click", handleNavClick);
    }

    return () => {
      if (navBarContent) {
        navBarContent.removeEventListener("click", handleNavClick);
      }
    };
  }, []);

  /**
   * @description Toggles the mobile navigation menu
   */
  const toggle_mobile_nav = () => {
    setShowMobileNav(!showMobileNav);
    setShowSelectInsuranceNav(false);
    setShowSelectLanguageNav(false);
  };

  /**
   * @description Toggles the select insurance shadow
   */
  const toggle_select_insurance_shadow = (e) => {
    e.stopPropagation();
    setShowSelectInsuranceNav(!showSelectInsuranceNav);
  };

  /**
   * @description Toggles the select language shadow
   * @returns void
   */
  const toggle_select_language_shadow = (e) => {
    e.stopPropagation();
    setShowSelectLanguageNav(!showSelectLanguageNav);
  };

  // /**
  //  * @description Closes the mobile navigation menu
  //  * @returns void
  //  */
  // const closeMobileNav = () => {
  //     setShowMobileNav(false)
  //     setShowSelectInsuranceNav(false)
  //     setShowSelectLanguageNav(false)
  // }

  const [languages, setLanguages] = useState([
    {
      name: "English",
      code: "en",
      flag: "gb",
    },
    {
      name: "Français",
      code: "fr",
      flag: "fr",
    },
  ]);

  const { t } = useTranslation();

  return (
    <header>
      <div class="find_us">
        <div class="contact_top_links contact1">
          <li>
            <a href="tell:+237696841831" target="_blank">
              +237 696 841 831
            </a>
          </li>
          <li>
            <a href="maps.google.com" target="_blank">
              Douala-Cameroun Lycée de la cité des palmiers
            </a>
          </li>
        </div>
        <div class="contact_top_links contact2">
          <li>
            <a href="mailto:contact@harpiecm.com" target="_blank">
              contact@harpiecm.com
            </a>
          </li>
          <li>
            <a href="#">Mon-Fri 10:00am-09:00pm</a>
          </li>
        </div>
      </div>
      <nav className={`nav_bar ${isScrolled ? "scrolled" : ""}`}>
        <NavLink className='main_logo' to="/">
          <div class="logo">
            <img src={logo} alt="Logo" class="logo_img" />
          </div>
            <span className="logo_text">Harpie</span>
        </NavLink>

        <div class={`${showMobileNav ? "active" : ""} nav_bar_content `}>
          <ul className="nav_list">
            <li className="nav_list_dropdown_wrapper insurances">
              <span onClick={toggle_select_insurance_shadow}>
                {t("nav.insurances.select_insurance")}
              </span>
              <div
                className={`${showSelectInsuranceNav ? "show" : ""} inner_nav`}
              >
                <ul class="inner_nav_list">
                  <Link
                    to="/comparison/start?insurance_type=vehicle"
                    value="general-insurance"
                  >
                    <span className="insurance_nav_icon">
                      <IoCarSport />
                    </span>{" "}
                    {t("nav.insurances.vehicle_insurance")}
                  </Link>
                  <Link
                    to="/comparison/start?insurance_type=health"
                    value="general-insurance"
                  >
                    <span className="insurance_nav_icon">
                      <IoMedkit />
                    </span>{" "}
                    {t("nav.insurances.health_insurance")}
                  </Link>
                  <Link
                    to="/comparison/start?insurance_type=life"
                    value="general-insurance"
                  >
                    <span className="insurance_nav_icon">
                      <IoPeople />
                    </span>{" "}
                    {t("nav.insurances.life_insurance")}
                  </Link>
                  <Link
                    to="/comparison/start?insurance_type=death"
                    value="general-insurance"
                  >
                    <span className="insurance_nav_icon">
                      <IoAccessibility />
                    </span>{" "}
                    {t("nav.insurances.death_insurance")}
                  </Link>
                  <Link
                    to="/comparison/start?insurance_type=house"
                    value="general-insurance"
                  >
                    <span className="insurance_nav_icon">
                      <IoHome />
                    </span>{" "}
                    {t("nav.insurances.house_insurance")}
                  </Link>
                  <Link
                    to="/comparison/start?insurance_type=business"
                    value="general-insurance"
                  >
                    <span className="insurance_nav_icon">
                      <FaBriefcase />
                    </span>{" "}
                    {t("nav.insurances.business_insurance")}
                  </Link>
                  <Link
                    to="/comparison/start?insurance_type=travel"
                    value="general-insurance"
                  >
                    <span className="insurance_nav_icon">
                      <FaPlane />
                    </span>{" "}
                    {t("nav.insurances.travel_insurance")}
                  </Link>
                </ul>
                <div
                  className="inner_nav_shadow"
                  onClick={toggle_select_insurance_shadow}
                />
              </div>
            </li>

            <div className="nav-links desktop-nav">
              <div
                className="nav-item has-dropdown"
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
              >
                <button className="nav-button">
                  Select Service
                  <ChevronDown className={`icon ${isOpen ? "rotate" : ""}`} />
                </button>

                {/* Mega Menu Dropdown */}
                <div className={`mega-menu ${isOpen ? "open" : ""}`}>
                  <div className="mega-menu-container">
                    {insuranceServices.map((category, idx) => (
                      <div key={idx} className="menu-category">
                        <h3>{category.category}</h3>
                        <div className="menu-items">
                          {category.items.map((item, index) => (
                            <Link to={item?.url} onClick={() => setIsOpen(false)} key={index} className="menu-item">
                              <div className="menu-item-icon">
                                <item.icon size={24} />
                              </div>
                              <div className="menu-item-content">
                                <h4>
                                  {item.title}
                                  {item.popular && (
                                    <span className="popular-tag">Popular</span>
                                  )}
                                </h4>
                                <p>{item.description}</p>
                              </div>
                              <ArrowRight className="arrow-icon" size={16} />
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* <li><NavLink to="/comparison/start?insurance_type=bank">{ t("nav.insurances.bank_insurance")} </NavLink></li>   */}

            <li>
              <NavLink to="/services">{t("nav.services")} </NavLink>
            </li>
            <li>
              <NavLink to="/about">{t("nav.about")} </NavLink>
            </li>
            <li>
              <NavLink to="/contacts">{t("nav.contact")} </NavLink>
            </li>
            
            <li className="nav_list_dropdown_wrapper">
              <span onClick={toggle_select_language_shadow}>
                {t("nav.languages")}
              </span>
              <div
                className={`${showSelectLanguageNav ? "show" : ""} inner_nav`}
              >
                <ul class="inner_nav_list">
                  {languages.map((language, index) => (
                    <li key={index} className="dropdownNav-item">
                      <span
                        onClick={(e) => changeLang(language.code)}
                        className={`flag flag-icon flag-icon-${language.flag}`}
                      ></span>
                      <span
                        onClick={(e) => changeLang(language.code)}
                        className="blacktext"
                      >
                        {language.name}
                      </span>
                    </li>
                  ))}
                </ul>
                <div
                  className="inner_nav_shadow"
                  onClick={toggle_select_language_shadow}
                />
              </div>
            </li>

            <li>
              <button onClick={() => navigate("/auth/login")} class="login-btn">
                {t("nav.login")}{" "}
              </button>
            </li>

          </ul>
        </div>

        <div className="nav_right">
          <div className="language">
            <div className="language_icon"></div>
            <div className="language_dropdown"></div>
          </div>
          <div
            onClick={toggle_mobile_nav}
            className={`${showMobileNav ? "animateMenu" : ""} burger_menu`}
          >
            <label class="hamburger">
              <svg viewBox="0 0 32 32">
                <path
                  class="line line-top-bottom"
                  d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
                ></path>
                <path class="line" d="M7 16 27 16"></path>
              </svg>
            </label>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

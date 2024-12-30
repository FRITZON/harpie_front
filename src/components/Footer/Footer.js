import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { FaLinkedinIn } from "react-icons/fa6";
import logo from "../../assets/img/logo.png";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <div className="footerWrapper">
      <div className="container">
        <div className="footerContent">
          <div className="about logo_footer">
            <div className="logo">
              <img src={logo} alt="harpie logo" />
            </div>
            <h1>Harpie</h1>
          </div>
          <div className="about">
            <div className="descTitle">{ t("footer.top_links")}</div>
            <Link to="/">
              <div className="descText">{ t("footer.home")}</div>
            </Link>
            <Link to="/faq">
              <div className="descText">Service</div>
            </Link>
            <Link to="/about">
              <div className="descText">{ t("footer.about")}</div>
            </Link>
            {/* <a href="tell:+2376712345678">
              <div className="descText">{ t("footer.phone")}</div>
            </a> */}
            <Link to="/help/contact-support">
              <div className="descText">{ t("footer.contact_us")}</div>
            </Link>
          </div>


          <div className="buy">
            <div className="descTitle">{ t("footer.our_services")}</div>
            <Link to='/comparison/start?insurance_type=vehicle'>
              <div className="descText"> { t('nav.insurances.vehicle_insurance') }</div>
            </Link>
            <Link to='/comparison/start?insurance_type=health'>
              <div className="descText">{ t('nav.insurances.health_insurance') }</div>
            </Link>
            <Link to='/comparison/start?insurance_type=life'>
              <div className="descText">{ t('nav.insurances.life_insurance') }</div>
            </Link>
            <Link to='/comparison/start?insurance_type=death'>
              <div className="descText">{ t('nav.insurances.death_insurance') }</div>
            </Link>
            <Link to='/comparison/start?insurance_type=house'>
              <div className="descText">{ t('nav.insurances.house_insurance') }</div>
            </Link>
            <Link to='/comparison/start?insurance_type=business'>
              <div className="descText">{ t('nav.insurances.business_insurance') }</div>
            </Link>
            <Link to='/comparison/start?insurance_type=travel'>
              <div className="descText">{ t('nav.insurances.travel_insurance') }</div>
            </Link>
          </div>



          <div className="buy">
            <div className="descTitle">{ t("footer.others")}</div>
            <Link to="/faq">
              <div className="descText">{ t("footer.faq")}</div>
            </Link>
            <Link to="/help/signaler">
              <div className="descText">{ t("footer.report")}</div>
            </Link>
            <Link to="/general-terms-and-conditions">
              <div className="descText">{ t("footer.terms_and_conditions")}</div>
            </Link>
            <Link to="/privacy-policy">
              <div className="descText">{ t("footer.privacy_policy")}</div>
            </Link>
            <Link to="/terms-of-service">
              <div className="descText">{ t("footer.terms_of_service")}</div>
            </Link>
          </div>
          <div className="buy">
            <div className="descTitle">{ t("footer.our_pages")}</div>
            {/* <Link to="#">
              <div className="descText">{ t("footer.nothing_else")}</div>
            </Link> */}
            <div
              className="social_links"
              style={{ maxWidth: "7rem", marginLeft: "0px" }}
            >
              <Link
                className="nav_social_link_item"
                to="https://www.youtube.com/@harpiecomparateur"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube />
              </Link>
              <Link
                className="nav_social_link_item"
                to="https://web.facebook.com/comparateurharpie"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn />
              </Link>
              <Link
                className="nav_social_link_item"
                to="https://www.facbook.com/vtc"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF />
              </Link>
              {/* <Link
                className="nav_social_link_item"
                to="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </Link> */}
              <br />
            </div>

            {/* <PlayStoreButton />
            <br />
            <br />
            <AppStoreButton /> */}

          </div>
        </div>
        <div className="company_line">
          <h3 className="footer_name">Copywrites @{new Date().getFullYear()} HARPIE | Tous droit reserves</h3>
        </div>
      </div>
    </div>
  );
};

export default Footer;



const AppStoreButton = () => {
  const { t } = useTranslation();
  return (
    <a href="#" class="playstore-button">
      <span class="icon">
        <svg
          fill="currentcolor"
          viewBox="-52.01 0 560.035 560.035"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#ffffff"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M380.844 297.529c.787 84.752 74.349 112.955 75.164 113.314-.622 1.988-11.754 40.191-38.756 79.652-23.343 34.117-47.568 68.107-85.731 68.811-37.499.691-49.557-22.236-92.429-22.236-42.859 0-56.256 21.533-91.753 22.928-36.837 1.395-64.889-36.891-88.424-70.883-48.093-69.53-84.846-196.475-35.496-282.165 24.516-42.554 68.328-69.501 115.882-70.192 36.173-.69 70.315 24.336 92.429 24.336 22.1 0 63.59-30.096 107.208-25.676 18.26.76 69.517 7.376 102.429 55.552-2.652 1.644-61.159 35.704-60.523 106.559M310.369 89.418C329.926 65.745 343.089 32.79 339.498 0 311.308 1.133 277.22 18.785 257 42.445c-18.121 20.952-33.991 54.487-29.709 86.628 31.421 2.431 63.52-15.967 83.078-39.655"
            ></path>
          </g>
        </svg>
      </span>
      <span class="texts">
        <span class="text-1" style={{ textAlign: 'left', whiteSpace: 'nowrap'}}>{ t("footer.span1")}</span>
        <span class="text-2">App store</span>
      </span>
    </a>
  )
}


const PlayStoreButton = () => {
  const { t } = useTranslation();
  return (
    <a class="playstore-button" href="#">
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="icon" viewBox="0 0 512 512">
        <path d="M99.617 8.057a50.191 50.191 0 00-38.815-6.713l230.932 230.933 74.846-74.846L99.617 8.057zM32.139 20.116c-6.441 8.563-10.148 19.077-10.148 30.199v411.358c0 11.123 3.708 21.636 10.148 30.199l235.877-235.877L32.139 20.116zM464.261 212.087l-67.266-37.637-81.544 81.544 81.548 81.548 67.273-37.64c16.117-9.03 25.738-25.442 25.738-43.908s-9.621-34.877-25.749-43.907zM291.733 279.711L60.815 510.629c3.786.891 7.639 1.371 11.492 1.371a50.275 50.275 0 0027.31-8.07l266.965-149.372-74.849-74.847z"></path>
      </svg>
      <span class="texts">
        <span class="text-1" style={{ textAlign: 'left'}}>{ t("footer.span2")}</span>
        <span class="text-2">Google Play</span>
      </span>
    </a>
  )
}
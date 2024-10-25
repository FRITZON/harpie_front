import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";


// IMPORTS 
import { BrowserRouter as Router } from "react-router-dom";
import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { hydrate, render } from "react-dom";
import HttpApi from 'i18next-http-backend';


import ScrollToTop from "./plugins/ScrollToTop";
import translationEN from "./assets/Locale/en/translationEN.json";
import translationFR from "./assets/Locale/fr/translationFR.json";
import { UserContextProvider } from "./context/UserContext";
import { ComparisionProvider } from "./context/ComparisonContext";


/**
 * Function to set the title of the page
 * @param { String } title The title of the page
 * @returns It sets the title of the page
 */
export const tabTitle = (title) => {
  return (document.title = title)
}

/**
 * Function that takes in an object (string or number) and formats it as money  with commas
 * @param { Object } amount This is the string or integer you want to stringify
 * @returns A number properly formated as currency
 */
export function formatMoney(amount) {
  parseFloat(amount)
  return Number(amount).toLocaleString('en-US', {
    style: 'decimal',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  });
}

/**
 * Set the meta title of the page
 */
export const setMetaDescription = (description, ogDescription) => {
  // Regular meta description
  const metaTag = document.querySelector('meta[name="description"]');

  if (metaTag) {
    metaTag.setAttribute('content', description);
  } 
  else {
    const newMetaTag = document.createElement('meta');
    newMetaTag.setAttribute('name', 'description');
    newMetaTag.setAttribute('content', description);
    document.head.appendChild(newMetaTag);
  }

  // Open Graph description
  const ogTag = document.querySelector('meta[property="og:description"]');
  if (ogTag) {
    ogTag.setAttribute('content', ogDescription);
  } 
  else {
    const newOgTag = document.createElement('meta');
    newOgTag.setAttribute('property', 'og:description');
    newOgTag.setAttribute('content', ogDescription);
    document.head.appendChild(newOgTag);
  }

};


const resources = {
  en: {
    translation: translationEN
  },
  fr: {
    translation: translationFR
  },
};


const mapping = [
  {
      'code': 'rc_rti',
      'en': 'Civil Liability, Third-Party Fire and Theft',
      'fr': 'Responsabilité Civile + Incendie et Vol de Tiers'
  },
  {
      'code': 'rc_dr',
      'en': 'Civil Liability, Defense and Recourse',
      'fr': 'Responsabilité Civile, Défense et Recours'
  },
  {
      'code': 'rc_dr_acp',
      'en': 'Civil Liability, Defense and Recourse, for Driver and Passenger Insurance',
      'fr': 'Responsabilité Civile, Défense et Recours, Assurance Chauffeur et Passagers'
  }
]

let lang = 'en'
/**
* this function finds the corresponding value in the mapping
* @param { String } code string code to find in the mapping
* @returns corresponding value in the mapping
*/
export function findEnglishValue(code) {
  const item = mapping.find(item => item.code === code);
  return lang === 'en' ? item.en : item.fr;
}

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ['en', 'fr'],
    detection: {
      order: ['cookie', 'htmlTag', 'localStorage', 'path', 'subdomain'],
      caches: ['cookie'],
    },
    resources,
    fallbackLng: "fr",
    debug: true,
    react: { useSuspense: false },
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });

const root = ReactDOM.createRoot(document.getElementById('root'));
const rootElement = document.getElementById("root");


if (rootElement.hasChildNodes()) {
  hydrate(<hAppWrapper />, rootElement);
} else {
  render(<AppWrapper />, rootElement);
}



/**
 * Function to wrap the App component with the necessary providers
 * @returns It returns the App component wrapped with the necessary providers
 */
function AppWrapper() {
  return (
    <React.StrictMode>
        <UserContextProvider>
          <Router>
            <ScrollToTop />
            <ComparisionProvider>
              <App />
            </ComparisionProvider>
          </Router>
        </UserContextProvider>
    </React.StrictMode>
  )
}

reportWebVitals();

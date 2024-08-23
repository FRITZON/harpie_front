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


/**
 * Function to set the title of the page
 * @param { String } title The title of the page
 * @returns It sets the title of the page
 */
export const tabTitle = (title) => {
  return (document.title = title)
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
          <App />
        </Router>
      </UserContextProvider>
    </React.StrictMode>
  )
}

reportWebVitals();

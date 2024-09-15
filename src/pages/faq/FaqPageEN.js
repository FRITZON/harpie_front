import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './FaqPage.css';
import FAQPageFR from './FAQPageFR';

const faqData = [
  {
    question: "What is HARPIE?",
    answer: "HARPIE is an online insurance comparison site based in Cameroon. We help you find the best insurance for your specific needs, by comparing offers from different insurance companies.",
  },
  {
    question: "What is the CIMA code?",
    answer: "The CIMA Code (Inter-African Conference on Insurance Markets) is a set of rules and regulations that govern the insurance industry in CIMA member countries, including Cameroon."
  },
  {
    question: "What types of insurance can I compare on HARPIE?",
    answer: "On HARPIE you can compare different types of insurance, such as: ",
    list: [
      "Car insurance",
      "Business insurance",
      "Death insurance",
      "Health insurance",
      "Life insurance"
    ]
  },
  {
    question: "How does HARPIE work?",
    answer: "Here is a brief summary of how Harpie works and how we can assist you",
    list: [
      "You fill out an online form with your information and insurance needs.",
      "We compare offers from different insurance companies and provide you with the best options.",
      "You choose the insurance that suits you best and we help you take out."
    ]
  },
  {
    question: "What are the benefits of using HARPIE?",
    answer: "Time saving: we do the comparison work for you. Best deals: We have the best options available. Personal service: Our experts are on hand to help you choose the right insurance for you."
  },
  {
    question: "How can I contact HARPIE?",
    answer: "You can contact us by phone, e-mail or by contact form on our website. We are at your disposal to answer your questions and help you find the insurance that is right for you."
  },
  {
    question: "When is HARPIE open?",
    answer: "The HARPIE web and mobile platforms remain accessible 24/7. We are open from Monday to Friday from 8 a.m. to 5 p.m. on Saturdays and public holidays from 9 a.m. to 3 p.m., to answer your questions and help you find the insurance that suits you. However, in case of staff absence, our bot in the instant messenger responds to you 24 hours a day."
  },
  {
    question: "How can I take out insurance on HARPIE?",
    answer: "To take out insurance on HARPIE, you must: Fill out the online form with your information and insurance needs. Choose the insurance that suits you best from the options offered. We will help you take out the insurance you have chosen."
  }
];
export const FAQItem = ({ question, answer, list }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`faq-item ${isOpen ? 'open' : ''}`}>
      <button className="faq-question" onClick={() => setIsOpen(!isOpen)}>
        {question}
        <span className="faq-icon"></span>
      </button>
      <div className="faq-answer">
        <p>{answer}</p>
        {
          list?.length > 0 
          &&
          list.map((option, index) => (
            <li key={index}>{ option }</li>
          ))
        }
      </div>
    </div>
  );
};

const FAQPageEN = () => {
  return (
    <div className="faq-page">
      <header className="faq-header">
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to common questions about HARPIE and our services</p>
      </header>
      <div className="faq-container">
        {faqData.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} list={faq?.list} />
        ))}
      </div>
      <div className="contact-section">
        <p>Can't find what you're looking for?</p>
        <Link to="/contacts" className="contact-button">Contact Us</Link>    
      </div>
    </div>
    
  );
};

export default FAQPageEN;
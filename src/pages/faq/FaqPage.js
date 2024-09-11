import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './FaqPage.css';


const faqDataEN = [
  {
    question: "What is HARPIE?",
    answer: "HARPIE is an online insurance comparison site based in Cameroon. We help you find the best insurance for your specific needs, by comparing offers from different insurance companies."
  },
  {
    question: "What is the CIMA code?",
    answer: "The CIMA Code (Inter-African Conference on Insurance Markets) is a set of rules and regulations that govern the insurance industry in CIMA member countries, including Cameroon."
  },
  {
    question: "What types of insurance can I compare on HARPIE?",
    answer: "On HARPIE you can compare different types of insurance, such as:\n- Car insurance\n- Health insurance\n- Life insurance\n- Death insurance\n- Business insurance"
  },
  {
    question: "How does HARPIE work?",
    answer: "1. You fill out an online form with your information and insurance needs.\n2. We compare offers from different insurance companies and provide you with the best options.\n3. You choose the insurance that suits you best and we help you take out."
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
  },
  {
    question: "What payment methods does HARPIE accept?",
    answer: "For payment you are redirected to the page of the chosen insurance, because you do not pay anything at HARPIE."
  },
  {
    question: "How can I cancel or change my insurance?",
    answer: "To cancel or change your insurance, please contact us by phone, email or via the contact form on our website. We will help you cancel or change your insurance as needed."
  },
  {
    question: "How long does it take to process subscription requests?",
    answer: "Our processing times for subscription requests are less than 24 hours. We strive to process your claims as quickly as possible so that you can benefit from your insurance as soon as possible."
  },
  {
    question: "How can I get a quote for insurance?",
    answer: "To get a quote for insurance, please fill out the online form with your information and insurance needs. We will provide you with the best options available and provide you with a personalized quote."
  },
  {
    question: "What documents do I need to take out insurance?",
    answer: "The documents needed to take out insurance vary depending on the type of insurance chosen. We will inform you of the necessary documents when subscribing."
  },
  {
    question: "How can I contact HARPIE customer service?",
    answer: "You can contact our customer service by phone, e-mail or via the contact form on our website. We are available to answer your questions and help you resolve any issues related to your insurance."
  },
  {
    question: "What are the selection criteria for HARPIE partner insurance companies?",
    answer: "We select partners based on: -The reputation and credibility of the insurance company -The quality and variety of insurance products offered -The financial stability and solvency of the insurance company -The quality of customer service and the availability of the insurance company -Compliance with CIMA Code regulations and standards -The ability to offer competitive rates and flexible underwriting terms"
  },
  {
    question: "How does HARPIE guarantee the security and confidentiality of my data?",
    answer: "We take the security and privacy of your data very seriously. We use advanced security protocols to protect your information and we are committed to not sharing your data with third parties without your consent."
  },
  {
    question: "What are the advantages of choosing HARPIE as your insurance comparison tool?",
    answer: "By choosing HARPIE as your insurance comparator, you benefit from: -A personalized and professional service -Savings on insurance subscriptions via our platform -Competitive offers adapted to your needs -A quick and easy underwriting process -Customer service available to answer your questions and help you resolve any issues related to your insurance."
  }
];

const faqDataFR = [
  {
      question : "Qu'est-ce que HARPIE ?",
      answer : "HARPIE est un site de comparaison d'assurances en ligne basé au Cameroun. Nous vous aidons à trouver la meilleure assurance pour vos besoins spécifiques, en comparant les offres de différentes compagnies d'assurance."
    },
    {
      question : "Qu'est-ce que le code CIMA ?",
      answer : "Le Code CIMA (Conférence Interafricaine sur les Marchés d'Assurance) est un ensemble de règles et réglementations qui régissent le secteur de l'assurance dans les pays membres de la CIMA, dont le Cameroun."
    },
    {
      question : "Quels types d'assurance puis-je comparer sur HARPIE ?",
      answer: "Sur HARPIE vous pouvez comparer différents types d'assurance, tels que :\n- Assurance auto\n- Assurance maladie\n- Assurance vie\n- Assurance décès\n- Assurance entreprise"
    },
    {
      question : "Comment fonctionne HARPIE ?",
      answer: "1. Vous remplissez un formulaire en ligne avec vos informations et vos besoins en assurance.\n2. Nous comparons les offres de différentes compagnies d'assurance et vous proposons les meilleures options.\n3. Vous choisissez l'assurance qui vous convient le mieux et nous vous aidons tu sors."
    },
    {
      question: "Quels sont les avantages d'utiliser HARPIE ?",
      answer : "Gain de temps : nous effectuons le travail de comparaison pour vous. Meilleures offres : Nous avons les meilleures options disponibles. Service personnalisé : Nos experts sont à votre disposition pour vous aider à choisir l'assurance qui vous convient."
    },
    {
      question : "Comment puis-je contacter HARPIE ?",
      answer : "Vous pouvez nous contacter par téléphone, par e-mail ou par formulaire de contact sur notre site internet. Nous sommes à votre disposition pour répondre à vos questions et vous aider à trouver l'assurance qui vous convient."
    },
    {
      question : "Quels sont les horaires d'ouverture de HARPIE ?",
      answer : "Les plateformes web et mobile HARPIE restent accessibles 24h/24 et 7j/7. Nous sommes ouverts du lundi au vendredi de 8h à 17h le samedi et jours fériés de 9h à 15h, pour répondre à vos questions et vous aider à trouver l'assurance. cela vous convient. Cependant, en cas d'absence du personnel, notre bot dans la messagerie instantanée vous répond 24h/24."
    },
    {
      question : "Comment puis-je souscrire une assurance sur HARPIE ?",
      answer : "Pour souscrire une assurance sur HARPIE, vous devez : Remplissez le formulaire en ligne avec vos informations et besoins d'assurance. Choisissez l'assurance qui vous convient le mieux parmi les options proposées. Nous vous aiderons à souscrire l'assurance que vous avez choisie."
    },
    {
      question : "Quels sont les moyens de paiement acceptés par HARPIE ?",
      answer : "Pour le paiement vous êtes redirigés vers la page de l’assurance choisie, car vous ne payez rien chez HARPIE."
    },
    {
      question : "Comment puis-je annuler ou modifier mon assurance ?",
      answer : "Pour annuler ou modifier votre assurance, veuillez nous contacter par téléphone, par e-mail ou par formulaire de contact sur notre site web. Nous vous aiderons à annuler ou à modifier votre assurance selon vos besoins."
    },
    {
      question : "Quels sont les délais de traitement des demandes de souscription ?",
      answer : "Nos délais de traitement des demandes de souscription sont de moins de 24h. Nous nous efforçons de traiter vos demandes le plus rapidement possible pour vous permettre de bénéficier de votre assurance le plus tôt possible."
    },
    {
      question : "Comment puis-je obtenir un devis pour une assurance ?",
      answer : "Pour obtenir un devis pour une assurance, veuillez remplir le formulaire en ligne avec vos informations et vos besoins en matière d'assurance. Nous vous proposerons les meilleures options disponibles et vous fournirons un devis personnalisé."
    },
    {
      question : "Quels sont les documents nécessaires pour souscrire à une assurance ?",
      answer : "Les documents nécessaires pour souscrire à une assurance varient en fonction du type d'assurance choisi. Nous vous informerons des documents nécessaires lors de la souscription."
    },
    {
      question : "Comment puis-je contacter le service client de HARPIE ?",
      answer : "Vous pouvez contacter notre service client par téléphone, par e-mail ou par formulaire de contact sur notre site web. Nous sommes à votre disposition pour répondre à vos questions et vous aider à résoudre tout problème lié à votre assurance."
    },
    {
      question : "Quels sont les critères de sélection des compagnies d'assurance partenaires de HARPIE ?",
      answer : "Nous sélectionnons nos partenaires en fonction des critères suivants : -La réputation et la crédibilité de la compagnie d'assurance -La qualité et la variété des produits d'assurance proposés -La stabilité financière et la solvabilité de la compagnie d'assurance -La qualité du service client et la disponibilité de la compagnie d'assurance -La conformité aux réglementations et aux normes du code CIMA -La capacité à offrir des tarifs compétitifs et des conditions de souscription flexibles"
    },
    {
      question : "Comment HARPIE garantit-il la sécurité et la confidentialité de mes données ?",
      answer : "Nous prenons très au sérieux la sécurité et la confidentialité de vos données. Nous utilisons des protocoles de sécurité avancés pour protéger vos informations et nous nous engageons à ne pas partager vos données avec des tiers sans votre consentement."
    },
    {
      question : "Quels sont les avantages de choisir HARPIE comme comparateur d'assurances ?",
      answer : "En choisissant HARPIE comme comparateur d'assurances, vous bénéficiez de : -Un service personnalisé et professionnel -Une économie sur la souscription aux produits d’assurance via notre plateforme -Des offres compétitives et adaptées à vos besoins -Un processus de souscription rapide et facile -Un service client disponible pour répondre à vos questions et vous aider à résoudre tout problème lié à votre assurance."
    }
];

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
      <div className={`faq-item ${isOpen ? 'open' : ''}`}>
          <button className="faq-question" onClick={() => setIsOpen(!isOpen)}>
              {question}
              <span className="faq-icon"></span>
          </button>
          {isOpen && (
              <div className="faq-answer">
                  <p>{answer}</p>
              </div>
          )}
      </div>
  );
};

const FAQPage = ({ currentLang }) => {
  const faqData = currentLang === 'fr' ? faqDataFR : faqDataEN;

  return (
      <div className="faq-page">
          <header className="faq-header">
              <h1>{currentLang === 'fr' ? "Questions Fréquemment Posées" : "Frequently Asked Questions"}</h1>
              <p>{currentLang === 'fr' ? "Trouvez des réponses aux questions courantes sur HARPIE et nos services" : "Find answers to common questions about HARPIE and our services"}</p>
          </header>
          <div className="faq-container">
              {faqData.map((faq, index) => (
                  <FAQItem key={index} question={faq.question} answer={faq.answer} />
              ))}
          </div>
          <div className="contact-section">
              <p>{currentLang === 'fr' ? "Vous ne trouvez pas ce que vous cherchez?" : "Can't find what you're looking for?"}</p>
              <Link to="/contacts" className="contact-button">{currentLang === 'fr' ? "Contactez-nous" : "Contact Us"}</Link>
          </div>
      </div>
  );
};

export default FAQPage;
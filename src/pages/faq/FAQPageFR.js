import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './FaqPage.css';
import { FAQItem } from './FaqPageEN';

const faqData = [
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
        answer: "Sur HARPIE vous pouvez comparer différents types d'assurance, tels que: ",
        list: [
          "Assurance auto",
          "Assurance maladie",
          "Assurance vie",
          "Assurance décès",
          "Assurance entreprise"
        ]
      },
      {
        question : "Comment fonctionne HARPIE ?",
        answer: "Voici un bref résumé du fonctionnement de Harpie et de la façon dont nous pouvons vous aider.",
        list: [
          "Vous remplissez un formulaire en ligne avec vos informations et vos besoins en assurance.",
          "Nous comparons les offres de différentes compagnies d'assurance et vous proposons les meilleures options.",
          "Vous choisissez l'assurance qui vous convient le mieux et nous vous aidons tu sors."
        ]
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
        question : "Quand est-ce que HARPIE est ouverte ?",
        answer : "Les plateformes web et mobile HARPIE restent accessibles 24h/24 et 7j/7. Nous sommes ouverts du lundi au vendredi de 8h à 17h le samedi et jours fériés de 9h à 15h, pour répondre à vos questions et vous aider à trouver l'assurance. cela vous convient. Cependant, en cas d'absence du personnel, notre bot dans la messagerie instantanée vous répond 24h/24."
      },
      {
        question : "Comment puis-je souscrire une assurance sur HARPIE ?",
        answer : "Pour souscrire une assurance sur HARPIE, vous devez : Remplissez le formulaire en ligne avec vos informations et besoins d'assurance. Choisissez l'assurance qui vous convient le mieux parmi les options proposées. Nous vous aiderons à souscrire l'assurance que vous avez choisie."
      }
];


const FAQPageFR = () => {
  return (
    <div className="faq-page">
      <header className="faq-header">
      <h1>Questions fréquemment posées</h1>
      <p>Trouvez des réponses aux questions courantes sur HARPIE et nos services</p>
      </header>
      <div className="faq-container">
        {faqData.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} list={faq?.list} />
        ))}
      </div>
      <div className="contact-section">
      <p>Vous ne trouvez pas ce que vous cherchez?</p>
        <Link to="/contacts" className="contact-button">Contactez-nous</Link>
      </div>
    </div>
  );
};

export default FAQPageFR;
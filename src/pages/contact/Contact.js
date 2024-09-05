import React from 'react'
import { FaEnvelope,  FaLocationPin, FaPhone } from 'react-icons/fa6'
import './contact.css'
import { useTranslation } from 'react-i18next';

export const Contact = () => {
    const { t } = useTranslation();
  return (
    <div className='contact_us_page'>
        <div className='container'>
            <div className='contact_us_flex'>

                <div className='contact_us_left'>
                    <h1>{t("contact.contact_us_page.title1")}</h1>
                    <p>{t("contact.contact_us_page.paragraph1")}</p>
                    <p>{t("contact.contact_us_page.paragraph2")}</p>
                    <p>{t("contact.contact_us_page.paragraph3")}</p>
                    <p>{t("contact.contact_us_page.paragraph4")} </p>
                    <br />
                    <div className='contact_us_contact_method'>
                        <FaEnvelope />
                        <a href='mailto:contact@harpie.cm'>contact@harpie.cm</a>
                    </div>
                    <div className='contact_us_contact_method'>
                        <FaPhone />
                        <a href='tell:+2371234567'>+237 671 234 567</a>
                    </div>
                    <div className='contact_us_contact_method'>
                        <FaLocationPin />
                        <a href='maps.google.com'>{t("contact.contact_us_page.contact_us_contact_method")}</a>
                    </div>
                </div>

                <div className='contact_us_contact_form'>
                    <h2>{t("contact.contact_us_page.title2")}</h2>
                    <form>
                        <input type='text' placeholder='Name' />
                        <input type='email' placeholder='Email' />
                        <input type='text' placeholder='Subject' />
                        <textarea placeholder='Message'></textarea>
                        <button>{t("contact.contact_us_page.btn")}</button>
                    </form>
                </div>


            </div>

        </div>
    </div>
  )
}

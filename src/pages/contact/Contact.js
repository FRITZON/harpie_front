import React, { useState } from 'react'
import { FaEnvelope,  FaLocationPin, FaPhone } from 'react-icons/fa6'
import './contact.css'
import { useTranslation } from 'react-i18next';
import { postRequest } from '../../api';
import { toast, Toaster } from 'sonner';

export const Contact = () => {
    const { t } = useTranslation();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')

    const [alert, setAlert] = useState('')
    const [status, setStatus] = useState('')

    const send_message = async(e) => {
        e.preventDefault()
        const response = await postRequest('/messages/', {name, email, subject, message})
        if(response.status === 201) {
            setName('')
            setEmail('')
            setSubject('')
            setMessage('')
            setAlert('Message sent successfully, We will review and reply with 48 hours')
            toast.success('Message sent successfully, We will review and reply with 48 hours')
            setStatus('sucess')
        }
        else {
            setAlert('An error occured while sending your message. Please try again later')
            setStatus('failed')
            setTimeout(() => {
                setAlert('')
            }, 10000);
        }
    }
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
                        <a href='mailto:contact@harpiecm.com'>contact@harpiecm.com</a>
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
                    <form onSubmit={send_message}>
                        <input onChange={e => setName(e.target.value)} value={name} type='text' placeholder='Name' />
                        <input onChange={e => setEmail(e.target.value)} value={email} type='email' placeholder='Email' />
                        <input onChange={e => setSubject(e.target.value)} value={subject} type='text' placeholder='Subject' />
                        <textarea onChange={e => setMessage(e.target.value)} value={message} placeholder='Message'></textarea>
                        <button>{t("contact.contact_us_page.btn")}</button>
                    </form>
                    {alert && <div className={`${status} send_message_status`}>{alert} </div>}
                </div>


            </div>

        </div>
        <Toaster richColors />
    </div>
  )
}

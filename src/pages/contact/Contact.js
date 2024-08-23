import React from 'react'
import { FaEnvelope, FaLocationArrow, FaLocationPin, FaPhone } from 'react-icons/fa6'
import './contact.css'

export const Contact = () => {
  return (
    <div className='contact_us_page'>
        <div className='container'>
            <div className='contact_us_flex'>

                <div className='contact_us_left'>
                    <h1>get in touch</h1>
                    <p>Have a question or need help? We’re here to help. Our customer service team is available 24/7.</p>
                    <p>For order related inquiries, please include your order number for faster service.</p>
                    <p>For general questions, please check our FAQ page first. If you can’t find the answer you’re looking for, please fill out the form below.</p>
                    <p>For press inquiries, please contact us at: </p>
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
                        <a href='maps.google.com'>Somewhere in Douala</a>
                    </div>
                </div>

                <div className='contact_us_contact_form'>
                    <h2>Say Something</h2>
                    <form>
                        <input type='text' placeholder='Name' />
                        <input type='email' placeholder='Email' />
                        <input type='text' placeholder='Subject' />
                        <textarea placeholder='Message'></textarea>
                        <button>Submit</button>
                    </form>
                </div>


            </div>

        </div>
    </div>
  )
}

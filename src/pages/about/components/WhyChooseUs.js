import React from 'react'
import { FaHandshake } from 'react-icons/fa'

const WhyChooseUs = () => {
  return (
    <section className='why_choose_us_with_contact_form'>
        <div className='container'>
            <div className='flex_container'>


                <div className='reasons_why_choose_us'>
                    <h1>Why Choose Us</h1>
                    <div className='reasons'>

                        <div className='reason'>
                            <div className='reason_header_wrapper'>
                                <div className='reason_icon'>
                                    <FaHandshake />
                                </div>
                                <h3>Ease your life</h3>
                            </div>
                            <p>We make it easy to compare rates, cover and conditions of different policies etc</p>
                        </div>

                        <div className='reason'>
                            <div className='reason_header_wrapper'>
                                <div className='reason_icon'>
                                    <FaHandshake />
                                </div>
                                <h3>Trustworthy</h3>
                            </div>
                            <p>We are committed to providing you with the best insurance experience, with the best service and the best advice</p>
                        </div>

                        <div className='reason'>
                            <div className='reason_header_wrapper'>
                                <div className='reason_icon'>
                                    <FaHandshake />
                                </div>
                                <h3>Details</h3>
                            </div>
                            <p>Using Our Comparator ensures that you do not over-look any relevant options as we provide you with all the options you may need.</p>
                        </div>

                        <div className='reason'>
                            <div className='reason_header_wrapper'>
                                <div className='reason_icon'>
                                    <FaHandshake />
                                </div>
                                <h3>Best Price</h3>
                            </div>
                            <p>Our mission is to help you find the best insurance at the best price, with the coverage you need, among the offers of our insurance partners</p>
                        </div>

                    </div>
                </div>

                <div className='about_us_contact_form'>
                    <h1>Send us a message</h1>
                    <form>
                        <div className='about_us_form_group'>
                            <label htmlFor='name'>Name</label>
                            <input placeholder='Full Name' type='text' id='name' name='name' />
                        </div>
                        <div className='about_us_form_group'>
                            <label htmlFor='email'>Email</label>
                            <input placeholder='Email Address' type='email' id='email' name='email' />
                        </div>
                        <div className='about_us_form_group'>
                            <label htmlFor='subject'>Subject</label>
                            <input placeholder='Subject' type='subject' id='subject' name='subject' />
                        </div>
                        <div className='about_us_form_group message'>
                            <label htmlFor='message'>Message</label>
                            <textarea id='message' placeholder='Your Message...' rows={30} cols={30} name='message'></textarea>
                        </div>
                        <button className='about_us_contact_form_submit_btn' type='submit'>Send</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
  )
}

export default WhyChooseUs
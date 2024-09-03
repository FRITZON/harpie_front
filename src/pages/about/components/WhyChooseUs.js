import React from 'react'
import { FaHandshake } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

const WhyChooseUs = () => {
    const { t } = useTranslation();
  return (
    <section className='why_choose_us_with_contact_form'>
        <div className='container'>
            <div className='flex_container'>


                <div className='reasons_why_choose_us'>
                    <h1>{ t("about_page.why_choose_us_with_contact_form.title")}</h1>
                    <div className='reasons'>

                        <div className='reason'>
                            <div className='reason_header_wrapper'>
                                <div className='reason_icon'>
                                    <FaHandshake />
                                </div>
                                <h3>{ t("about_page.why_choose_us_with_contact_form.sub_title1")}</h3>
                            </div>
                            <p>{ t("about_page.why_choose_us_with_contact_form.paragraph1")}</p>
                        </div>

                        <div className='reason'>
                            <div className='reason_header_wrapper'>
                                <div className='reason_icon'>
                                    <FaHandshake />
                                </div>
                                <h3>{ t("about_page.why_choose_us_with_contact_form.sub_title2")}</h3>
                            </div>
                            <p>{ t("about_page.why_choose_us_with_contact_form.paragraph2")}</p>
                        </div>

                        <div className='reason'>
                            <div className='reason_header_wrapper'>
                                <div className='reason_icon'>
                                    <FaHandshake />
                                </div>
                                <h3>{ t("about_page.why_choose_us_with_contact_form.sub_title3")}</h3>
                            </div>
                            <p>{ t("about_page.why_choose_us_with_contact_form.paragraph3")}</p>
                        </div>

                        <div className='reason'>
                            <div className='reason_header_wrapper'>
                                <div className='reason_icon'>
                                    <FaHandshake />
                                </div>
                                <h3>{ t("about_page.why_choose_us_with_contact_form.sub_title4")}</h3>
                            </div>
                            <p>{ t("about_page.why_choose_us_with_contact_form.paragraph4")}</p>
                        </div>

                    </div>
                </div>

                <div className='about_us_contact_form'>
                    <h1>{ t("about_page.why_choose_us_with_contact_form.contact_form.title")}</h1>
                    <form>
                        <div className='about_us_form_group'>
                            <label htmlFor='name'>Name</label>
                            <input placeholder={ t("about_page.why_choose_us_with_contact_form.contact_form.name")} type='text' id='name' name='name' />
                        </div>
                        <div className='about_us_form_group'>
                            <label htmlFor='email'>Email</label>
                            <input placeholder={ t("about_page.why_choose_us_with_contact_form.contact_form.email")} type='email' id='email' name='email' />
                        </div>
                        <div className='about_us_form_group'>
                            <label htmlFor='subject'>Subject</label>
                            <input placeholder={ t("about_page.why_choose_us_with_contact_form.contact_form.subject")} type='subject' id='subject' name='subject' />
                        </div>
                        <div className='about_us_form_group message'>
                            <label htmlFor='message'>Message</label>
                            <textarea id='message' placeholder={ t("about_page.why_choose_us_with_contact_form.contact_form.message")} rows={30} cols={30} name='message'></textarea>
                        </div>
                        <button className='about_us_contact_form_submit_btn' type='submit'>{ t("about_page.why_choose_us_with_contact_form.contact_form.btn")}</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
  )
}

export default WhyChooseUs
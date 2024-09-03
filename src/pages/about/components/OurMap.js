import React from 'react'
import { useTranslation } from 'react-i18next'

const OurMap = () => {
  const { t } = useTranslation();
  
  return (
    <div>
        <h1 className='section_title'>{ t("about_page.map_section_title.title")}</h1>
        <div className='map_container'>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.412394772285!2d103.8497853142669!3d1.2895459990626476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da1f6f0d9d0b6f%3A0x7b2c5e9f7b0f7b4e!2sHarpie%20Insurance%20Services!5e0!3m2!1sen!2ssg!4v1633142392381!5m2!1sen!2ssg" width="600" height="450" style={{border:0}} allowfullscreen="" loading="lazy"></iframe>
        </div>
    </div>
  )
}

export default OurMap
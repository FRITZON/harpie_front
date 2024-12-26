import React from 'react'
import { useTranslation } from 'react-i18next'

const OurMap = () => {
  const { t } = useTranslation();
  
  return (
    <div>
        <h1 className='section_title'>{ t("about_page.map_section_title.title")}</h1>
        <div className='map_container'>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.9790925481085!2d9.76246!3d4.052151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10610daa61c54efb%3A0xc7b2bf21c842ddba!2sLyc%C3%A9e%20De%20La%20Cit%C3%A9%20Des%20Palmiers%2C%20Douala!5e0!3m2!1sen!2scm!4v1633142392381!5m2!1sen!2scm" 
              width="600" 
              height="450" 
              style={{border:0}}
              allowfullscreen="" 
              loading="lazy">
          </iframe>
        </div>
    </div>
  )
}

export default OurMap
import React from 'react'
import { useTranslation } from 'react-i18next'

const BlogSection = () => {
    const { t } = useTranslation();
  return (
    <div id='blogservices' className='home_blog_section'>
        <h2 className='home_section_title colored'>{ t("home.hero_section.home_blog_section.title1")}</h2>
        <h2 className='home_section_title'>{ t("home.hero_section.home_blog_section.title2")}</h2>

        <div className='container'>
            <div className='home_blog_wrapper'>
               
                <div className='home_blog_post_card'>
                    <img src='https://via.placeholder.com/150' alt='blog' />
                    <div className='home_blog_post_card_content'>
                        <h3>{ t("home.hero_section.home_blog_section.sub_title1")}</h3>
                        <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec odio vitae justo ultricies aliquet. </p>
                    </div>
                    <div className='read_more_btn'>
                        <span >{ t("home.hero_section.home_blog_section.span1")}</span>
                    </div>
                </div>
                <div className='home_blog_post_card'>
                    <img src='https://via.placeholder.com/150' alt='blog' />
                    <div className='home_blog_post_card_content'>
                        <h3>{ t("home.hero_section.home_blog_section.sub_title1")}</h3>
                        <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec odio vitae justo ultricies aliquet. </p>
                    </div>
                    <div className='read_more_btn'>
                        <span >{ t("home.hero_section.home_blog_section.span1")}</span>
                    </div>
                </div>
                <div className='home_blog_post_card'>
                    <img src='https://via.placeholder.com/150' alt='blog' />
                    <div className='home_blog_post_card_content'>
                        <h3>{ t("home.hero_section.home_blog_section.sub_title1")}</h3>
                        <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec odio vitae justo ultricies aliquet. </p>
                    </div>
                    <div className='read_more_btn'>
                        <span >{ t("home.hero_section.home_blog_section.span1")}</span>
                    </div>
                </div>
                <div className='home_blog_post_card'>
                    <img src='https://via.placeholder.com/150' alt='blog' />
                    <div className='home_blog_post_card_content'>
                        <h3>{ t("home.hero_section.home_blog_section.sub_title1")}</h3>
                        <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec odio vitae justo ultricies aliquet. </p>
                    </div>
                    <div className='read_more_btn'>
                        <span >{ t("home.hero_section.home_blog_section.span1")}</span>
                    </div>
                </div>
                


            </div>  
        </div>

    </div>
  )
}

export default BlogSection
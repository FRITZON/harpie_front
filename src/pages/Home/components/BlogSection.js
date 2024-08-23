import React from 'react'

const BlogSection = () => {
  return (
    <div className='home_blog_section'>
        <h2 className='home_section_title colored'>OUR BLOG UPDATE</h2>
        <h2 className='home_section_title'>Featured News and Insight</h2>

        <div className='container'>
            <div className='home_blog_wrapper'>
               
                <div className='home_blog_post_card'>
                    <img src='https://via.placeholder.com/150' alt='blog' />
                    <div className='home_blog_post_card_content'>
                        <h3>Blog Title</h3>
                        <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec odio vitae justo ultricies aliquet. </p>
                    </div>
                    <div className='read_more_btn'>
                        <span >Read More</span>
                    </div>
                </div>
                <div className='home_blog_post_card'>
                    <img src='https://via.placeholder.com/150' alt='blog' />
                    <div className='home_blog_post_card_content'>
                        <h3>Blog Title</h3>
                        <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec odio vitae justo ultricies aliquet. </p>
                    </div>
                    <div className='read_more_btn'>
                        <span >Read More</span>
                    </div>
                </div>
                <div className='home_blog_post_card'>
                    <img src='https://via.placeholder.com/150' alt='blog' />
                    <div className='home_blog_post_card_content'>
                        <h3>Blog Title</h3>
                        <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec odio vitae justo ultricies aliquet. </p>
                    </div>
                    <div className='read_more_btn'>
                        <span >Read More</span>
                    </div>
                </div>
                <div className='home_blog_post_card'>
                    <img src='https://via.placeholder.com/150' alt='blog' />
                    <div className='home_blog_post_card_content'>
                        <h3>Blog Title</h3>
                        <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec odio vitae justo ultricies aliquet. </p>
                    </div>
                    <div className='read_more_btn'>
                        <span >Read More</span>
                    </div>
                </div>
                


            </div>  
        </div>

    </div>
  )
}

export default BlogSection
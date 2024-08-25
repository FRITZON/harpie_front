import React from 'react'
import './service_components.css'
import { FaHeadset, FaWindowClose } from 'react-icons/fa'
import { VscGitMerge } from 'react-icons/vsc'

const BestServiceSection = () => {
  return (
    <section className='service_page_best_service'>
        <h1 className='section_title'>Best Service</h1>
        <div className='best_service_flex'>

            <div className='best_service_item'>
                <div className='icon'>
                    <FaHeadset />
                </div>
                <h3 className='best_service_title'>24/7 Support</h3>
                <p>Our Customer is out main priority</p>
            </div>

            <div className='best_service_item'>
                <div className='icon'>
                    <VscGitMerge />
                </div>
                <h3 className='best_service_title'>Easy Flow</h3>
                <p>Express your desires and needs to us</p>
            </div>

            <div className='best_service_item'>
                <div className='icon'>
                    <FaWindowClose />
                </div>
                <h3 className='best_service_title'>Transparency</h3>
                <p>We provide you with 100% transparent service</p>
            </div>


        </div>
    </section>
  )
}

export default BestServiceSection
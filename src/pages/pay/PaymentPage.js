import React, { useState } from 'react'
import './payment.css'
import Momo from '../../assets/img/pay/momo.png'
import Orange from '../../assets/img/pay/om.png'
import Loader from '../../components/loader/Loader'


const PaymentPage = ({  }) => {
  const [isloading, setIsloading] = useState(false)
  const [payment_provider, setPayment_provider] = useState('MTN')

  const makePayment = (e) => {
    e.preventDefault()
    setIsloading(true)
    setTimeout(() => {
      setIsloading(false)
    }, 2000)
  }

  return (
    <div className='paymentPage'>
      <div className='paymentPage__container'>
        <div className='paymentPage_left'>
          <h2>Order Summary</h2>
          <div className='order_summary'>
            <div className='order_summary_comapny_information'>
              <div className='order_summary_item_name'>
                <img src={Momo} alt='payment_provider' />
              </div>
              <div className='order_summary_item_price'>
                <div>Activa Insurance</div>
                <div>Douala Cameroon</div>
                <div>https://www.harpie.cm</div>
              </div>
            </div>
            <div className='insurance_order_summary_item'>
              <div className='order_summary_item_name'>Insurance Cost</div>
              <div className='order_summary_item_price'>XAF 1000</div>
            </div>
            <div className='insurance_order_summary_item'>
              <div className='order_summary_item_name'>Vignette</div>
              <div className='order_summary_item_price'>XAF 1000</div>
            </div>
          </div>
        </div>



        <div className='paymentPage_right'>
          <h2>Payment Details</h2>
          <div className='payment_providers'>

            <div onClick={() => setPayment_provider('MTN')} className={`${payment_provider === 'MTN' ? ' active' : '' } payment_provider`}>
              <img src={Momo} alt='payment_provider' />
              <div className='payment_provider_name'>MTN MOMO</div>
            </div>

            <div onClick={() => setPayment_provider('ORANGE')} className={`${payment_provider === 'ORANGE' ? ' active' : '' } payment_provider`}>
              <img src={Orange} alt='payment_provider' />
              <div className='payment_provider_name'>ORANGE MONEY</div>
            </div>  

          </div>
          

          <div className='payment_form'>
            <div className='payment_form_group'>
              <label for='phone'>Phone</label>
              <input type='number' placeholder='Payment number' id='phone' />
            </div>
            <div className='payment_form_group'>
              {
                isloading
                ?
                <div className='submitting_payment'>
                  <Loader />
                </div>
                :
                <input onClick={makePayment} type='submit' value="Make Payment"/>
              }
            </div>

          </div>


        </div>
      </div>
    </div>
  )
}

export default PaymentPage
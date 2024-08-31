import React from 'react'
import ResultItem from './components/ResultItem'
import './components/Results.css'

const insurance_results = [
    {
        name: 'Activa Consulting',
        price: 200000,
        currency: 'XAF',
        logo: 'https://www.activa.cm/wp-content/uploads/2019/07/Activa-Logo-1.png',
        location: 'Douala, Cameroon',
        address: 'Bonanjo, Douala, Cameroon',
        phone: '+237 233 42 42 42',
        email: 'contact@activa-group.com',
        website: 'https://www.activa.cm',
        description: 'Activa Consulting is a leading insurance company in Cameroon. They offer a wide range of insurance products and services to individuals and businesses. Their team of experts is dedicated to providing the best insurance solutions to meet the needs of their clients. With Activa Consulting, you can rest assured that your insurance needs are in good hands.',
        insurance_costs: [
            {
                name: 'base',
                price: 120000
            },
            {
                name: 'standard',
                price: 150000
            },
            {
                name: 'premium',
                price: 400000
            }
        ],
        offers: {
            discount: 10,
            free_services: ['roadside assistance', 'car rental', 'medical check-up'],
            other_services: ['24/7 customer support', 'online claims processing', 'personalized insurance plans']
        },


    },
    {
        name: 'AXA Insurance',
        price: 250000,
        currency: 'XAF',
        logo: 'https://www.axa.com/sites/default/files/2021-05/AXA_Logo.png',
        location: 'Yaounde, Cameroon',
        address: 'Bastos, Yaounde, Cameroon',
        phone: '+237 233 42 42 42',
        email: 'contact@axa.com',
        website: 'https://www.axa.com',
        description: 'AXA Insurance is a global insurance company with a strong presence in Cameroon. They offer a wide range of insurance products and services to individuals and businesses. Their team of experts is dedicated to providing the best insurance solutions to meet the needs of their clients. With AXA Insurance, you can rest assured that your insurance needs are in good hands.',
        insurance_costs: [
            {
                name: 'base',
                price: 150000
            },
            {
                name: 'standard',
                price: 200000
            },
            {
                name: 'premium',
                price: 450000
            }
        ],
        offers: {
            discount: 5,
            free_services: ['roadside assistance', 'car rental'],
            other_services: ['24/7 customer support', 'online claims processing', 'personalized insurance plans']
        }
    },
    {
        name: 'Allianz Insurance',
        price: 180000,
        currency: 'XAF',
        logo: 'https://www.allianz.com/content/dam/onemarketing/azcom/Allianz_com/logo/Allianz_logo_2017/Allianz_logo_2017_1.png',
        location: 'Buea, Cameroon',
        address: 'Molyko, Buea, Cameroon',
        phone: '+237 233 42 42 42',
        email: 'contact@allianz.com',
        website: 'https://www.allianz.com',
        description: 'Allianz Insurance is a leading insurance company in Cameroon. They offer a wide range of insurance products and services to individuals and businesses. Their team of experts is dedicated to providing the best insurance solutions to meet the needs of their clients. With Allianz Insurance, you can rest assured that your insurance needs are in good hands.',
        insurance_costs: [
            {
                name: 'base',
                price: 100000
            },
            {
                name: 'standard',
                price: 130000
            },
            {
                name: 'premium',
                price: 380000
            }
        ],
        offers: {
            discount: 15,
            free_services: ['roadside assistance', 'car rental', 'medical check-up'],
            other_services: ['24/7 customer support', 'online claims processing', 'personalized insurance plans']
        }
    }
    ]
const Results = () => {
  return (
    <div className='comparision_result_page'>
        <div className='container'>

            <div className='insurance_results'>
                {insurance_results.map((insurance) => (
                    <ResultItem key={insurance.name} insurance={insurance} />
                ))}
            </div>
        </div>
    </div>
  )
}

export default Results
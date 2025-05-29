import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from '../../components/loader/Loader';
import { getRequestWithLanguage, postRequest, postRequestWithLanguage } from '../../api';
import ComparisonForm from './components/ComparisonForm';

const StartComparison = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(true); // Changed to true by default
  const [insuranceType, setInsuranceType] = useState('vehicle');
  const [query, setQuery] = useState('vehicle');

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const type = params.get('insurance_type');
    setInsuranceType(type || 'vehicle');
  }, [location]);

  const getEndpoint = (type) => {
    const endpoints = {
      vehicle: '/vehicles-insurance/comparison/start/',
      health: '/health-insurance/comparison/start/',
      life: '/life-insurance/comparison/start/',
      business: '/business-insurance/comparison/start/',
      death: '/death-insurance/comparison/start/'
    };
    return endpoints[type] || endpoints.vehicle;
  };

  let {search} = location 

  useEffect(() => {
    setQuery(search)
  }, [search])

  const handleFormSubmit = async (formData) => {
    setIsLoading(true);
    const endpoint = getEndpoint(insuranceType);
    const response = await postRequestWithLanguage(endpoint, formData);
    
    if (response.status === 201) {
      navigate(`/comparison/questions?insurance_type=${insuranceType}`, { 
        state: { responseData: response.data } 
      });
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
    <div className='full_page_loader'>
      <Loader />
    </div>
    )
  }

  return <ComparisonForm onSubmit={handleFormSubmit} />;
};

export default StartComparison;
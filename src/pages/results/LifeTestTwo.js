"use client"

import { useState } from 'react'
import './InsuranceComparison.css'
import { UserSelections } from './UserSelections';
import { useNavigate } from 'react-router-dom';



export default function InsuranceComparison({ plans, user_inputs, sessionID }) {
  const [selectedCategory, setSelectedCategory] = useState("Empowerment Plans")
  const navigate = useNavigate()
  
  const categories = [ ...Array.from(new Set(plans.map(plan => plan.category.name))), 'all'];
  
  const filteredPlans = selectedCategory === 'all' 
    ? plans 
    : plans.filter(plan => plan.category.name === selectedCategory)

  return (
    <div className="page-wrapper">
      <div className="container">
        {/* User Selections */}
        <UserSelections selections={user_inputs} />

        {/* Category Filter */}
        <div className="category-filter">
          <h2>Available Plans</h2>
          <div className="filter-buttons">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`filter-button ${selectedCategory === category ? 'active' : ''}`}
              >
                {category === 'all' ? 'All Plans' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Plans Grid */}
        <div className="plans-grid">
          {filteredPlans.map(plan => (
            <div key={plan.id} className="plan-card">
              <div className="plan-content">
                <div className="plan-header">
                  <div>
                    <h3 className="plan-title">{plan.plan_name}</h3>
                    <p className="company-name">{plan.company.name}</p>
                  </div>
                  <img 
                    src={'https://harpie-app.site' + plan.company.logo} 
                    alt={`${plan.company.name} logo`}
                    className="company-logo"
                    style={{width: '100px', height: 'auto'}} // Increased logo size
                  />
                </div>
                
                <div className="plan-details">
                  <div className="detail-row">
                    <span className="detail-label">Coverage Range</span>
                    <span className="detail-value">
                      {Number(plan.minimum_coverage).toLocaleString()} - {Number(plan.maximum_coverage).toLocaleString()} XAF
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Term Range</span>
                    <span className="detail-value">
                      {plan.minimum_term} - {plan.maximum_term} months
                    </span>
                  </div>
                </div>

                <div className="plan-actions">
                  <button className="button button-primary">
                    Get a Quote
                  </button>
                  <button onClick={() => navigate('/life/result',  {state: {insurance: plan, user_inputs: user_inputs, session_id: sessionID}})} className="button button-secondary">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


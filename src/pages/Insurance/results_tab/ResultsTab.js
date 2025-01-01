'use client'

import { useState } from 'react'
import { Calendar, Filter, Search } from 'lucide-react'
import { DateRangePicker } from './DateRangePicker'
import './InsuranceResults.css'
import Subscriptions from './components/subscriptions/Subscriptions'
import ComparisonResults from './components/comparison/ComparisonResults'

const InsuranceResults = () => {
  const [activeTab, setActiveTab] = useState('results')
  const [selectedInsurance, setSelectedInsurance] = useState('')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  
  const insuranceTypes = [
    { value: "all", label: "All Insurance Types" },
    { value: "vehicle", label: "Vehicle Insurance" },
    { value: "health", label: "Health Insurance" },
    { value: "life", label: "Life Insurance" },
    { value: "death", label: "Death Insurance" },
    { value: "house", label: "House Insurance" },
    { value: "business", label: "Business Insurance" },
    { value: "travel", label: "Travel Insurance" },
  ]

  return (
    <div className="insurance-results-container">
      <h1 className="page-title">My Insurance Dashboard</h1>
      
      <div className="tabs-container">
        <div className="tabs-list">
          <button 
            className={`tab-button ${activeTab === 'subscription' ? 'active' : ''}`}
            onClick={() => setActiveTab('subscription')}
          >
            My Subscription
          </button>
          <button 
            className={`tab-button ${activeTab === 'results' ? 'active' : ''}`}
            onClick={() => setActiveTab('results')}
          >
            Comparison Results
          </button>
          <button 
            className={`tab-button ${activeTab === 'incomplete' ? 'active' : ''}`}
            onClick={() => setActiveTab('incomplete')}
          >
            Incomplete
          </button>
        </div>

        {/* My Subscription Tab */}
        {activeTab === 'subscription' && <Subscriptions />}

        {/* Comparison Results Tab */}
        {activeTab === 'results' && <ComparisonResults /> }

        {/* Incomplete Tab */}
        {activeTab === 'incomplete' && (
          <div className="tab-content">
            <div className="filters-container">
              <div className="search-filters">
                <div className="filter-group">
                  <div className="custom-select">
                    <button 
                      className="select-button"
                      onClick={() => setIsFilterOpen(!isFilterOpen)}
                    >
                      <Filter className="filter-icon" />
                      <span>{selectedInsurance ? insuranceTypes.find(t => t.value === selectedInsurance)?.label : 'Insurance Type'}</span>
                    </button>
                    {isFilterOpen && (
                      <div className="select-dropdown">
                        {insuranceTypes.map((type) => (
                          <div 
                            key={type.value} 
                            className="select-option"
                            onClick={() => {
                              setSelectedInsurance(type.value)
                              setIsFilterOpen(false)
                            }}
                          >
                            {type.label}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="filter-group">
                  <DateRangePicker />
                </div>

                <div className="search-box">
                  <Search className="search-icon" />
                  <input 
                    type="text" 
                    placeholder="Search incomplete..." 
                    className="search-input"
                  />
                </div>
              </div>
            </div>

            <div className="placeholder-content">
              <h2>Incomplete Comparisons</h2>
              <p className="text-muted">Your incomplete insurance comparisons will appear here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default InsuranceResults


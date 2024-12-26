import React, { useState } from 'react';
import { Calendar, Filter, Search } from 'lucide-react';
import './ResultsTabs.css';

const ResultsTabs = () => {
  const [activeTab, setActiveTab] = useState('comparison');
  const [showFilters, setShowFilters] = useState(false);

  const tabs = [
    {
      id: 'subscriptions',
      label: 'My Subscriptions',
      count: 2
    },
    {
      id: 'comparison',
      label: 'Comparison Results',
      count: 4
    },
    {
      id: 'incomplete',
      label: 'Incomplete',
      count: 1
    }
  ];

  const insuranceTypes = [
    'Vehicle Insurance',
    'Health Insurance',
    'Life Insurance',
    'Death Insurance',
    'House Insurance',
    'Business Insurance',
    'Travel Insurance'
  ];

  return (
    <div className="results-container">
      {/* Tabs Navigation */}
      <div className="tabs-header">
        <div className="tabs-nav">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
              <span className="tab-count">{tab.count}</span>
            </button>
          ))}
        </div>

        {/* Filters Section */}
        {activeTab !== 'subscriptions' && (
          <div className="filters-section">
            <button 
              className={`filter-toggle ${showFilters ? 'active' : ''}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={20} />
              Filters
            </button>

            <div className={`filters-dropdown ${showFilters ? 'show' : ''}`}>
              <div className="filter-group">
                <label>Insurance Type</label>
                <div className="insurance-types">
                  {insuranceTypes.map(type => (
                    <label key={type} className="filter-checkbox">
                      <input type="checkbox" name="insurance-type" />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <label>Date Range</label>
                <div className="date-inputs">
                  <div className="date-input">
                    <Calendar size={16} />
                    <input type="date" placeholder="Start Date" />
                  </div>
                  <div className="date-input">
                    <Calendar size={16} />
                    <input type="date" placeholder="End Date" />
                  </div>
                </div>
              </div>

              <div className="filter-actions">
                <button className="clear-filters">Clear Filters</button>
                <button className="apply-filters">Apply Filters</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <Search size={20} />
        <input type="text" placeholder="Search in results..." />
      </div>

      {/* Content Area */}
      <div className="tab-content">
        {activeTab === 'subscriptions' && (
          <div className="content-placeholder">
            <h3>My Subscriptions Content</h3>
            <p>Active insurance subscriptions will be displayed here</p>
          </div>
        )}

        {activeTab === 'comparison' && (
          <div className="content-placeholder">
            <h3>Comparison Results Content</h3>
            <p>Insurance comparison results will be displayed here</p>
          </div>
        )}

        {activeTab === 'incomplete' && (
          <div className="content-placeholder">
            <h3>Incomplete Comparisons Content</h3>
            <p>Incomplete insurance comparisons will be displayed here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsTabs;

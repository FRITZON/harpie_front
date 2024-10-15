import React, { useEffect, useState } from 'react';
import './SectionNavigation.css';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';


const SidebarNavigation = ({ sections = {"personal and vehicle info": {}}, currentStage, jumpToSection, sessionID }) => {
  const [expandedSections, setExpandedSections] = useState({});
  const { t } = useTranslation()

  useEffect(() => {
    // Reset expanded sections when sessionID changes (new session started)
    setExpandedSections({});
  }, [sessionID]);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="section-navigation">
      <h2 className="text-xl font-bold mb-4">{t('compare.aside_title')}</h2>
      {Object.entries(sections).map(([sectionName, sectionData], index) => (
        <div
          key={index}
          className={`mb-2 ${currentStage === sectionName ? 'border-l-4 border-blue-500 pl-2' : ''}`}
        >
          <button
            onClick={() => toggleSection(sectionName)}
            className="section-navigation_dd_btn"
          >
            <span>{sectionName.replace(/_/g, ' ')}</span>
            {expandedSections[sectionName] ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
          </button>
          {expandedSections[sectionName] && (
            <div className="section-navigation-dd_list">
              {Object.entries(sectionData).map(([key, value], subIndex) => (
                <div onClick={() =>  jumpToSection(key)} key={subIndex} className="mb-1">
                  <strong>{key.replace(/_/g, ' ')}</strong>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SidebarNavigation;
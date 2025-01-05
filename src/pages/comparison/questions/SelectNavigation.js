import React, { useEffect, useState } from 'react';
import './SectionNavigation.css';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import AnimatedBackButton from '../../../components/AnimatedBackButton';
import AnimatedForwardButton from '../../../components/AnimatedForwardButton';


const SidebarNavigation = ({ sections = {"personal and vehicle info": {}}, currentStage, jumpToSection, sessionID, insurance_type, goToPreviousQuestion, handleNextQuestion, is_loading, currentPosition, currentAnswer  }) => {
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
      <div className="navigation">
          {/* <p className='btn'>Go Back</p> */}
          <AnimatedBackButton onclick={goToPreviousQuestion} is_loading={false} disabled={currentPosition === 0} />
          <AnimatedForwardButton onclick={handleNextQuestion} is_loading={is_loading} disabled={currentAnswer === null} />
        </div>
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
            <span>{ t('partial_result.' + insurance_type + '.' + sectionName)}</span>
            {expandedSections[sectionName] ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
          </button>
          {expandedSections[sectionName] && (
            <div className="section-navigation-dd_list">
              {Object.entries(sectionData).map(([key, value], subIndex) => (
                <div onClick={() =>  jumpToSection(key)} key={subIndex} className="mb-1">
                  <strong>{ t('partial_result.'+ insurance_type + '.' + key)}</strong>
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
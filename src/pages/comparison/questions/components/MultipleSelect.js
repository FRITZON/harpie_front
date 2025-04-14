import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { FaCheckCircle, FaChevronDown, FaTimesCircle } from 'react-icons/fa';
import { VscClose, VscArrowRight, VscArrowLeft } from 'react-icons/vsc';
import { useQuestionContext } from '../../../../context/QuestionContext';



/// USED TO ALLOW USER TO SELECT MORE THAN ONE ITEM AT A TIME FROM PROVIDED CHOICES (((((( NOT API ))))))
//-----------------------------------------
/// RELATED INSURANCE: 
// -----VEHICLE - SELECT PREVIOUS COMPANIES
// -----HEALTH  - SELECT ILLNESSES
//-----------------------------------------



const MultipleSelect = ({ choices, questionId, lang }) => {
  const [checkedItems, setCheckedItems] = useState({ rc: true }); 
  const context = useQuestionContext();
  const { handleAnswer } = context;

  const handleCheck = (event) => {
    const { id, checked } = event.target;

    
    if (id === 'rc' && !checked) {
      return;
    }

    const updatedCheckedItems = {
      ...checkedItems,
      [id]: checked,
    };

    setCheckedItems(updatedCheckedItems);

    const selectedOptions = Object.keys(updatedCheckedItems).filter(
      (key) => updatedCheckedItems[key]
    );

    console.log("Options sélectionnées :", selectedOptions);

   
    handleAnswer({ [questionId]: selectedOptions });
  };

  useEffect(() => {
    
    const initialSelectedOptions = Object.keys(checkedItems).filter(
      (key) => checkedItems[key]
    );
    handleAnswer({ [questionId]: initialSelectedOptions }); 
  }, []); 

  return (
    <div className='options'>
      <div className="comparison_select_multiple_options">
        {choices.map((listItem) => (
          <div key={listItem.code}>
            <input
              id={listItem.code}
              type="checkbox"
              checked={checkedItems[listItem.code] || false}
              onChange={handleCheck}
            />
            <label htmlFor={listItem.code}>{lang === 'en' ? listItem.en : listItem.fr}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultipleSelect
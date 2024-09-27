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

const MultipleSelect = ({ choices }) => {
  const [checkedItems, setCheckedItems] = useState({});

  const context = useQuestionContext();
  
  const { currentQuestion, handleAnswer, currentAnswer } = context;


  const handleCheck = (event, listItem) => {
    let data = {
      ...checkedItems,
      [event.target.id]: event.target.checked
    }
    
    setCheckedItems({
      ...checkedItems,
      [event.target.id]: event.target.checked
    });

    handleAnswer(JSON.stringify(data));
  };

  if(currentQuestion.api) {
    return 
  }
  return (
    <div className='options'>
      <div class="comparison_select_multiple_options">
        {
          choices.map(listItem => (
            <div key={listItem.value}>
              <input 
                id={listItem.code} 
                type="checkbox"
                checked={checkedItems[listItem.code] || false}
                onChange={(e) => handleCheck(e, listItem)}
              />
              <label for={listItem.code}>{listItem.en}</label>
            </div>
          ))
        }
      </div>

    </div>
  )
}


export default MultipleSelect
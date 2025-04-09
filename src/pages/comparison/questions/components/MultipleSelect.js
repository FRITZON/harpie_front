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


const MultipleSelect = ({ choices, questionId }) => {
  const [checkedItems, setCheckedItems] = useState({});
  const context = useQuestionContext();
  const { handleAnswer } = context;

  const handleCheck = (event) => {
    const { id, checked } = event.target;
    const updatedCheckedItems = {
      ...checkedItems,
      [id]: checked,
    };

    setCheckedItems(updatedCheckedItems);

    // Créer un tableau des options sélectionnées
    const selectedOptions = Object.keys(updatedCheckedItems).filter(
      (key) => updatedCheckedItems[key]
    );

    console.log("Options sélectionnées :", selectedOptions);

    // Envoie l'objet avec questionId et les options sélectionnées
    handleAnswer({ [questionId]: selectedOptions });
  };

  useEffect(() => {
    // Initialiser la liste des options sélectionnées lors du premier rendu
    const initialSelectedOptions = Object.keys(checkedItems).filter(
      (key) => checkedItems[key]
    );
    handleAnswer({ [questionId]: initialSelectedOptions }); // Envoie le tableau initial
  }, []); // Exécuter une fois lors du premier rendu

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
            <label htmlFor={listItem.code}>{listItem.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultipleSelect
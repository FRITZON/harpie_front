import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { FaCheckCircle, FaChevronDown, FaTimesCircle } from 'react-icons/fa';
import { VscClose, VscArrowRight, VscArrowLeft } from 'react-icons/vsc';
import { useQuestionContext } from '../../../../context/QuestionContext';



/// USED TO ALLOW USER TO SELECT MORE THAN ONE ITEM AT A TIME FROM API (((((( API URL IS REQUIRED ))))))
//-----------------------------------------
/// RELATED INSURANCE: 
// -----VEHICLE - SELECT PREVIOUS COMPANIES
// -----HEALTH  - SELECT ILLNESSES
//-----------------------------------------

const APIMultipleSelect = ({ api }) => {
  const [list, setlist] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedOption, setSelectedOption] = useState(null)
  const [checkedItems, setCheckedItems] = useState({});

  
  const context = useQuestionContext();
  const data = {
    "vehicle_make": "1"
  }
  useEffect(() => {
    fetch_data()
  }, [])

  const replaceUrlVariables = (url) => {
    return url.includes("{mark_id}") ? url.replace(/\{(\w+)\}/g, currentAnswer) : url
  };

  const fetch_data = async () => {
    const url = replaceUrlVariables(api)
    
    try {
      setLoading(true)
      const response = await axios.get(url)
      response.status === 200 && setlist(response.data)
    }
    catch (err) {
      setError('An error occurred while fetching the data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const { currentQuestion, handleAnswer, currentAnswer } = context;


  const handleCheck = (event) => {
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

  const getCheckedValues = () => {
    return Object.keys(checkedItems).filter(key => checkedItems[key]);
  };

  return (
    <div className='options'>
      <div class="comparison_select_multiple_options">
        {
          list.map(listItem => (
            <div key={listItem.value}>
              <input 
                id={listItem.value} 
                type="checkbox"
                checked={checkedItems[listItem.value] || false}
                onChange={handleCheck}
             />
              <label for={listItem.value}>{listItem.value}</label>
            </div>
          ))
        }
      </div>

    </div>
  )
}


export default APIMultipleSelect
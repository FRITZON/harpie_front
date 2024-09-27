import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { FaCheckCircle, FaChevronDown, FaTimesCircle } from 'react-icons/fa';
import { VscClose, VscArrowRight, VscArrowLeft } from 'react-icons/vsc';
import { useQuestionContext } from '../../../../context/QuestionContext';
import SearchableList from './SearchableList';



/// USED TO ALLOW USER TO SELECT MORE THAN ONE ITEM AT A TIME FROM API (((((( API URL IS REQUIRED ))))))
//------------------------------------------------------
/// RELATED INSURANCE: 
// -----VEHICLE - SELECT MAKE AND MODEL, SELECT TOWN ETC
// -----HEALTH  - SELECT ILLNESSES
//------------------------------------------------------

const SearchableAPISelect = ({ api }) => {
  const [list, setlist] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [checkedItems, setCheckedItems] = useState({});

  
  const context = useQuestionContext();
  
  useEffect(() => {
    fetch_data()
  }, [])

  /**
   * this function replaces the variables in the url with the current answer
   * @param { String } url the url to be replaced
   * @returns a new url with the variables replaced
   */
  const replaceUrlVariables = (url) => {
    return url.includes("{mark_id}") ? url.replace(/\{(\w+)\}/g, currentAnswer) : url
  };


  /**
   * Fetch data from the API
   */
  const fetch_data = async () => {
    const url = replaceUrlVariables(api)
    
    try {
      setLoading(true)
      const response = await axios.get(url)
      response.status === 200 && setlist(response.data)
    }
    catch (err) {
      setError('An error occurred while fetching the data.');
      console.warn(err);
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
      <SearchableList list={list} onSelect={handleAnswer} />
    </div>
  )
}


export default SearchableAPISelect
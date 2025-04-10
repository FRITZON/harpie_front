import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuestionContext } from '../../../../context/QuestionContext';



const APIMultipleSelect = ({ api, questionId, currentAnswer }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [checkedItems, setCheckedItems] = useState({});

  const context = useQuestionContext();
  const { handleAnswer } = context;

  const replaceUrlVariables = (url) => {
    return url.includes("{mark_id}") ? url.replace(/\{(\w+)\}/g, currentAnswer) : url;
  };

  const fetch_data = async () => {
    const url = replaceUrlVariables(api);
    
    try {
      setLoading(true);
      const response = await axios.get(url);
      if (response.status === 200) {
        setList(response.data);
        setCheckedItems({}); 
        handleAnswer({ [questionId]: [] }); 
      }
    } catch (err) {
      setError('An error occurred while fetching the data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch_data();
  }, []);

  const handleCheck = (event) => {
    const value = event.target.id;
    const isChecked = event.target.checked;

   
    const updatedCheckedItems = {
      ...checkedItems,
      [value]: isChecked
    };

    setCheckedItems(updatedCheckedItems);

   
    const selectedValues = Object.keys(updatedCheckedItems).filter(key => updatedCheckedItems[key]);

   
    handleAnswer({ [questionId]: selectedValues });
  };

  return (
    <div className='options'>
      <div className="comparison_select_multiple_options">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          list.map((listItem) => (
            <div key={listItem.id}>
              <input 
                id={listItem.name} 
                type="checkbox"
                checked={!!checkedItems[listItem.name]} 
                onChange={handleCheck}
              />
              <label htmlFor={listItem.name}>{listItem.name}</label> {/* Display name*/}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default APIMultipleSelect;
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
        // Cocher la première option par défaut
        if (response.data.length > 0) {
          const defaultChecked = { [response.data[0].value]: true };
          setCheckedItems(defaultChecked);
          handleAnswer({ [questionId]: [response.data[0].value] }); // Mettre à jour les réponses
        }
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

    // Mettre à jour les réponses
    const updatedCheckedItems = {
      ...checkedItems,
      [value]: isChecked
    };

    setCheckedItems(updatedCheckedItems);

    // Construire la liste des réponses sélectionnées
    const selectedValues = Object.keys(updatedCheckedItems).filter(key => updatedCheckedItems[key]);

    // Passer l'objet avec l'ID de question et les valeurs sélectionnées
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
            <div key={listItem.value}>
              <input 
                id={listItem.value} 
                type="checkbox"
                checked={checkedItems[listItem.value] || false}
                onChange={handleCheck}
              />
              <label htmlFor={listItem.value}>{listItem.value}</label>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default APIMultipleSelect;
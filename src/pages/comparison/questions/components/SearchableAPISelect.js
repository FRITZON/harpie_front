import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuestionContext } from '../../../../context/QuestionContext';
import SearchableList from './SearchableList';

const SearchableAPISelect = ({ api, questionId, currentAnswer }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const context = useQuestionContext();
  
  useEffect(() => {
    fetch_data();
  }, []);

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
        console.log("Liste récupérée:", response.data); // Log de la liste récupérée
      }
    } catch (err) {
      setError('An error occurred while fetching the data.');
      console.warn(err);
    } finally {
      setLoading(false);
    }
  };

  const { handleAnswer } = context;

  const handleSelect = (id, value) => {
    // Vérifiez que id et value sont définis
    if (id && value) {
      handleAnswer({ [id]: value });
    } else {
      console.warn("ID ou valeur est indéfini");
    }
  };

  return (
    <div className='options'>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      <SearchableList 
        list={list} 
        onSelect={handleSelect} 
        questionId={questionId} // Passer l'ID de la question
      />
    </div>
  );
};

export default SearchableAPISelect;
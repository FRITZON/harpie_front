
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuestionContext } from '../../../../context/QuestionContext';
import SearchableList from './SearchableList';


const SearchableAPISelect = ({ api, questionId, currentAnswer }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const context = useQuestionContext();
  const { handleAnswer } = context;

  useEffect(() => {
    fetch_data();
  }, [currentAnswer]);


  const replaceUrlVariables = (url) => {
    console.log("url avant", currentAnswer);
    return url.includes("{make_name}") ? url.replace(/\{(\w+)\}/g, currentAnswer) : url
  };

  const fetch_data = async () => {
    const url = replaceUrlVariables(api)
    
    try {
      setLoading(true)
      const response = await axios.get(url)
      response.status === 200 && setList(response.data)

    }
    catch (err) {
      //setError('An error occurred while fetching the data.');
      console.warn(err);
    } finally {
      setLoading(false);
    }
  }

  const handleSelect = (value) => {
    handleAnswer({ [questionId]: value });
  };

  return (
    <div className='options'>
      {loading && <div>Loading...</div>}
      {error && <div className="error-message">{error}</div>}
      <SearchableList list={list} onSelect={handleSelect} />
    </div>
  );
};

export default SearchableAPISelect;
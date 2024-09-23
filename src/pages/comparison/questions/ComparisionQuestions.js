import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './insurance_questions.css'
import { json, useLocation, useNavigate } from 'react-router-dom';
import useLocalStorage from '../../../lib/LocalStorage';
import { getRequest, getRequestWithSession, postRequest, postRequestWithSession } from '../../../api';
import { QuestionProvider, useQuestionContext } from '../../../context/QuestionContext';
import axios from 'axios';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { VscClose, VscArrowRight, VscArrowLeft } from 'react-icons/vsc';
import UserForm from './components/UserForm';
import { tabTitle } from '../../..';
import i18next from 'i18next';
import SearchableList from './components/SearchableList';
import OptionButtons from './components/OptionButtons';
import ModalSelect from './components/ModalSelect';
import VehicleYearSelector from './components/VehicleYearSelector';

const API_MANAGER = [
  { insurance_type: 'life', estimated_questions: 22, base_url: '/life-insurance/comparison/stage/', complete_url: "/life-insurance/comparison/complete/", result_page: "/comparison/result/life" },
  { insurance_type: 'health', estimated_questions: 15, base_url: '/health-insurance/comparison/stage/', complete_url: "/health-insurance/comparison/complete/", result_page: "/comparison/result/health" },
  { insurance_type: 'vehicle', estimated_questions: 20, base_url: '/vehicles-insurance/comparison/stage/', complete_url: "/vehicles-insurance/comparison/results/", result_page: "/comparison/result/vehicle" },
  { insurance_type: 'home', estimated_questions: 5, base_url: '/home-insurance/comparison/stage/', complete_url: "/home-insurance/comparison/complete/", result_page: "/comparison/result/home" },
  { insurance_type: 'business', estimated_questions: 7, base_url: '/business-insurance/comparison/stage/', complete_url: "/business-insurance/comparison/complete/", result_page: "/comparison/result/business" },
];

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
};

const InsuranceQuestions = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [previousQuestions, setPreviousQuestions] = useLocalStorage('previousQuestions', []);
  const [partialResults, setPartialResults] = useLocalStorage('partialResults', {});
  const [direction, setDirection] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [error, setError] = useState(null);
  const [currentAnswer, setCurrentAnswer] = useState(null);
  const [nextQuestionURL, setNextQuestionURL] = useState(null)
  const [sessionID, setSessionID] = useState('')
  const [iscomplete, setIscomplete] = useState(false)
  const [lang, setLang] = useState('fr')


  const query = new URLSearchParams(location.search);
  const insurance_type = query.get('insurance_type');
  const insuranceInfo = API_MANAGER.find(item => item.insurance_type === insurance_type);


  useEffect(() => {
    const initialQuestion = location.state?.responseData;

    if (initialQuestion) {
      setCurrentQuestion(initialQuestion.question);
      setNextQuestionURL(initialQuestion.current_stage)
      setPartialResults(initialQuestion.partial_results || {});
      initialQuestion?.session_id && setSessionID(initialQuestion?.session_id)
    } else {
      fetchNextQuestion();
    }
  }, [location.state]);


  useEffect(() => {
    setLang(i18next.language)
    setPreviousQuestions([])
  }, []);


  useEffect(() => {
    if (currentQuestion && insuranceInfo) {
      const currentIndex = previousQuestions.length;
      const targetPercentage = ((currentIndex + 1) / insuranceInfo.estimated_questions) * 100;
      animatePercentage(targetPercentage);
    }
  }, [currentQuestion, previousQuestions, insuranceInfo]);



  const animatePercentage = (targetPercentage) => {
    const duration = 500;
    const steps = 20;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const stepSize = (targetPercentage - percentage) / steps;

    const intervalId = setInterval(() => {
      if (currentStep < steps) {
        setPercentage(prevPercentage => {
          const newPercentage = prevPercentage + stepSize;
          return Math.round(newPercentage * 10) / 10;
        });
        currentStep++;
      } else {
        clearInterval(intervalId);
        setPercentage(targetPercentage);
      }
    }, stepDuration);

    return () => clearInterval(intervalId);
  };


  const goToPreviousQuestion = () => {
    if (previousQuestions.length > 0) {
      const prevQuestion = previousQuestions[previousQuestions.length - 1];
      setCurrentQuestion(prevQuestion);
      setPreviousQuestions(prev => prev.slice(0, -1));
      setDirection(-1);
      setCurrentAnswer(null);
    }
  };


  const handleAnswer = (answer) => {
    setCurrentAnswer(answer);
  }
  ;

  const handleNextQuestion = () => {
    if (currentAnswer !== null) {
      fetchNextQuestion({ [currentQuestion.id]: currentAnswer });
    }
  };


  const fetchNextQuestion = async (answer = null) => {
    setError(null);
    try {
      if (!insuranceInfo) {
        throw new Error('Invalid insurance type');
      }

      const endpoint = `${insuranceInfo.base_url}${nextQuestionURL ? nextQuestionURL + '/' : 'personal_and_vehicle_info/'}`;
      const response = await postRequestWithSession(sessionID, endpoint, { answers: answer });

      if (response.status === 200) {
        if (response.data?.next_stage === 'complete') {
          setIscomplete(true)
        }
        if (currentQuestion) {
          setPreviousQuestions(prev => [...prev, { ...currentQuestion, answer: currentAnswer }]);
        }
        response.data?.question && setCurrentQuestion(response.data?.question);
        setNextQuestionURL(response.data.next_stage)
        setPartialResults(response.data.partial_results);
        setDirection(1);
        setCurrentAnswer(null);
      } else {
        throw new Error('Failed to fetch next question');
      }
    } catch (err) {
      setError('Failed to fetch the next question. Please try again.');
      console.error(err);
    }
  };



  const submit_insurance = async () => {
    const response = await getRequestWithSession(sessionID, insuranceInfo?.complete_url)
    console.log('response', response) 
    if(response?.status === 200) {
      navigate(insuranceInfo?.result_page, {state: {result: response?.data, session_id: sessionID}})
      console.log(response?.data)
    }
  } 

  const formatKey = (key) => {
    return key.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  };

  if (!currentQuestion || !insuranceInfo) {
    return <div className='loader'></div>;
  }

  const renderNestedList = (value) => {
    try {
      const parsedValue = JSON.parse(value);
      return (
        <ul className="ml-4 space-y-1">
          {Object.entries(parsedValue).map(([nestedKey, nestedValue]) => (
            <li key={nestedKey} className="flex items-center">
              <FaCheckCircle className="text-green-500 mr-2" />
              <span>{formatKey(nestedKey)}</span>
            </li>
          ))}
        </ul>
      );
    } catch {
      return <span className="ml-2">{formatKey(value.toString())}</span>;
    }
  };

  const filteredResults = Object.entries(partialResults).reduce((acc, [category, items]) => {
    acc[category] = Object.entries(items).reduce((itemAcc, [key, value]) => {
      if (!key.startsWith('driver_user')) {
        itemAcc[key] = value;
      }
      return itemAcc;
    }, {});
    return acc;
  }, {});



  if (iscomplete) {
    return (
      <>
    {/* <div className='comparison_filter_results_wrapper'> */}
      <div className='comparison_filter_results'>

        {
          Object.entries(partialResults).map(([category, items]) => (
          <div key={category} className="comparison_result_card">
            <h3 className="title">{formatKey(category)}</h3>
            <ul className="space-y-2">
              {Object.entries(items).map(([key, value]) => (
                <>
                  {key === 'coverage_options' || key === 'previous_insurer'
                    ? renderNestedList(value)
                    :  key.startsWith('driver_user')
                    ? null
                    :
                  <li key={key} className="insurance_list_partial_results">
                    <FaCheckCircle className="text-green-500 mr-2" />
                    <span className="font-medium">{formatKey(key)}:</span>
                    <span className="ml-2">{formatKey(value.toString())}</span>
                </li>
                }
              </>
              ))}
            </ul>
          </div>
        ))
      }

      </div>
        <button onClick={submit_insurance} className='comparison_submit_btn'>Find my Insurance</button>
      </>
    )
  }

  return (
    <QuestionProvider value={{ currentQuestion, handleAnswer, partialResults, currentAnswer }}>
      <div className="insurance-questions">
        <div className="progress-section">
          <div className="stages">
            {Object.keys(partialResults).map((stage, index) => (
              <div
                key={index}
                className={`stage ${currentQuestion.next_stage === stage ? 'active' : ''}`}
              >
                {stage.replace(/_/g, ' ')}
              </div>
            ))}
          </div>
          <div className="percentage">
            Estimated: <span>{percentage.toFixed(1)}%</span> Complete
          </div>
        </div>

        <div className="question-section">
          <div className="question-container">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentQuestion.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "tween", duration: 0.5 }}
                className="question"
              >
                <h2>{currentQuestion.next_stage}</h2>
                <p>{ lang === 'en' ? currentQuestion.question.en :  currentQuestion.question.fr}</p>
                {
                  currentQuestion?.api && currentQuestion?.type === 'multiple_select' 
                  ? 
                    <APIMultipleSelect api={currentQuestion?.api} /> 
                  :
                  currentQuestion?.api 
                  ? 
                    <APISelect api={currentQuestion?.api} /> 
                  : currentQuestion?.modal_form_select 
                  ? 
                    <ModalSelect handleAnswer={ handleAnswer } api={currentQuestion?.modal_form_select} currentQuestion={currentQuestion} /> 
                  : 
                    <QuestionOptions />
                }
              </motion.div>
            </AnimatePresence>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="navigation">
            <button className='question_previous_btn' onClick={goToPreviousQuestion} disabled={previousQuestions.length === 0}>
            <span className='button_arrow'><VscArrowLeft /></span> Previous Question
            </button>
            <button onClick={handleNextQuestion} disabled={currentAnswer === null}>
              Next Question <span className='button_arrow'><VscArrowRight /></span>
            </button>
          </div>
        </div>

        <div className="percentage mobile">
          Estimated: <span>{percentage.toFixed(1)}%</span> Complete
        </div>
      </div>
    </QuestionProvider>
  );
};




const APISelect = ({ api }) => {
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
    {/* 
      <select onClick={(e) => handleAnswer(e.target.value)}>
        {
          list.map(listItem => (
            <option key={listItem.value} value={listItem.value}>{listItem.value}</option> 
          ))
        }
      </select> */}

      <SearchableList list={list} onSelect={handleAnswer} />
    </div>
  )
}


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
    console.log('makeing request url', url);
    console.log('That current question', currentAnswer);
    
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





const QuestionOptions = () => {
  const context = useQuestionContext();
  const [lang, setLang] = useState('fr')

  useEffect(() => {
    setLang(i18next.language)
  }, [])

  if (!context || !context.currentQuestion) {
    return <div>Loading...</div>;
  }
  
  const { currentQuestion, handleAnswer, currentAnswer } = context;
  
  tabTitle(`Harpie Comparison Questions | ${ lang === 'en' ? currentQuestion?.question?.en : currentQuestion?.question?.fr }`)
  switch (currentQuestion.type) {
    case 'multiple_choice':
      return (
        <div className="options">
          <OptionButtons options={currentQuestion.choices} handleAnswer={handleAnswer} currentAnswer={currentAnswer} lang={lang} />
        </div>
      );
    case "multiple_choice_with_icon":
      return (
        <div className="options options_with_icon">
          {Array.isArray(currentQuestion.choices) ? currentQuestion.choices.map(choice => (
            <div
              key={choice.code}
              onClick={() => handleAnswer(choice.code)}
              className={` select_with_icon ${currentAnswer === choice.code ? 'selected' : ''}`}
            >
              <SVGIcon svgString={choice.icon} />
              <div className='text'>{ lang === 'en' ? choice.en : choice.fr }</div>
            </div>
          )) : <div>No options available</div>}
        </div>
      );
    case 'text':
      return (
        <div className="options">
          <input
            type="text"
            value={currentAnswer || ''}
            onChange={(e) => handleAnswer(e.target.value)}
            placeholder="Enter your answer"
          />
        </div>
      );
    case 'select':
      return (
        <div className="options">
          <select
            value={currentAnswer || ''}
            onChange={(e) => handleAnswer(e.target.value)}
          >
            <option value="">Select an option</option>
            {Array.isArray(currentQuestion.choices) ? currentQuestion.choices.map(choice => (
              <option key={choice.code} value={choice.code}>
                { lang === 'en' ? choice.en : choice.fr }
              </option>
            )) : null}
          </select>
        </div>
      );
    case 'number':
      return (
        <div className="options">
          <input
            type="number"
            value={currentAnswer || ''}
            onChange={(e) => handleAnswer(e.target.value)}
            placeholder="Enter a number"
          />
        </div>
      );
    case 'multiple_select':
      return (
       <MultipleSelect choices={currentQuestion.choices} />
      );
    // case 'date':
    //   return (
    //     <div className="options">
    //       <input
    //         type="date"
    //         value={currentAnswer || ''}
    //         onChange={(e) => handleAnswer(e.target.value)}
    //       />
    //     </div>
    //   );
    case 'date':
      return (
        <VehicleYearSelector onYearSelect={handleAnswer} />
      );
    case 'user_form_field':
      return (
        <UserForm />
      );
    default:
      return <div>Unsupported question type</div>;
  }
};

function parseSVG(svgString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, 'image/svg+xml');
  return doc.documentElement;
}


const SVGIcon = ({ svgString }) => {
  const svgElement = parseSVG(svgString);
  
  if (svgElement && svgElement.tagName === 'svg') {
    return <span dangerouslySetInnerHTML={{ __html: svgElement.outerHTML }} />;
  } 
  else {
    return <span>Icon</span>;
  }
}

export default InsuranceQuestions;
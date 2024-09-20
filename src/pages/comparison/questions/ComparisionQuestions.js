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
    }
  } 

  const formatKey = (key) => {
    return key.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  };

  if (!currentQuestion || !insuranceInfo) {
    return <div className='loader'></div>;
  }

  if (iscomplete) {
    return (
      <div className='comparison_filter_results'>

        {
          Object.entries(partialResults).map(([category, items]) => (
          <div key={category} className="mb-6">
            <h3 className="title">{formatKey(category)}</h3>
            <ul className="space-y-2">
              {Object.entries(items).map(([key, value]) => (
                <li key={key} className="insurance_list_partial_results">
                  <FaCheckCircle className="text-green-500 mr-2" />
                  <span className="font-medium">{formatKey(key)}:</span>
                  <span className="ml-2">{formatKey(value.toString())}</span>
                </li>
              ))}
            </ul>
          </div>
        ))
      }

        <button onClick={submit_insurance} className='submit'>Find my Insurance</button>
      </div>
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
    // return url.replace(/\{(\w+)\}/g, (match, variable) => {
    //   return data.hasOwnProperty(variable) ? data[variable] : match;
    // });
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

      <select onClick={(e) => handleAnswer(e.target.value)}>
        {
          list.map(listItem => (
            <option key={listItem.value} value={listItem.value}>{listItem.value}</option> 
          ))
        }
      </select>

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
    // return url.replace(/\{(\w+)\}/g, (match, variable) => {
    //   return data.hasOwnProperty(variable) ? data[variable] : match;
    // });
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


  const handleCheck = (event) => {
    let data = {
      ...checkedItems,
      [event.target.code]: event.target.checked
    }

    setCheckedItems({
      ...checkedItems,
      [event.target.id]: event.target.checked
    });
    handleAnswer(JSON.stringify(data));
  };


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
                onChange={handleCheck}
             />
              <label for={listItem.code}>{listItem.en}</label>
            </div>
          ))
        }
      </div>

    </div>
  )
}


const ModalSelect = ({ api, currentQuestion, handleAnswer }) => {
  const [list, setlist] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedOption, setSelectedOption] = useState(null)
  const [contentList, setContentList] = useState(null)

  useEffect(() => {
    fetch_data()
  }, [])

  const fetch_data = async () => {
    try {
      setLoading(true)
      const response = await axios.get(api)
      response.status === 200 && setlist(response.data?.results)
      const selected = response.data?.results.find(item => item.type === selectedOption)
      setContentList(selected)
      console.log(response.data);
    }
    catch (err) {
      setError('An error occurred while fetching the data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  const buttons = [
    "Basic Insurance",
    "Standard Insurance",
    "Premium Insurance"
  ]

  const handle_remove_modal = () => {
    setSelectedOption(null)
  }

  const update_selected_option = (option) => {
    console.log(option)
    setSelectedOption(option)
    const selected = list.find(item => item.type === option)
    setContentList(selected)
  }

  const confirm_option = () => {
    handleAnswer(selectedOption)
    handle_remove_modal()
  }
 
  return (
    <>
      <div className="options">
        {Array.isArray(currentQuestion.choices) ? currentQuestion.choices.map(choice => (
          <button
            key={choice.code}
            onClick={() => update_selected_option(choice.code)}
          >
            {choice.en}
          </button>
        )) : <div>No options available</div>}
      </div>

        {
          selectedOption && 
          <>
          <div className='insurance_modal_select'>
            <div className='modal_select'>
              { loading && <div className='Loader' />}
              <h2>Coverage details for your selected Insurance</h2>
              <div className='insurance_modal_buttons_wrapper'>
                {
                  list.map((listItem) => (
                    <button className={selectedOption === listItem?.type ? "selected": ""} key={listItem?.id} onClick={() => update_selected_option(listItem?.type)}>{listItem?.type} Insurance</button>
                  ))
                }
              </div>
              <div className='insurance_modal_select_contents'>
                <li className="insurance_list_partial_results">
                  <FaCheckCircle className="text-green-500 mr-2" />
                  <span className="font-medium">Supported Hospitals: </span>
                  <span className="ml-2">{ contentList?.public_hospitals && 'Public Hospitals' } { contentList?.para_public_hospitals && '- Para-public Hospitals ' } { contentList?.private_hospitals && '- Private Hospitals' }</span>
                </li>
                <li className="insurance_list_partial_results">
                  <FaCheckCircle className="text-green-500 mr-2" />
                  <span className="font-medium">Coverage Rate: </span>
                  <span className="ml-2">{ contentList?.coverage_rate }% </span>
                </li>
                <li className="insurance_list_partial_results">
                  { contentList?.consultation_general_practitioner ? <FaCheckCircle className="text-green-500 mr-2" /> : <FaTimesCircle className="text-green-500 mr-2" style={{ color: 'var(--red)' }} /> }
                  <span className="font-medium">General Consultation: </span>
                  <span className="ml-2" style={{ color: contentList?.consultation_general_practitioner ? 'var(--green)' :  'var(--red)' }}>{ contentList?.consultation_general_practitioner ? 'Avalaible' : 'Unavailable' }</span>
                </li>
                <li className="insurance_list_partial_results">
                  { contentList?.consultation_specialist ? <FaCheckCircle className="text-green-500 mr-2" /> : <FaTimesCircle className="text-green-500 mr-2" style={{ color: 'var(--red)' }} /> }
                  <span className="font-medium">Special Consultation: </span>
                  <span className="ml-2" style={{ color: contentList?.consultation_specialist ? 'var(--green)' :  'var(--red)' }}>{ contentList?.consultation_specialist ? 'Avalaible' : 'Unavailable' }  </span>
                </li>
                <li className="insurance_list_partial_results">
                  { contentList?.consultation_professor ? <FaCheckCircle className="text-green-500 mr-2" /> : <FaTimesCircle className="text-green-500 mr-2" style={{ color: 'var(--red)' }} /> }
                  <span className="font-medium">Expert Consultation: </span>
                  <span className="ml-2" style={{ color: contentList?.consultation_professor ? 'var(--green)' :  'var(--red)' }}>{ contentList?.consultation_professor ? 'Avalaible' : 'Unavailable' }  </span>
                </li>
                <li className="insurance_list_partial_results">
                  { contentList?.hospitalization ? <FaCheckCircle className="text-green-500 mr-2" /> : <FaTimesCircle className="text-green-500 mr-2" style={{ color: 'var(--red)' }} /> }
                  <span className="font-medium">Hospitalization: </span>
                  <span className="ml-2"  style={{ color: contentList?.hospitalization ? 'var(--green)' :  'var(--red)' }}>{ contentList?.hospitalization  ? 'Avalaible' : 'Unavailable' } </span>
                </li>
                <li className="insurance_list_partial_results">
                  { contentList?.nuclear_medicine ? <FaCheckCircle className="text-green-500 mr-2" /> : <FaTimesCircle className="text-green-500 mr-2" style={{ color: 'var(--red)' }} /> }
                  <span className="font-medium">Nuclear Medicine: </span>
                  <span className="ml-2" style={{ color: contentList?.nuclear_medicine ? 'var(--green)' :  'var(--red)' }}>{ contentList?.nuclear_medicine ? 'Avalaible' : 'Unavailable' } </span>
                </li>
                <li className="insurance_list_partial_results">
                  { contentList?.optics_every_two_years ? <FaCheckCircle className="text-green-500 mr-2" /> : <FaTimesCircle className="text-green-500 mr-2" style={{ color: 'var(--red)' }} /> }
                  <span className="font-medium">Optics once/2years: </span>
                  <span className="ml-2" style={{ color: contentList?.optics_every_two_years ? 'var(--green)' :  'var(--red)' }}>{ contentList?.optics_every_two_years ? 'Avalaible' : 'Unavailable' } </span>
                </li>
                <li className="insurance_list_partial_results">
                  { contentList?.speech_therapy ? <FaCheckCircle className="text-green-500 mr-2" /> : <FaTimesCircle className="text-green-500 mr-2" style={{ color: 'var(--red)' }} /> }
                  <span className="font-medium">Speech Therapy: </span>
                  <span className="ml-2" style={{ color: contentList?.speech_therapy ? 'var(--green)' :  'var(--red)' }}>{ contentList?.speech_therapy ? 'Avalaible' : 'Unavailable' } </span>
                </li>




              </div>

              <div className='insurance_list_selected_btn' onClick={confirm_option}>Select</div>

              <div onClick={handle_remove_modal} className='logout_modal_close'>
                <VscClose />
              </div>

            </div>
            

          </div>
          </>
        }
    </>
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
          {Array.isArray(currentQuestion.choices) ? currentQuestion.choices.map(choice => (
            <button
              key={choice.code}
              onClick={() => handleAnswer(choice.code)}
              className={currentAnswer === choice.code ? 'selected' : ''}
            >
              { lang === 'en' ? choice.en : choice.fr }
            </button>
          )) : <div>No options available</div>}
        </div>
      );
    case "multiple_choice_with_icon":
      return (
        <div className="options">
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
    case 'date':
      return (
        <div className="options">
          <input
            type="date"
            value={currentAnswer || ''}
            onChange={(e) => handleAnswer(e.target.value)}
          />
        </div>
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
    console.error('Failed to parse SVG:', svgString);
    return <span>Icon</span>;
  }
}

export default InsuranceQuestions;
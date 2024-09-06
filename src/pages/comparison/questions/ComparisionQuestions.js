import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './insurance_questions.css'
import { useLocation, useNavigate } from 'react-router-dom';
import useLocalStorage from '../../../lib/LocalStorage';
import { getRequest, postRequest, postRequestWithSession } from '../../../api';
import { QuestionProvider, useQuestionContext } from '../../../context/QuestionContext';
import axios from 'axios';

const API_MANAGER = [
  { insurance_type: 'life', estimated_questions: 18, base_url: '/life-insurance/comparison/stage/' },
  { insurance_type: 'health', estimated_questions: 4, base_url: '/health-insurance/comparison/stage/' },
  { insurance_type: 'vehicle', estimated_questions: 3, base_url: '/vehicles-inurance/comparison/stage/' },
  { insurance_type: 'home', estimated_questions: 5, base_url: '/home-insurance/comparison/stage/' },
  { insurance_type: 'business', estimated_questions: 7, base_url: '/business-insurance/comparison/stage/' },
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
  };

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

  if (!currentQuestion || !insuranceInfo) {
    return <div className='loader'></div>;
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
                <p>{currentQuestion.question.en}</p>
                { currentQuestion?.api ? <APISelect api={currentQuestion?.api} /> : <QuestionOptions /> }
              </motion.div>
            </AnimatePresence>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="navigation">
            <button className='question_previous_btn' onClick={goToPreviousQuestion} disabled={previousQuestions.length === 0}>
              Previous Question
            </button>
            <button onClick={handleNextQuestion} disabled={currentAnswer === null}>
              Next Question
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
  const context = useQuestionContext();
  
  useEffect(() => {
    fetch_data()    
  }, [])
  
  const fetch_data = async() => {
    const response = await axios.get('https://vehicles.harpiecm.com/api/all-marques')
    response.status === 200 && setlist(response.data)
  }

  const { currentQuestion, handleAnswer, currentAnswer } = context;

  return (
    <div className='options'>
      <select onClick={(e) => handleAnswer(e.target.value)}>
        {
          list.map(listItem => (
            <option value={listItem?.rappel_marque.toLowerCase()}>{ listItem.rappel_marque }</option>
          ))
        }
      </select>
      
    </div>
  )
}



const QuestionOptions = () => {
  const context = useQuestionContext();
  
  if (!context || !context.currentQuestion) {
    return <div>Loading...</div>;
  }

  const { currentQuestion, handleAnswer, currentAnswer } = context;

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
              {choice.en}
            </button>
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
                {choice.en}
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
    default:
      return <div>Unsupported question type</div>;
  }
};



export default InsuranceQuestions;
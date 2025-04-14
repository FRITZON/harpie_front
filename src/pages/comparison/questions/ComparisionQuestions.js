import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './insurance_questions.css'
import { redirect, useLocation, useNavigate } from 'react-router-dom';
import useLocalStorage from '../../../lib/LocalStorage';
import { getRequestWithSession, postRequestWithSessionNoAuth } from '../../../api';
import { QuestionProvider, useQuestionContext } from '../../../context/QuestionContext';
import { authenticatedPostRequestWithSession, postRequest, postRequestWithSession } from '../../../api';
import { FaCheckCircle } from 'react-icons/fa';
import { VscArrowRight, VscArrowLeft } from 'react-icons/vsc';
import UserForm from './components/UserForm';
import { tabTitle } from '../../..';
import i18next, { t } from 'i18next';
import OptionButtons from './components/OptionButtons';
import VehicleYearSelector from './components/VehicleYearSelector';
import MultipleSelect from './components/MultipleSelect';
import SidebarNavigation from './SelectNavigation';
import APIMultipleSelect from './components/APIMultipleSelect';
import LicensePlateNumber from './components/LicensePlateNumber';
import ModalSelect from './components/ModalSelect';
import APISelect from './components/APISelect';
import SearchableAPISelect from './components/SearchableAPISelect';
import PermitNumber from './components/PermitNumber';
import UserFormOther from './components/UserFormOther';
import LifeInsuranceInsureeForm from './components/life/LifeInsuranceInsureeForm';
import LifeInsuranceBeneficiaryForm from './components/life/LifeInsuranceBeneficiaryForm';
import AnimatedBackButton from '../../../components/AnimatedBackButton';
import AnimatedForwardButton from '../../../components/AnimatedForwardButton';

const API_MANAGER = [
  { insurance_type: 'death', estimated_questions: 11, base_url: '/death-insurance/comparison/stage/', complete_url: "/death-insurance/comparison/complete/", result_page: "/comparison/result/death" },
  { insurance_type: 'life', estimated_questions: 11, base_url: '/life-insurance/comparison/stage/', complete_url: "/life-insurance/comparison/complete/", result_page: "/comparison/result/life" },
  { insurance_type: 'health', estimated_questions: 15, base_url: '/health-insurance/comparison/stage/', complete_url: "/health-insurance/comparison/complete/", result_page: "/comparison/result/health" },
  { insurance_type: 'vehicle', estimated_questions: 10, base_url: '/vehicles-insurance/comparison/stage/', complete_url: "/vehicles-insurance/comparison/results/", result_page: "/comparison/result/vehicle" },
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
    const [currentQuestion, setCurrentQuestion] = useState([]);
    const [questionStack, setQuestionStack] = useState([]);
    const [previousQuestions, setPreviousQuestions] = useState([]);
    const [partialResults, setPartialResults] = useState({});
    const [direction, setDirection] = useState(0);
    const [error, setError] = useState(null);
    const [currentAnswer, setCurrentAnswer] = useState({});
    const [nextQuestionURL, setNextQuestionURL] = useState('')
    const [currentURL, setCurrentURL] = useState('')
    const [sessionID, setSessionID] = useState('');
    const [isComplete, setIsComplete] = useState(false);
    const [currentPosition, setCurrentPosition] = useState(1);
    const [progressBarIndex, setProgressBarIndex] = useState(0)
    const [is_loading, setIs_loading] = useState(false);
    const [nextStage, setNextStage] = useState(null);
    const [newResults, setNewResults] = useState({});

  

    const query = new URLSearchParams(location.search);
    const provided_session_id = query.get('session_id');
    //const provided_question_stage = query.get('question_stage');
    const provided_question_id = query.get('question_id');
    const insurance_type = query.get('insurance_type');
    const insuranceInfo = API_MANAGER.find(item => item.insurance_type === insurance_type);
    const [user] = useLocalStorage('user')
  

  const context = useQuestionContext();
  const [lang, setLang] = useState('fr')

  useEffect(() => {
    setLang(i18next.language)
  }, [])

    useEffect(() => {
      const savedState = loadFromStorage();
      if (savedState) {
        // restoreState(savedState);
      } else {
        const initialQuestion = location.state?.responseData;
        if (initialQuestion) {
          setCurrentQuestion(initialQuestion.questions);
          setNextQuestionURL(initialQuestion.current_stage);
          setCurrentURL(initialQuestion.current_stage);
          
          setPartialResults(initialQuestion.partial_results);
          initialQuestion?.session_id && setSessionID(initialQuestion?.session_id);
        } else {
          handleNextQuestion();
        }
      }
    }, [location.state]);
  
   
  

    useEffect(() => {
      if (provided_session_id && provided_question_id) {
        resumeSession(provided_session_id, provided_question_id);
      } 
      else {
        const initialQuestion = location.state?.responseData;
        if (initialQuestion) {
          setCurrentQuestion(initialQuestion.questions);
          setNextQuestionURL(initialQuestion.current_stage);
          setCurrentURL(initialQuestion.current_stage);
          setPartialResults( initialQuestion.partial_results);
          initialQuestion?.session_id && setSessionID(initialQuestion?.session_id);
        } else {
          handleNextQuestion();
        }
      }
  
      // Clear session when user leaves the page
      const handleBeforeUnload = () => {
        sessionStorage.removeItem('insuranceSession');
      };
  
      window.addEventListener('beforeunload', handleBeforeUnload);
  
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }, [location.state, provided_session_id, provided_question_id]);
  



  const resumeSession = async (session_id, question_id) => {
    try {
      const endpoint = `${insuranceInfo.base_url}/${question_id}/`;
      const response = await getRequestWithSession(session_id, endpoint);

      if (response.status === 200) {
        setSessionID(session_id);
        setCurrentQuestion(response.data.questions);
        setNextQuestionURL(response.data.current_stage);
        setPartialResults(response.data.partial_results);
        
      } else {
        throw new Error('Failed to resume session');
      }
    } catch (err) {
      setError('Failed to resume the session. Please start a new comparison.');
      console.error(err);
    }
  };

  
const handleAnswer = (answer) => {
  
  if (typeof answer !== 'object' || answer === null || Object.keys(answer).length === 0) {
      console.error('Invalid answer:', answer);
      return;
  }

  const questionId = Object.keys(answer)[0]; 
  const responseValue = answer[questionId]; 

  if (questionId === undefined || responseValue === undefined) {
      console.error('Question ID or response value is undefined:', { questionId, responseValue });
      return;
  }

  setCurrentAnswer(prev => ({
      ...prev,
      ...answer
  }));

  

  
  setPartialResults(prevResults => {
      const updatedResults = { ...prevResults };
      const currentStageResults = updatedResults[currentURL] || {};

      const newResults = {
          ...updatedResults,
          [currentURL]: {
              ...currentStageResults,
              [questionId]: responseValue
          },
      };

     
      return newResults;
  });

};




const goToPreviousQuestion = () => {
  if (nextQuestionURL === 'user_information') {
    setNextQuestionURL('vehicle_information');
  } else if (nextQuestionURL === 'user_info_end') {
    setNextQuestionURL('user_information');
  }
};  


  const handleNextQuestion = async () => {
    try {
        const endpoint = 
            nextQuestionURL === 'vehicle_information' 
            ? `${insuranceInfo.base_url}user_information/`
            : nextQuestionURL === 'user_information'
            ? `${insuranceInfo.base_url}user_info_end/`
            : nextQuestionURL === 'user_info_end'
            ? `${insuranceInfo.base_url}complete/`
            : `${insuranceInfo.base_url}complete/`;

        const combinedAnswers = { ...partialResults, ...currentAnswer };
        
        const response = await postRequestWithSessionNoAuth(sessionID, endpoint, { answers: combinedAnswers });

        console.log("Réponse de l'API de login :", response);
        if (response.status === 200 || response.status === 201) {
            if (response.data.stage === 'complete') {
              setIsComplete(true);
              setPartialResults(prev => ({ ...prev, ...currentAnswer }));
                // if (!user) {
                //     // L'utilisateur n'est pas connecté, redirigez vers la page de connexion
                //     navigate('/auth/login', { state: { redirect :true, session_id: sessionID, payload: partialResults, url: '/comparison/questions?insurance_type=vehicle' } });
                //     return;
                // }
            } else {
                setCurrentQuestion(response.data.questions);
                setNextQuestionURL(response.data.stage);
            }
        } else {
            throw new Error('Échec de la soumission des réponses');
        }
    } catch (err) {
        setError(err.message);
    }
};


  const handleValidate = () => {
    setIsComplete(true)
  }


  const updateSession = (stage) => {
   // jumpToSection(stage)
    setIsComplete(false)
  }

  const saveToStorage = () => {
    const stateToSave = {
      currentQuestion,
      //previousQuestions,
      partialResults,
      currentPosition,
      sessionID,
      nextQuestionURL,
      isComplete,
    };
    localStorage.setItem('insuranceQuestionsState', JSON.stringify(stateToSave));
    sessionStorage.setItem('insuranceQuestionsState', JSON.stringify(stateToSave));
  };

  const loadFromStorage = () => {
    const localState = localStorage.getItem('insuranceQuestionsState');
    const sessionState = sessionStorage.getItem('insuranceQuestionsState');
    return JSON.parse(localState || sessionState || 'null');
  };

  const restoreState = (savedState) => {
    setCurrentQuestion(savedState.currentQuestion);
    setPartialResults(savedState.partialResults);
    setCurrentPosition(savedState.currentPosition);
    setSessionID(savedState.sessionID);
    setNextQuestionURL(savedState.nextQuestionURL);
    setIsComplete(savedState.isComplete);
  };


  const submit_insurance = async () => {
    try {
      const response = await getRequestWithSession(sessionID, insuranceInfo?.complete_url);
      console.log(response);
  
      if (response?.status === 200 || response?.status === 202) {
        navigate(insuranceInfo?.result_page, { state: { result: response?.data, session_id: sessionID } });
      } else {
        throw new Error('Failed to submit insurance');
      }
    } catch (error) {
      console.error('Error submitting insurance:', error);
    }
  };


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
            <li onClick={() => updateSession(value)} key={nestedKey} className="insurance_list_partial_results">
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

  const renderCoverageType = (key, value) => {
    
    return (
      <li onClick={() => updateSession(key)} key={key} className="insurance_list_partial_results">
          <FaCheckCircle className="text-green-500 mr-2" />
          <div className='complete_key_value_flex'>
            <span className="font-medium">{t('partial_result.' + insurance_type + '.' + key)}:</span>
            <span className="ml-2">{t(value)}</span>
          </div>
      </li>
    );
    
  };

  if (isComplete) {
    return (
      <>
      <button onClick={submit_insurance} className='comparison_submit_btn'>Find my Insurance</button>
      <div className='comparison_filter_results'>

        {
          Object.entries(partialResults).map(([category, items]) => (
          <div className="comparison_result_card">
            <ul className="space-y-2">
              {Object.entries(items).map(([key, value]) => (
                <>
                    {  key === 'coverage_type'
                    ?  renderCoverageType(key, value)
                    : key === 'engine_power'
                    ? renderCoverageType(key, value)
                    : key === 'fuel_type'
                    ? renderCoverageType(key, value)
                    : key === 'private_vehicle_type'
                    ? renderCoverageType(key, value)
                    : key === 'vehicle_model'
                    ? renderCoverageType(key, value)
                    : key === 'vehicle_make'
                    ? renderCoverageType(key, value)
                    : key === 'vehicle_year'
                    ? renderCoverageType(key, value)
                    : key === 'usage_type'
                    ? renderCoverageType(key, value)
                    : key === 'transports_flammable'
                    ? renderCoverageType(key, value)
                    : key ==='registration_location'
                    ? renderCoverageType(key, value)
                    : key  === 'previous_insured'
                    ? renderCoverageType(key, value)
                    : key === 'previous_insurance_company'
                    ? renderCoverageType(key, value)
                    : key ==='needs_vignette'
                    ? renderCoverageType(key, value)
                    : key === 'has_trailer'
                    ? renderCoverageType(key, value)
                    : key === 'has_previous_claims'
                    ? renderCoverageType(key, value)
                    : key === 'previous_claims'
                    ? renderCoverageType(key, value)
                    :
                    null
                 
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
    <QuestionProvider value={{ currentQuestion, handleAnswer, partialResults, currentAnswer, newResults, lang}}>
    <div className="progress-bar">
      <div className="progress" style={{ width: `${(progressBarIndex + 1 ) * 100 / insuranceInfo.estimated_questions}%` }} />
    </div>
    <div className="insurance-questions">
      {/* <SidebarNavigation 
        insurance_type={insurance_type}
        sections={partialResults}
        currentStage={currentQuestion.next_stage}
        jumpToSection={jumpToSection}
        sessionID={sessionID}
        handleNextQuestion={handleNextQuestion}
        goToPreviousQuestion={goToPreviousQuestion}
        is_loading={is_loading}
        currentAnswer={currentAnswer}
      /> */}
      <div className="question-section">
  
      <AnimatePresence initial={false} custom={direction}>
{currentQuestion.map((question) => (
  <motion.div
    key={question.id}
    custom={direction}
    variants={variants}
    initial="enter"
    animate="center"
    exit="exit"
    transition={{ type: "tween", duration: 0.5 }}
    className="question-item"
  >
    <p className="question-text">
      {lang === 'en' ? question?.question?.en : question?.question?.fr}
    </p>

    {
      question?.api && question?.type === 'multiple_select' 
      ?
      <APIMultipleSelect 
      handleAnswer={(value) => handleAnswer({ [question.id]: value })} 
      api={question?.api} 
      questionId={question.id} 
    />
      :
      question?.api && question?.type === 'vehicle_permit_number' 
      ? 
        <PermitNumber api={question.api} user_inputs={partialResults} />
      :
      question?.api && question?.type === 'vehicle_registration_number' 
      ? 
        <LicensePlateNumber api={question.api} />
      :
      question?.api && question.id === 'vehicle_make'?
      <SearchableAPISelect 
    api={question?.api} 
    questionId={question.id}
    currentAnswer={currentAnswer}
    newResults = {newResults}
    lang = {lang}
/>:
      question?.api && question.id === 'vehicle_model'?
      <SearchableAPISelect 
    api={question?.api} 
    questionId={question.id} 
    currentAnswer={currentAnswer.vehicle_make}
    newResults = {newResults.vehicle_make}
    lang = {lang}
/>
: question?.api && question.id !== 'vehicle_make' && question.id !== 'vehicle_model'
      
      ?
      <SearchableAPISelect 
    api={question?.api} 
    questionId={question.id} 
    currentAnswer={currentAnswer}
    newResults = {newResults}
    lang = {lang}
/> 
      : question?.modal_form_select 
      ? 
        <ModalSelect handleAnswer={handleAnswer} api={question?.modal_form_select} currentQuestion={question} /> 
      : question?.type === 'multiple_choice' 
      ? (
        <div className="options">
          {Array.isArray(question.choices) && question.choices.length > 0 ? (
            <OptionButtons
              options={question.choices}
              handleAnswer={handleAnswer}
              selected={currentAnswer}
              lang={lang}
              questionId={question.id}
            />
          ) : (
            <div>No options available</div>
          )}
        </div>
      )
      : question?.type === 'multiple_choice_with_icon'  ?
      ( <div className="options options_with_icon">
                       {Array.isArray(question.choices) &&
                           question.choices.map((choice) => (
                             <div
                               key={choice.code}
                               onClick={() => handleAnswer(choice.code)}
                               className={`select_with_icon ${
                                 currentAnswer === choice.code ? 'selected' : ''
                               }`}
                             >
                               <SVGIcon svgString={choice.icon} />
                               <div className="text">{lang === 'en' ? choice.en : choice.fr}</div>
                             </div>
                           ))}
                       </div>): question ?.type === 'number' ?
                       (<div className="options">
                        <input
                        type="number"
                        value={currentAnswer[question.id] || ''}
                        onChange={(e) => handleAnswer({ [question.id]: e.target.value })}
                        placeholder={lang === 'en' ? 'Enter a number' : 'Entrez un nombre'}
                        />
                        </div>): question?.type === 'date' ?
                        (<VehicleYearSelector onYearSelect={(year) => handleAnswer({ [question.id]: year })} />): question?.type === 'user_form_field_other' ?
                        (<UserFormOther />): question?.type === 'user_form_field' ?
                        (<UserForm />): question?.type === 'text' ?
                        (<div className="options">
                                          <input
                                              type="text"
                                              value={currentAnswer[question.id] || ''}
                                              onChange={(e) => handleAnswer({ [question.id]: e.target.value })}
                                              placeholder={lang === 'en' ? 'Enter your answer' : 'Entrez votre réponse'}
                                            />
                                            </div>): question?.type === 'calendar' ?
       <QuestionOptions prev={partialResults}
       questionId={question.id} />:
       currentAnswer.has_previous_claims ==='yes' && question ?.type === 'textarea' ?
       (       
        <div className="options">
           <p className="question-text">
      {lang === 'en' ?  'If you had insurance claims, how many and for what reasons?' : 'Si vous avez eu des réclamations d\'assurance, combien et pour quelles raisons?'}
    </p>
          <textarea
            type="text"
            value={currentAnswer[question.id] || ''}
            onChange={(e) => handleAnswer({[question.id] : e.target.value})}
            placeholder={lang === 'en' ? 'Enter your answer' : 'Entrez votre réponse'}
          ></textarea>
        </div>
       ):
       question?.type === 'multiple_selects' ?
       <MultipleSelect choices={question.options} 
       handleAnswer={(value) => handleAnswer({ [question.id]: value })}
       questionId = {question.id}
       lang = {lang} />:
        question?.type === 'api_select' 
    }
  </motion.div>
))}
</AnimatePresence>
        {error && <div className="error-message">{error}</div>}

        <div className="navigation">
          <AnimatedBackButton onclick={goToPreviousQuestion} is_loading={false} disabled={currentPosition === 0} />
          <AnimatedForwardButton onclick={handleNextQuestion} is_loading={is_loading} disabled={currentAnswer === null} />
        </div>
      </div>
    </div>
  </QuestionProvider>
  );
};




const QuestionOptions = ({previous_answers, questionId}) => {
    const context = useQuestionContext();
    const [lang, setLang] = useState('fr');
  
    useEffect(() => {
      setLang(i18next.language);
    }, []);
  
    if (!context || !context.currentQuestion) {
      return <div>Loading...</div>;
    }
  
    const today = new Date().toISOString().split("T")[0];
  
    const getDateRestrictions = () => {
      const validity = previous_answers?.prev?.insurance_history?.claims_duration || 'expire_soon';
  
      if (validity === "expired") {
        return { max: today };
      } else if (validity === "just_started") {
        return { min: today };
      } else if (validity === "expire_soon") {
        return {};
      }
      return {};
    };
  
    const { currentQuestion, handleAnswer, currentAnswer } = context;
  
    tabTitle(`Harpie Comparison Questions | ${lang === 'en' ? 'Questions' : 'Questions'}`);
  
  
    return (
      <div className="questions-container">
        {
          <div  className="question-item">
            {/*  Display text-question*/}
            <p className="question-text">
              {lang === 'en' ? questionId?.question?.en : questionId?.question?.fr}
            </p>
  
            
              <div className="options">
                <input
                  type="date"
                  {...getDateRestrictions()}
                  onChange={(e) => handleAnswer({ [questionId]: e.target.value })}
                />
              </div>
            
         </div>
       }
     </div>
     );
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
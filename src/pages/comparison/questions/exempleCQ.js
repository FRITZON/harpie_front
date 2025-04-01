import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getRequestWithSession, postRequestWithSessionNoAuth } from '../../../api';
import './insurance_questions.css';

const API_MANAGER = [
  { insurance_type: 'vehicle', estimated_questions: 10, base_url: '/vehicles-insurance/comparison/start/', complete_url: "/vehicles-insurance/comparison/results/", result_page: "/comparison/result/vehicle" },
];

const InsuranceQuestions = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [sessionID, setSessionID] = useState('');
    const [currentStage, setCurrentStage] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const query = new URLSearchParams(location.search);
    const insurance_type = query.get('insurance_type');
    const insuranceInfo = API_MANAGER.find(item => item.insurance_type === insurance_type);

    useEffect(() => {
        fetchQuestions();
    }, [insuranceInfo]);

    const fetchQuestions = async () => {
        setIsLoading(true);
        try {
            const response = await getRequestWithSession(null, `${insuranceInfo.base_url}`);
            console.log("Réponse de l'API :", response); 
            if (response.status === 200 || response.status === 201) {
                setQuestions(response.data.questions); // Toutes les questions de l'étape
                setSessionID(response.data.session_id);
                setCurrentStage(response.data.current_stage); // Étape actuelle
            } else {
                throw new Error('Échec de la récupération des questions');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAnswerChange = (questionId, answer) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: answer,
        }));
    };

    const handleNextStage = async () => {
        try {
            const response = await postRequestWithSessionNoAuth(sessionID, `/vehicles-insurance/comparison/${currentStage}/`, { answers });
            if (response.status === 200 || response.status === 201) {
                if (response.data.stage === 'complete') {
                    navigate(insuranceInfo.result_page, { state: { session_id: sessionID } });
                } else {
                    setQuestions(response.data.questions); // Questions de l'étape suivante
                    setAnswers({}); // Réinitialiser les réponses
                    setCurrentStage(response.data.stage); // Passer à l'étape suivante
                }
            } else {
                throw new Error('Échec de la soumission des réponses');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const handlePreviousStage = () => {
        // Logique pour revenir à l'étape précédente si nécessaire
        console.log("Retour à l'étape précédente");
    };

    if (isLoading) {
        return <div className='loader'>Chargement...</div>;
    }

    if (error) {
        return <div className='error-message'>{error}</div>;
    }

    return (
        <div className="insurance-questions">
            <h2 className="form-title">Questions pour l'étape : {currentStage}</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleNextStage(); }} className="form-container">
                {questions.map((question) => (
                    <div key={question.id} className="form-group">
                        <label className="form-label">{question.question?.en || question.question?.fr}</label>
                        <QuestionOptions question={question} onChange={handleAnswerChange} />
                    </div>
                ))}
                <div className="navigation-buttons">
                    <button type="button" className="prev-button" onClick={handlePreviousStage}>Précédent</button>
                    <button type="submit" className="next-button">Suivant</button>
                </div>
            </form>
        </div>
    );
};

const QuestionOptions = ({ question, onChange }) => {
    const handleChange = (e) => {
        onChange(question.id, e.target.value);
    };

    switch (question.type) {
        case 'multiple_choice':
            if (!question.choices || !Array.isArray(question.choices) || question.choices.length === 0) {
                return <div className="no-choices">Aucun choix disponible pour cette question</div>;
            }
            return (
                <div className="options">
                    {question.choices.map(choice => (
                        <label key={choice.code} className="option-label">
                            <input
                                type="radio"
                                name={question.id}
                                value={choice.code}
                                onChange={handleChange}
                                className="radio-input"
                            />
                            {choice.label}
                        </label>
                    ))}
                </div>
            );
        case 'text':
            return (
                <input
                    type="text"
                    className="text-input form-control"
                    onChange={handleChange}
                    placeholder="Entrez votre réponse"
                />
            );
        case 'number':
            return (
                <input
                    type="number"
                    className="number-input form-control"
                    onChange={handleChange}
                    placeholder="Entrez un nombre"
                />
            );
        case 'calendar':
            return (
                <input
                    type="date"
                    className="date-input form-control"
                    onChange={handleChange}
                />
            );
        default:
            return <div className="unsupported-type">Type de question non pris en charge</div>;
    }
};

export default InsuranceQuestions;
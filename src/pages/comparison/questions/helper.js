const fetchNextQuestion = async (answer = null) => {
    setError(null);
    try {
        if (!insuranceInfo) {
            throw new Error("Invalid insurance type");
        }

        const endpoint = `${insuranceInfo.base_url}${
            nextQuestionURL ? nextQuestionURL + "/" : "personal_and_vehicle_info/"
        }`;
        const response = await postRequestWithSession(sessionID, endpoint, {answers: answer});

        if (response.status === 200) {
            if (response.data?.next_stage === "complete") {
                setIsComplete(true);
            }

            // This is to handle the case where the user goes back to a previous question and then answers it again
            const currentIndex = questionStack.findIndex(
                (q) => q.id === currentQuestion.id
            );

            let nextQuestion;
            if (currentIndex !== -1 && currentIndex < questionStack.length - 1) {
                // If the user goes back to a previous question and then answers it again
                nextQuestion = questionStack[currentIndex + 1];
                setCurrentPosition(currentIndex + 1);
                setCurrentQuestion(nextQuestion);
            } else {
                // If the user answers the current question and moves to the next question
                nextQuestion = response.data?.question;
                response.data?.question && setCurrentQuestion(response.data?.question);
                setQuestionStack((prev) => [...prev, nextQuestion]);
                setCurrentPosition(questionStack.length);
            }

            setNextQuestionURL(response.data.next_stage);
            setCurrentURL(response.data.next_stage);
            setPartialResults(response.data.partial_results);
            setDirection(1);
            setCurrentAnswer(null);
            response.data?.session_id && setSessionID(response.data.session_id);
        } else {
            throw new Error("Failed to fetch next question");
        }
    } catch (err) {
        setError("Failed to fetch the next question. Please try again.");
        console.error(err);
    }
};


/**
 * This function is used to jump to a specific question
 * @param {String } question the question id to jump to
 */
const jumpToSection = (question) => {
    let index = questionStack.findIndex((q) => q.id === question);

    if (index < 0) {
        index = 0;
    }
    const newCurrent = questionStack[index];
    setCurrentQuestion(newCurrent);
};


/**
 * Save the current state to local storage and session storage
 * @description This is used to save the current state of the application to local storage
 */
const saveToStorage = () => {
    const stateToSave = {
        currentQuestion,
        previousQuestions,
        partialResults,
        currentPosition,
        sessionID,
        nextQuestionURL,
        isComplete,
    };
    localStorage.setItem("insuranceQuestionsState", JSON.stringify(stateToSave));
    sessionStorage.setItem("insuranceQuestionsState",JSON.stringify(stateToSave));
};

/**
 * This function is used to load the state from local storage or session storage
 * @returns the state from local storage or session storage
 * @description After data is saved to local storage, it can be loaded back to the application
 */
const loadFromStorage = () => {
    const localState = localStorage.getItem("insuranceQuestionsState");
    const sessionState = sessionStorage.getItem("insuranceQuestionsState");
    return JSON.parse(localState || sessionState || "null");
};

/**
 * This function is used to handle the next question
 * @description This function is called when next button is pressed to move to the next question
 */
const handleNextQuestion = () => {
    if (currentAnswer !== null) {
        fetchNextQuestion({ [currentQuestion.id]: currentAnswer });
    }
};

/**
 * This function is used to handle the previous question
 * @description This function is called when the previous button is pressed to move to the previous question
 */
const goToPreviousQuestion = () => {
    if (currentPosition > 0) {
        setCurrentPosition(currentPosition - 1);
        setCurrentQuestion(questionStack[currentPosition - 1]);
        setDirection(-1);
    }
};

/**
 * This function saved the answer to the current question for all questions in all insurances
 * @param {String} answer the answer to the current question
 * @description It works using an insurance context that is called from any component
 */
const handleAnswer = (answer) => {
    setCurrentAnswer(answer);
};

/**
 * Handle animations from one question to the next
 * @param {String} direction animates percentage on mobile
 * @description This function is used to animate the percentage on mobile
 */
const animatePercentage = (targetPercentage) => {
    const duration = 500;
    const steps = 20;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const stepSize = (targetPercentage - percentage) / steps;

    const intervalId = setInterval(() => {
        if (currentStep < steps) {
            setPercentage((prevPercentage) => {
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


/**
 * This function is used to resume a session
 * @param {String} provided_session_id the session id to resume
 * @param {String} provided_question_stage the question stage to resume
 * @param {String} provided_question_id the question id to resume
 * @description This function is used to resume a session from a previous state, it it called when any of the parameters change
 */
useEffect(() => {
    if (provided_session_id && provided_question_stage && provided_question_id) {
        resumeSession(
            provided_session_id,
            provided_question_stage,
            provided_question_id
        );
    } else {
        const initialQuestion = location.state?.responseData;
        if (initialQuestion) {
            setCurrentQuestion(initialQuestion.question);
            setNextQuestionURL(initialQuestion.current_stage);
            setCurrentURL(initialQuestion.current_stage);
            setPartialResults(initialQuestion.partial_results || {});
            initialQuestion?.session_id && setSessionID(initialQuestion?.session_id);
        } else {
            fetchNextQuestion();
        }
    }

    // Clear session when user leaves the page
    const handleBeforeUnload = () => {
        sessionStorage.removeItem("insuranceSession");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
    };
}, [location.state, provided_session_id,provided_question_stage,provided_question_id]);


/**
 * This function is used to save the state to browser storage
 * @description This function is called when the current question, previous questions, partial results, current position change
 * It saves the current state to browser storage (local storage and session storage)
 */
useEffect(() => {
    saveToStorage();
}, [currentQuestion, previousQuestions, partialResults, currentPosition]);

/**
 * This function listens to the current question and insurance info and animates the percentage
 */
useEffect(() => {
    if (currentQuestion && insuranceInfo) {
        const currentIndex = previousQuestions.length;
        const targetPercentage = Math.min(
        ((currentIndex + 1) / insuranceInfo.estimated_questions) * 100,
        100
        );
        animatePercentage(targetPercentage);
    }
}, [currentQuestion, previousQuestions, insuranceInfo]);


/**
 * When user loads this page, it listens for the language change to update question display language
 */
useEffect(() => {
    setLang(i18next.language);
}, []);



/**
 * This function listens to the location state and fetches questions that match the insurance
 * @param {String} location the answer to the current question
 */
useEffect(() => {
    const savedState = loadFromStorage();
    if (savedState) {
        // restoreState(savedState);
    } else {
        const initialQuestion = location.state?.responseData;
        if (initialQuestion) {
            setCurrentQuestion(initialQuestion.question);
            setNextQuestionURL(initialQuestion.current_stage);
            setCurrentURL(initialQuestion.current_stage);
            setPartialResults(initialQuestion.partial_results || {});
        initialQuestion?.session_id && setSessionID(initialQuestion?.session_id);
        } else {
            fetchNextQuestion();
        }
  }
}, [location.state]);

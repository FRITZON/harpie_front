import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './insurance_questions.css'

const questions = [
  { id: 1, category: "Personal Info", question: "What is your age?" },
  { id: 2, category: "Personal Info", question: "What is your occupation?" },
  { id: 3, category: "Health", question: "Do you have any pre-existing conditions?" },
  { id: 4, category: "Health", question: "How often do you exercise?" },
  { id: 5, category: "Assets", question: "Do you own a home?" },
  { id: 6, category: "Assets", question: "What is the estimated value of your personal belongings?" },
];

const InsuranceQuestions = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const targetPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
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
  }, [currentQuestionIndex]);

  
  /**
   * @description Transition from current to the next question
   */
  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setDirection(1);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };


  /**
   * @description Go to the previous question
   */
  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setDirection(-1);
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

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

  const uniqueCategories = Array.from(new Set(questions.map(q => q.category)));
  const currentCategory = questions[currentQuestionIndex].category;

  return (
    <div className="insurance-questions">

      <div className="progress-section">
        <div className="stages">
          {uniqueCategories.map((category, index) => (
            <div 
              key={index} 
              className={`stage ${category === currentCategory ? 'active' : ''}`}
            >
              {category}
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
              key={currentQuestionIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "tween", duration: 0.5 }}
              className="question"
            >
              <h2>{questions[currentQuestionIndex].category}</h2>
              <p>{questions[currentQuestionIndex].question}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="navigation">
          <button className='question_previous_btn' onClick={goToPreviousQuestion} disabled={currentQuestionIndex === 0}>Previous Question</button>
          <button onClick={goToNextQuestion} disabled={currentQuestionIndex === questions.length - 1}>Next Question</button>
        </div>

      </div>



      <div className="percentage mobile">
          Estimated: <span>{percentage.toFixed(1)}%</span> Complete
      </div>
    </div>
  );
};

export default InsuranceQuestions;
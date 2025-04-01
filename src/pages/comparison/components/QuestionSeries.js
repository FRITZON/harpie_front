import React from 'react';
import QuestionComponent from './QuestionComponent';

const QuestionSeries = ({ questions, onAnswer, currentAnswers }) => {
  return (
    <div className="question-series">
      {questions.map(question => (
        <QuestionComponent
          key={question.id}
          question={question}
          onAnswer={onAnswer}
          currentAnswer={currentAnswers[question.id]}
        />
      ))}
    </div>
  );
};

export default QuestionSeries;
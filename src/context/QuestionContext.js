import React, { createContext, useContext } from 'react';

const QuestionContext = createContext();

export const useQuestionContext = () => useContext(QuestionContext);

export const QuestionProvider = ({ children, value }) => (
  <QuestionContext.Provider value={value}>
    {children}
  </QuestionContext.Provider>
);
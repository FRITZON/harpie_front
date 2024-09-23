import React, { useState } from "react";

const OptionButtons = ({ options, selected, handleAnswer, lang }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (option) => {
    setSelectedOption(option?.code);
    handleAnswer(option.code);
  };
  return (
    <div className="cpo-container">
      {options.map((option) => (
        // <button
        //   key={option}
        //   className={`option-button ${selected === option ? 'selected' : ''}`}
        //   onClick={() => handleAnswer(option.code)}
        // >
        //   { lang === 'en' ? option.en : option.fr }
        // </button>
        <label
          key={option?.code}
          style={{ backgroundColor: option?.color && option?.color }}
          className={`cpo-option ${
            selectedOption === option?.code ? "cpo-selected" : ""
          }`}
        >
          <div className="cpo-content">
            <div className="cpo-title">
              <span>{lang === "en" ? option.en : option.fr}</span>
            </div>
          </div>
          <div className="cpo-check-container">
            <input
              id={option?.code}
              className="cpo-hidden"
              type="checkbox"
              checked={selectedOption === option?.code}
              onChange={() => handleOptionChange(option)}
            />
            <label className="cpo-checkbox" htmlFor={option?.code}></label>
          </div>
        </label>
      ))}
    </div>
  );
};

export default OptionButtons;

const OptionButtonss = () => {
  return <div className="cpo-container"></div>;
};

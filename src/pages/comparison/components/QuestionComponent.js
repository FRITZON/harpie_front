import React from 'react';
import MultipleSelect from '../questions/components/MultipleSelect';
import UserForm from '../questions/components/UserForm';
import UserFormOther from '../questions/components/UserFormOther';
import LifeInsuranceInsureeForm from '../questions/components/life/LifeInsuranceInsureeForm';
import LifeInsuranceBeneficiaryForm from '../questions/components/life/LifeInsuranceBeneficiaryForm';
import VehicleYearSelector from '../questions/components/VehicleYearSelector';

const QuestionComponent = ({ question, onAnswer, currentAnswer }) => {
  const handleChange = (e) => {
    onAnswer(question.id, e.target.value);
  };

  return (
    <div className="question">
      <p>{question.question.en}</p>
      {question.type === 'text' && (
        <input type="text" value={currentAnswer || ''} onChange={handleChange} />
      )}
      {question.type === 'multiple_choice' && (
        <select value={currentAnswer || ''} onChange={handleChange}>
          <option value="">Select an option</option>
          {question.choices.map(choice => (
            <option key={choice.code} value={choice.code}>
              {choice.en}
            </option>
          ))}
        </select>
      )}
      {question.type === 'multiple_choice_with_icon' && (
        <div className="options options_with_icon">
          {Array.isArray(question.choices) ? question.choices.map(choice => (
            <div
              key={choice.code}
              onClick={() => handleChange({ target: { value: choice.code } })}
              className={`select_with_icon ${currentAnswer === choice.code ? 'selected' : ''}`}
            >
              <SVGIcon svgString={choice.icon} />
              <div className='text'>{choice.en}</div>
            </div>
          )) : <div>No options available</div>}
        </div>
      )}
      {question.type === 'textarea' && (
        <textarea
          value={currentAnswer || ''}
          onChange={handleChange}
          placeholder="Enter your answer"
        ></textarea>
      )}
      {question.type === 'select' && (
        <select value={currentAnswer || ''} onChange={handleChange}>
          <option value="">Select an option</option>
          {Array.isArray(question.choices) ? question.choices.map(choice => (
            <option key={choice.code} value={choice.code}>
              {choice.en}
            </option>
          )) : null}
        </select>
      )}
      {question.type === 'number' && (
        <input
          type="number"
          value={currentAnswer || ''}
          onChange={handleChange}
          placeholder="Enter a number"
        />
      )}
      {question.type === 'multiple_select' && (
        <MultipleSelect choices={question.choices} />
      )}
      {question.type === 'calendar' && (
        <input type='date' onChange={handleChange} />
      )}
      {question.type === 'date' && (
        <VehicleYearSelector onYearSelect={handleChange} />
      )}
      {question.type === 'user_form_field_other' && (
        <UserFormOther />
      )}
      {question.type === 'life_insuree_form' && (
        <LifeInsuranceInsureeForm />
      )}
      {question.type === 'life_beneficiary_form' && (
        <LifeInsuranceBeneficiaryForm />
      )}
      {question.type === 'user_form_field' && (
        <UserForm />
      )}
      {/* Ajoutez d'autres types de questions ici */}
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
  } else {
    return <span>Icon</span>;
  }
}

export default QuestionComponent;
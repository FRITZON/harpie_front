

import React, { useState } from 'react';
import { DOBPicker } from '../../../../Insurance/results_tab/DOBPicker';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../../../../../lib/LocalStorage';
import { postRequestWithSession } from '../../../../../api';



const RegistrationForm = ({ onNext, onBack, formData, setFormData }) => {
  const questions = [
    {
      id: 'have_registration_document',
      question: 'Is the insuree the owner of this registration document?',
      type: 'multiple_choice',
      choices: [
        { code: 'yes', label: 'Yes' },
        { code: 'no', label: 'No' }
      ]
    },
    {
      id: 'personal_vehicle',
      question: 'Select what closely resembles your vehicle here?',
      type: 'multiple_choice',
      choices: [
        { code: 'moto', label: 'Motocycle' },
        { code: 'simple', label: 'Simple' }
      ]
    },
    {
      id: 'needs_vignette',
      question: 'Do you have "vignette" (road tax sticker) for your vehicle?',
      type: 'multiple_choice',
      choices: [
        { code: 'yes', label: 'Yes' },
        { code: 'no', label: 'No' }
      ]
    }
  ];

  return (
    <div className="form-section">
      <h2>Registration Details</h2>
      {questions.map((q) => (
        <div key={q.id} className="question-box">
          <label>{q.question}</label>
          <div className="options">
            {q.choices.map((choice) => (
              <label key={choice.code} className="option-label">
                <input
                  type="radio"
                  name={q.id}
                  value={choice.code}
                  checked={formData[q.id] === choice.code}
                  onChange={(e) => setFormData({ ...formData, [q.id]: e.target.value })}
                />
                    <span style={{paddingLeft: '20px'}}>{choice.label}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
      <div className="button-group">
        <button onClick={onBack}>Back</button>
        <button onClick={onNext}>Next Question</button>
      </div>
    </div>
  );
};

const InsuranceAdditionalQuestionForm = ({ onSubmit, onBack, formData, setFormData }) => {
  const questions = [
    {
        id: 'location',
        question: 'Where does the insuree live?',
        type: 'selection'
    },
    {
      id: 'pre_existing_conditions',
      question: 'Do you have any pre-existing medical conditions?',
      type: 'multiple_choice',
      choices: [
        { code: 'yes', label: 'Yes' },
        { code: 'no', label: 'No' }
      ]
    },
    {
        id: 'pre_existing_conditions_details',
        question: 'If yes, please tell us about it so we can adjust your insurance',
        type: 'textarea',
        showIf: (data) => data.pre_existing_conditions === 'yes'
    },
    {
      id: 'has_previous_claims',
      question: 'Are there any specific services or treatments you want covered that aren\'t listed?',
      type: 'multiple_choice',
      choices: [
        { code: 'yes', label: 'Yes' },
        { code: 'no', label: 'No' }
      ]
    },
    {
      id: 'previous_claims',
      question: 'If yes please tell us about it so we can adjust your insurance',
      type: 'textarea',
      showIf: (data) => data.has_previous_claims === 'yes'
    }
  ];

  return (
    <div className="form-section">
      <h2>Insurance Requirements</h2>
      {questions.map((q) => {
        if (q.showIf && !q.showIf(formData)) return null;
        
        return (
          <div key={q.id} className="question-box">
            <label>{q.question}</label>
            {q.type === 'textarea' ? (
              <textarea
                value={formData[q.id] || ''}
                onChange={(e) => setFormData({ ...formData, [q.id]: e.target.value })}
                rows="4"
              />
            ) 
            :
            q.type === 'selection'
            ?
            (
                <select className='select' value={formData[q.id] || ''} onChange={(e) => setFormData({ ...formData, [q.id]: e.target.value })}>
                    <option value="">Select an option</option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                </select>
            ) : (
              <div className="options">
                {q.choices.map((choice) => (
                  <label key={choice.code} className="option-label">
                    <input
                      type="radio"
                      name={q.id}
                      value={choice.code}
                      checked={formData[q.id] === choice.code}
                      onChange={(e) => setFormData({ ...formData, [q.id]: e.target.value })}
                    />
                    <span style={{paddingLeft: '20px'}}>{choice.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        );
      })}
      <div className="button-group">
        <button onClick={onBack}>Back</button>
        <button onClick={onSubmit}>Submit Request</button>
      </div>
    </div>
  );
};




const UserInformationForm = ({ onNext, onBack, formData, setFormData }) => {
  return (
    <div className="form-section">
      <h2>Insuree Personal Information</h2>
      
      <div className="question-box">
        <label>Full Name</label>
        <div className="user-info-input-wrapper">
          <input
            type="text"
            value={formData.full_name || ''}
            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
            className="user-info-text-input"
            placeholder="Enter your full name"
          />
        </div>
      </div>

      <div className="question-box">
        <label>Gender</label>
        <div className="options">
          {[
            { code: 'male', label: 'Male' },
            { code: 'female', label: 'Female' }
          ].map((choice) => (
            <label key={choice.code} className="option-label">
              <input
                type="radio"
                name="gender"
                value={choice.code}
                checked={formData.gender === choice.code}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              />
              <span style={{paddingLeft: '20px'}}>{choice.label}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div className="question-box">
        <label>Age group</label>
        <div className="options">
          {[
            { code: 'child', label: 'Child' },
            { code: 'adult', label: 'Adult (18+ years)' }
          ].map((choice) => (
            <label key={choice.code} className="option-label">
              <input
                type="radio"
                name="gender"
                value={choice.code}
                checked={formData.gender === choice.code}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              />
              <span style={{paddingLeft: '20px'}}>{choice.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="question-box">
        <label>Date of Birth</label>
        <DOBPicker
          value={formData.dob}
          onChange={(date) => setFormData({ ...formData, dob: date })}
        />
      </div>

      <div className="question-box">
        <label>Profession</label>
        <div className="user-info-input-wrapper">
          <input
            type="text"
            value={formData.profession || ''}
            onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
            className="user-info-text-input"
            placeholder="Enter your profession"
            list="professions"
          />
          <datalist id="professions">
            <option value="Engineer" />
            <option value="Doctor" />
            <option value="Teacher" />
            <option value="Student" />
            <option value="Business" />
          </datalist>
        </div>
      </div>

      <div className="question-box">
        <label>Phone Number</label>
        <div className="user-info-input-wrapper">
          <input
            type="tel"
            value={formData.phone_number || ''}
            onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
            className="user-info-text-input"
            placeholder="Enter your phone number"
          />
        </div>
      </div>

      <div className="question-box">
        <label>Address</label>
        <textarea
          value={formData.address || ''}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          placeholder="Enter your full address"
          className="user-info-textarea"
          rows="3"
        />
      </div>

      <div className="button-group">
        <button onClick={onBack}>Back</button>
        <button onClick={onNext}>Next Question</button>
      </div>
    </div>
  );
};


const HealthInsuranceProcedureQuestions = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [comparison, setComparison] = useLocalStorage('insuranceQuestionsState',)
  const navigation = useNavigate()


  const handleSubmit = async() => {

    if (!comparison?.sessionID) {
      alert('No pending comparison session found');
      console.warn('Session ID not found');
      navigation('/my-insurances'); 
      return;
    }
    const  response = await postRequestWithSession(comparison.sessionID, '/health/comparison/subscriber-info/', formData);
    
    if (response.status === 200) {
      setComparison(null);
      navigation('/my-insurances');
    }
  };
  const handleNextStep = (step) => {
    setStep(step)
    window.scrollTo(0, 0);
  }

  const steps = [
    <UserInformationForm onNext={() => handleNextStep(1)} formData={formData} setFormData={setFormData} />,
    <InsuranceAdditionalQuestionForm onSubmit={handleSubmit} onBack={() => handleNextStep(0)} formData={formData} setFormData={setFormData} />
  ];

  return (
    <>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${(step + 1) * 50}%` }} />
      </div>
    <div className="futher-question-insurance-form">
      {steps[step]}
    </div>
    </>
  );
};

export default HealthInsuranceProcedureQuestions;
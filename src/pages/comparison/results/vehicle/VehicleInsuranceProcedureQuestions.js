import { useNavigate } from 'react-router-dom';
import { postRequestWithSession } from '../../../../api';
import useLocalStorage from '../../../../lib/LocalStorage';
import { DateRangePicker } from '../../../Insurance/results_tab/DateRangePicker';
import { DOBPicker } from '../../../Insurance/results_tab/DOBPicker';
import './VehicleInsuranceProcedureQuestions.css';


import React, { useState } from 'react';

const VehicleUsageForm = ({ onNext, formData, setFormData }) => {
  const questions = [
    {
      id: 'regular_drivers',
      question: 'How many drivers will be using this vehicle regularly?',
      type: 'multiple_choice',
      choices: [
        { code: '1', label: '1' },
        { code: '2', label: '2' },
        { code: '3', label: '3' },
        { code: '4', label: '4' },
        { code: 'plus_4', label: 'Above 4' },
      ]
    },
    {
      id: 'has_trailer',
      question: 'Do you have a trailer for this vehicle?',
      type: 'multiple_choice',
      choices: [
        { code: 'yes', label: 'Yes' },
        { code: 'no', label: 'No' }
      ]
    },
    {
      id: 'transport_flammable',
      question: 'Do you transport flammable materials?',
      type: 'multiple_choice',
      choices: [
        { code: 'yes', label: 'Yes' },
        { code: 'no', label: 'No' }
      ]
    }
  ];

  return (
    <div className="form-section">
      <h2>Vehicle Usage</h2>
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
      <button onClick={onNext}>Next Question</button>
    </div>
  );
};

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

const InsuranceHistoryForm = ({ onNext, onBack, formData, setFormData }) => {
  const questions = [
    {
      id: 'previously_insured',
      question: 'Has this vehicle been insured before?',
      type: 'multiple_choice',
      choices: [
        { code: 'yes', label: 'Yes' },
        { code: 'no', label: 'No' }
      ]
    },
    {
      id: 'has_previous_claims',
      question: 'Have you made any insurance claims in the past?',
      type: 'multiple_choice',
      choices: [
        { code: 'yes', label: 'Yes' },
        { code: 'no', label: 'No' }
      ]
    },
    {
      id: 'previous_claims',
      question: 'If you had insurance claims, how many and for what reasons?',
      type: 'textarea',
      showIf: (data) => data.has_previous_claims === 'yes'
    }
  ];

  return (
    <div className="form-section">
      <h2>Insurance History</h2>
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
        <button onClick={onNext}>Next Question</button>
      </div>
    </div>
  );
};

const CoverageForm = ({ onBack, onSubmit, formData, setFormData }) => {
  const questions = [
    {
      id: 'coverage_type',
      question: 'What type of coverage are you interested in?',
      type: 'multiple_choice',
      choices: [
        { code: 'rc_rti', label: 'Civil Liability, Third-Party Fire and Theft' },
        { code: 'rc_dr', label: 'Civil Liability, Defense and Recourse' },
        { code: 'rc_dr_acp', label: 'Civil Liability, Defense and Recourse, for Driver and Passenger Insurance' },
        { code: 'all_risk', label: 'Cover all risks incurred' }
      ]
    },
    {
      id: 'coverage_options',
      question: 'Which additional coverages are you interested in?',
      type: 'multiple_select',
      choices: [
        { code: 'transported_persons', label: 'Individual Transported Persons' },
        { code: 'accidental_death', label: 'Accidental Death' },
        { code: 'disability', label: 'Disability (Partial/Total)' },
        { code: 'medical_expenses', label: 'Medical and Pharmaceutical Expenses' }
      ]
    },
    {
      id: 'insurance_duration',
      question: 'Please select the duration of your insurance',
      type: 'multiple_choice',
      choices: [
        { code: '1_year', label: '1 year' },
        { code: '6_months', label: '6 months' },
        { code: '4_months', label: '4 months' },
        { code: '2_months', label: '2 months' }
      ]
    }
  ];

  return (
    <div className="form-section">
      <h2>Coverage Options</h2>
      {questions.map((q) => (
        <div key={q.id} className="question-box">
          <label>{q.question}</label>
          {q.type === 'multiple_select' ? (
            <div className="options">
              {q.choices.map((choice) => (
                <label key={choice.code} className="option-label">
                  <input
                    type="checkbox"
                    name={q.id}
                    value={choice.code}
                    checked={formData[q.id]?.includes(choice.code)}
                    onChange={(e) => {
                      const currentValues = formData[q.id] || [];
                      const newValues = e.target.checked
                        ? [...currentValues, choice.code]
                        : currentValues.filter(v => v !== choice.code);
                      setFormData({ ...formData, [q.id]: newValues });
                    }}
                  />
                    <span style={{paddingLeft: '20px'}}>{choice.label}</span>
                </label>
              ))}
            </div>
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
      ))}
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
      <h2>Personal Information</h2>
      
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


const VehicleInsuranceProcedureQuestions = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [comparison, setComparison] = useLocalStorage('insuranceQuestionsState',)
  const navigation = useNavigate();

  const handleSubmit = async() => {

    if (!comparison?.sessionID) {
      alert('No pending comparison session found');
      console.warn('Session ID not found');
      navigation('/my-insurances'); 
      return;
    }
    const  response = await postRequestWithSession(comparison.sessionID, '/vehicles/comparison/subscriber-info/', formData);
    
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
    <VehicleUsageForm onNext={() => handleNextStep(1)} formData={formData} setFormData={setFormData} />,
    <RegistrationForm onNext={() => handleNextStep(2)} onBack={() => handleNextStep(0)} formData={formData} setFormData={setFormData} />,
    <InsuranceHistoryForm onNext={() => handleNextStep(3)} onBack={() => handleNextStep(1)} formData={formData} setFormData={setFormData} />,
    <UserInformationForm onNext={() => handleNextStep(4)} onBack={() => handleNextStep(2)} formData={formData} setFormData={setFormData} />,
    <CoverageForm onBack={() => handleNextStep(3)} onSubmit={handleSubmit} formData={formData} setFormData={setFormData} />
  ];

  return (
    <>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${(step + 1) * 25}%` }} />
      </div>
    <div className="futher-question-insurance-form">
      {steps[step]}
    </div>
    </>
  );
};

export default VehicleInsuranceProcedureQuestions;
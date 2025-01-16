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

const VehicleInsuranceProcedureQuestions = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  const steps = [
    <VehicleUsageForm onNext={() => setStep(1)} formData={formData} setFormData={setFormData} />,
    <RegistrationForm onNext={() => setStep(2)} onBack={() => setStep(0)} formData={formData} setFormData={setFormData} />,
    <InsuranceHistoryForm onNext={() => setStep(3)} onBack={() => setStep(1)} formData={formData} setFormData={setFormData} />,
    <CoverageForm onBack={() => setStep(2)} onSubmit={handleSubmit} formData={formData} setFormData={setFormData} />
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
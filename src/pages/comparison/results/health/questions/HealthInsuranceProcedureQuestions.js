import React, { useEffect, useState } from 'react';
import { DOBPicker } from '../../../../Insurance/results_tab/DOBPicker';
import { useLocation, useNavigate } from 'react-router-dom';
import useLocalStorage from '../../../../../lib/LocalStorage';
import { authenticatedPostRequestWithSession, postRequestWithSession } from '../../../../../api';



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

const InsuranceAdditionalQuestionForm = ({ onSubmit, onBack, formData, setFormData, isLoading }) => {
  const questions = [
    // {
    //     id: 'location',
    //     question: 'Where does the insuree live?',
    //     type: 'textarea'
    // },
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
      id: 'illness_list',
      question: 'Please list all the illnesses you have',
      type: 'select',
      options: [
        { code: 'paludisme', label: 'Paludisme' },
        { code: 'hypertension', label: 'Hypertension' },
        { code: 'asthme', label: 'Asthme' },
        { code: 'typhoide', label: 'Typhoïde' },
        { code: 'bronchite', label: 'Bronchite' },
        { code: 'meningite', label: 'Méningite' },
        { code: 'insuffisance_renale', label: 'Insuffisance rénale' },
        { code: 'epilepsie', label: 'Épilepsie' },
        { code: 'diabete', label: 'Diabète' },
        { code: 'hypothyroidie', label: 'Hypothyroïdie' },
        { code: 'hyperthyroidie', label: 'Hyperthyroïdie' },
        { code: 'eclampsie', label: 'Éclampsie' },
        { code: 'cancer', label: 'Cancer' }
      ]
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
            ) : q.type === 'select' ? 
            (
              <div className="user-info-input-wrapper">
                <div className="selected-items">
                  {(formData[q.id] || []).map((selectedCode) => {
                    const option = q.options.find(opt => opt.code === selectedCode);
                    return (
                      <span key={selectedCode} className="selected-item">
                        {option?.label}
                        <button 
                          onClick={() => {
                            const newValues = formData[q.id].filter(code => code !== selectedCode);
                            setFormData({ ...formData, [q.id]: newValues });
                          }}
                          className="remove-item"
                        >
                          ×
                        </button>
                      </span>
                    );
                  })}
                </div>
                <select
                  value=""
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value) {
                      const currentValues = formData[q.id] || [];
                      if (!currentValues.includes(value)) {
                        setFormData({ 
                          ...formData, 
                          [q.id]: [...currentValues, value]
                        });
                      }
                    }
                  }}
                  className="user-info-text-input"
                >
                  <option value="">Select illnesses</option>
                  {q.options.map((option) => (
                    <option 
                      key={option.code} 
                      value={option.code}
                      disabled={(formData[q.id] || []).includes(option.code)}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
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
        );
      })}
      <div className="button-group">
        <button onClick={onBack}>Back</button>
        <button onClick={onSubmit} disabled={isLoading}>{ isLoading ? 'Submitting...' : 'Submit Request'}</button>
      </div>
    </div>
  );
};




const UserInformationForm = ({ onNext, onBack, formData, setFormData, professions }) => {
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
      
      {/* <div className="question-box">
        <label>Age group</label>
        <div className="options">
          {[
            { code: 'child', label: 'Child' },
            { code: 'adult', label: 'Adult (18+ years)' }
          ].map((choice) => (
            <label key={choice.code} className="option-label">
              <input
                type="radio"
                name="age"
                value={choice.code}
                checked={formData.age === choice.code}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              />
              <span style={{paddingLeft: '20px'}}>{choice.label}</span>
            </label>
          ))}
        </div>
      </div> */}

      <div className="question-box">
        <label>Date of Birth</label>
        <DOBPicker
          value={formData.dob}
          onChange={(date) => setFormData({ ...formData, dob: date })}
        />
      </div>

      { professions.length > 0 && (
        <div className="question-box">
        <label>Profession</label>
        <div className="user-info-input-wrapper">
          <select
            value={formData.profession || ''}
            onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
            className="user-info-text-input"
          >
            <option value="">Select a profession</option>
            {professions?.map((profession) => (
              <option key={profession.id} value={profession.value}>
                {profession.value}
              </option>
            ))}
          </select>
        </div>
        </div>
      )}

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
  const location = useLocation();
  const { payload } = location.state || {};
  const [professionList, setProfessionList] = useState([]);
  const session_id = payload?.session_id;
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigate()



  useEffect(() => {
    fetch_professions();
  }, [])


  /**
     * @description fetch professions from the api
     */
  const fetch_professions = async () => {
    try {
        // const response = await getRequest('/professions/')
        const response = await fetch('http://0.0.0.0:8000/api/v1/professions/')
        const data =await response.json()
        setProfessionList([...data])
    
    } catch (error) {
        console.warn('error fetching professions', error)
    }
}

  const handleSubmit = async() => {

    if (!comparison?.sessionID) {
      alert('No pending comparison session found');
      console.warn('Session ID not found');
      navigation('/my-insurances'); 
      return;
    }
    const  response = await postRequestWithSession(comparison.sessionID, '/health/comparison/subscriber-info/', formData);
    
    if (response.status === 202) {
      subscribe_to_insurance()
      // navigation('/my-insurances');
    }
  };

  
  const subscribe_to_insurance = async() => {
    const data = payload
  
    setIsLoading(true)
    const response = await authenticatedPostRequestWithSession(session_id, `/health-insurance/comparison/subscribe/`, JSON.stringify(data));

    if(response.status === 200) {
        setComparison(null);
        const payment_url = response.data.payment_url

        try {            
            window.open(payment_url, '_parent', 'noopener,noreferrer');
        } catch (error) {
            console.warn('error fetching insurance pdf', error)
        }
    }
    setIsLoading(false)
  }

  const handleNextStep = (step) => {
    setStep(step)
    window.scrollTo(0, 0);
  }

  const steps = [
    <UserInformationForm professions={professionList} onNext={() => handleNextStep(1)} formData={formData} setFormData={setFormData} />,
    <InsuranceAdditionalQuestionForm onSubmit={handleSubmit} isLoading={isLoading} onBack={() => handleNextStep(0)} formData={formData} setFormData={setFormData} />
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
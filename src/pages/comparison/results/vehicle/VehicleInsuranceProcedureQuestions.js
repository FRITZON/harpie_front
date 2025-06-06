import { useLocation, useNavigate } from 'react-router-dom';
import { authenticatedPostRequestWithSession, postRequestWithSession } from '../../../../api';
import useLocalStorage from '../../../../lib/LocalStorage';
import { DateRangePicker } from '../../../Insurance/results_tab/DateRangePicker';
import { DOBPicker } from '../../../Insurance/results_tab/DOBPicker';
import './VehicleInsuranceProcedureQuestions.css';


import React, { useEffect, useState } from 'react';

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
  ];

  return (
    <div className="form-section">
      <h2>Vehicle Usage</h2>
      <p>{questions[0].question}</p>
      <div className="user-info-input-wrapper">
        <select
          value={formData[questions[0].id] || ''}
          onChange={(e) => setFormData({ ...formData, [questions[0].id]: e.target.value })}
          className="user-info-text-input"
        >
          <option className='options' value="" disabled>Select number of drivers</option>
          {questions[0].choices.map((choice) => (
            <option key={choice.code} value={choice.code}>{choice.label}</option>
          ))}
        </select>
      </div>
      <button className='next-button' onClick={onNext}>Next Question</button>
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
      id: 'registration_owner_name',
      question: 'What is the name of the registration document owner?',
      type: 'text',
      placeholder: 'Enter the owner\'s name',
      showIf: (data) => data.have_registration_document === 'no'
    },
    {
      id: 'driver_license_number',
      question: 'What is the driver license number?',
      type: 'text',
      placeholder: 'Enter the driver license number',
      showIf: (data) => data.have_registration_document === 'no'
    },
    {
      id: 'driver_license_number',
      question: 'What is the driver license number?',
      type: 'text',
      placeholder: 'Enter the driver license number',
      showIf: (data) => data.have_registration_document === 'yes'
    },
    {
      id: 'driver_license_expiration_date',
      question: 'What is the driver license expiration date?',
      type: 'date',
      placeholder: 'Enter the driver license expiration date',
      showIf: (data) => data.have_registration_document === 'yes'
    },
    {
      id: 'driver_license_expiration_date',
      question: 'What is the driver license expiration date?',
      type: 'date',
      placeholder: 'Enter the driver license expiration date',
      showIf: (data) => data.have_registration_document === 'no'
    },
    {
      id: 'registration_document_number',
      question: 'What is the registration document number?',
      type: 'text',
      placeholder: 'Enter the registration document number',
      showIf: (data) => data.have_registration_document === 'yes'
    },
    {
      id: 'registration_document_number',
      question: 'What is the registration document number?',
      type: 'text',
      placeholder: 'Enter the registration document number',
      showIf: (data) => data.have_registration_document === 'no'
    },
    {
      id: 'registration_document_expiration_date',
      question: 'What is the registration document expiration date?',
      type: 'date',
      placeholder: 'Enter the registration document expiration date',
      showIf: (data) => data.have_registration_document === 'yes'
    },
    {
      id: 'registration_document_expiration_date',
      question: 'What is the registration document expiration date?',
      type: 'date',
      placeholder: 'Enter the registration document expiration date',
      showIf: (data) => data.have_registration_document === 'no'
    },
    // Nouvelle question pour la CNI
    {
      id: 'cni_file',
      question: 'Please upload or scan your national ID card (CNI):',
      type: 'file',
      placeholder: '',
      showIf: (data) => data.have_registration_document === 'yes'
    },
    {
      id: 'cni_file',
      question: 'Please upload or scan your national ID card (CNI):',
      type: 'file',
      placeholder: '',
      showIf: (data) => data.have_registration_document === 'no'
    },
    // Nouvelle question pour le permis de conduire
    {
      id: 'driver_license_file',
      question: 'Please upload or scan your driver\'s license:',
      type: 'file',
      placeholder: '',
      showIf: (data) => data.have_registration_document === 'yes'
    },
    {
      id: 'driver_license_file',
      question: 'Please upload or scan your driver\'s license:',
      type: 'file',
      placeholder: '',
      showIf: (data) => data.have_registration_document === 'no'
    },
    // Nouvelle question pour la carte grise
    {
      id: 'registration_card_file',
      question: 'Please upload or scan your vehicle registration card:',
      type: 'file',
      placeholder: '',
      showIf: (data) => data.have_registration_document === 'yes'
    },
    {
      id: 'registration_card_file',
      question: 'Please upload or scan your vehicle registration card:',
      type: 'file',
      placeholder: '',
      showIf: (data) => data.have_registration_document === 'no'
    }
  ];

  return (
    <div className="form-section">
      <h2>Registration Details</h2>
      {questions.map((q) => {
        // Afficher toutes les questions, y compris celles qui ont une condition
        if (q.showIf && !q.showIf(formData) && q.id !== 'have_registration_document') return null;

        return (
          <div key={q.id} className="question-box">
            <label>{q.question}</label>
            {q.type === 'text' ? (
              <div className="user-info-input-wrapper">
                <input
                  type="text"
                  value={formData[q.id] || ''}
                  onChange={(e) => setFormData({ ...formData, [q.id]: e.target.value })}
                  className="user-info-text-input"
                  placeholder={q.placeholder}
                />
              </div>
            ) : q.type === 'date' ? (
              <div className="user-info-input-wrapper">
                <input
                  type="date"
                  value={formData[q.id] || ''}
                  onChange={(e) => setFormData({ ...formData, [q.id]: e.target.value })}
                  className="user-info-text-input"
                  placeholder={q.placeholder}
                />
              </div>
            ) : q.type === 'file' ? (
              <div className="user-info-input-wrapper">
                <input
                  type="file"
                  onChange={(e) => setFormData({ ...formData, [q.id]: e.target.files[0] })}
                  className="user-info-file-input"
                />
                <span>{q.placeholder}</span>
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
                    <span style={{ paddingLeft: '20px' }}>{choice.label}</span>
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



// const InsuranceHistoryForm = ({ onNext, onBack, formData, setFormData }) => {
//   const questions = [
//     {
      // id: 'previously_insured',
      // question: 'Has this vehicle been insured before?',
      // type: 'multiple_choice',
      // choices: [
      //   { code: 'yes', label: 'Yes' },
      //   { code: 'no', label: 'No' }
      // ]
//     },
//     {
    //   id: 'previous_insurance_company',
    //   question: 'What is the previous insurance company?',
    //   type: 'select',
    //   placeholder: 'Enter the previous insurance company',
    //   options: [
    //     {code: 'activa', label: 'Activa'},
    //     {code: 'axa', label: 'AXA'},
    //     {code: 'allianz', label: 'Allianz'},
    //     {code: 'saham', label: 'Saham'},
    //     {code: 'zenith', label: 'Zenith'},
    //     {code: 'nsia', label: 'NSIA'},
    //     {code: 'chanas', label: 'Chanas'},
    //     {code: 'colina', label: 'Colina'},
    //     {code: 'sunu', label: 'SUNU'},
    //     {code: 'agc', label: 'AGC'},
    //     {code: 'proassur', label: 'Pro Assur'},
    //     {code: 'other', label: 'Other'},
    //   ],
    //   showIf: (data) => data.previously_insured === 'yes'
    // },
  //   {
  //     id: 'has_previous_claims',
  //     question: 'Have you made any insurance claims in the past?',
  //     type: 'multiple_choice',
  //     choices: [
  //       { code: 'yes', label: 'Yes' },
  //       { code: 'no', label: 'No' }
  //     ]
  //   },
  //   {
  //     id: 'previous_claims',
  //     question: 'If you had insurance claims, how many and for what reasons?',
  //     type: 'textarea',
  //     showIf: (data) => data.has_previous_claims === 'yes'
  //   }
  // ];

//   return (
//     <div className="form-section">
//       <h2>Insurance History</h2>
//       {questions.map((q) => {
//         if (q.showIf && !q.showIf(formData)) return null;

//         return (
//           <div key={q.id} className="question-box">
//             <label>{q.question}</label>
//             {q.type === 'textarea' ? (
//               <textarea
//                 value={formData[q.id] || ''}
//                 onChange={(e) => setFormData({ ...formData, [q.id]: e.target.value })}
//                 rows="4"
//               />
//             ) : q.type === 'text' ? (
//               <div className="user-info-input-wrapper">
//                 <input
//                   type="text"
//                   value={formData[q.id] || ''}
//                   onChange={(e) => setFormData({ ...formData, [q.id]: e.target.value })}
//                   className="user-info-text-input"
//                   placeholder={q.placeholder}
//                 />
//               </div>
//             ) : q.type === 'select' ? 
//             (
//               <div className="user-info-input-wrapper">
//                 <select
//                   value={formData[q.id] || ''}
//                   onChange={(e) => setFormData({ ...formData, [q.id]: e.target.value })}
//                   className="user-info-text-input"
//                 >
//                   {q.options.map((option) => (
//                     <option key={option.code} value={option.code}>{option.label}</option>
//                   ))}
//                 </select>
//               </div>
//             ) : (
//               <div className="options">
//                 {q.choices.map((choice) => (
//                   <label key={choice.code} className="option-label">
//                     <input
//                       type="radio"
//                       name={q.id}
//                       value={choice.code}
//                       checked={formData[q.id] === choice.code}
//                       onChange={(e) => setFormData({ ...formData, [q.id]: e.target.value })}
//                     />
//                     <span style={{ paddingLeft: '20px' }}>{choice.label}</span>
//                   </label>
//                 ))}
//               </div>
//             )}
//           </div>
//         );
//       })}
//       <div className="button-group">
//         <button onClick={onBack}>Back</button>
//         <button onClick={onNext}>Next Question</button>
//       </div>
//     </div>
//   );
// };

// const CoverageForm = ({ onBack, onSubmit, formData, setFormData }) => {
//   const questions = [

//     {
//       id: 'insurance_duration',
//       question: 'Please select the duration of your insurance',
//       type: 'multiple_choice',
//       choices: [
//         { code: '1_year', label: '1 year' },
//         { code: '6_months', label: '6 months' },
//         { code: '4_months', label: '4 months' },
//         { code: '2_months', label: '2 months' }
//       ]
//     }
//   ];

//   return (
//     <div className="form-section">
//       <h2>Coverage Options</h2>
//       {questions.map((q) => (
//         <div key={q.id} className="question-box">
//           <label>{q.question}</label>
//           {q.type === 'multiple_select' ? (
//             <div className="options">
//               {q.choices.map((choice) => (
//                 <label key={choice.code} className="option-label">
//                   <input
//                     type="checkbox"
//                     name={q.id}
//                     value={choice.code}
//                     checked={formData[q.id]?.includes(choice.code)}
//                     onChange={(e) => {
//                       const currentValues = formData[q.id] || [];
//                       const newValues = e.target.checked
//                         ? [...currentValues, choice.code]
//                         : currentValues.filter(v => v !== choice.code);
//                       setFormData({ ...formData, [q.id]: newValues });
//                     }}
//                   />
//                   <span style={{ paddingLeft: '20px' }}>{choice.label}</span>
//                 </label>
//               ))}
//             </div>
//           ) : (
//             <div className="options">
//               {q.choices.map((choice) => (
//                 <label key={choice.code} className="option-label">
//                   <input
//                     type="radio"
//                     name={q.id}
//                     value={choice.code}
//                     checked={formData[q.id] === choice.code}
//                     onChange={(e) => setFormData({ ...formData, [q.id]: e.target.value })}
//                   />
//                   <span style={{ paddingLeft: '20px' }}>{choice.label}</span>
//                 </label>
//               ))}
//             </div>
//           )}
//         </div>
//       ))}
//       <div className="button-group">
//         <button onClick={onBack}>Back</button>
//         <button onClick={onSubmit}>Submit Request</button>
//       </div>
//     </div>
//   );
// };



const UserInformationForm = ({ onNext, isLoading, onSubmit, onBack, formData, setFormData, professions }) => {
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
              <span style={{ paddingLeft: '20px' }}>{choice.label}</span>
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
        <button disabled={isLoading} onClick={onSubmit}>{isLoading ? 'Submiting...' : 'Submit Request'}</button>
        {/* <button onClick={onNext}>Next Question</button> */}
      </div>
    </div>
  );
};


const VehicleInsuranceProcedureQuestions = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [comparison, setComparison] = useLocalStorage('comparison');
  const [isLoading, setIsLoading] = useState(false);
  const [professionList, setProfessionList] = useState([]);
  const location = useLocation();
  const { payload } = location.state || {};
  const session_id = payload?.session_id;

  const navigation = useNavigate();

  useEffect(() => {
    fetch_professions();
  }, [])

  const handleSubmit = async () => {
    if (isLoading) return;
    setIsLoading(true);
    console.log('Comparison state:', comparison);
    if (!comparison?.session_id) {
      alert('No pending comparison session found');
      console.warn('Session ID not found');
      navigation('/my-insurances');
      return;
    }
    console.log("the form data", formData);
    const response = await authenticatedPostRequestWithSession(comparison.session_id,'/vehicles/comparison/subscriber-info/', formData);
    console.log('the response', response)
    if (response.status === 202) {
      subscribe_user();
      // navigation('/my-insurances');
    } else {
      setIsLoading(false);
    }
  };


  const subscribe_user = async () => {
    const data = payload;
    
    setIsLoading(true)
    console.log('the data', data)
    const response = await authenticatedPostRequestWithSession(session_id, `/vehicles/comparison/subscribe/`, JSON.stringify(data));
    console.log('the response', response)
    if (response.status === 201) {
      setComparison(null);
      const payment_url = response.data.payment_url

      try {
        window.open(payment_url, '_parent', 'noopener,noreferrer');
        setTimeout(() => {
          setIsLoading(false)
        }, 2000)
      } catch (error) {
        console.warn('error fetching insurance pdf', error)
        setIsLoading(false)
      }
    }
  }



  const handleNextStep = (step) => {
    setStep(step)
    window.scrollTo(0, 0);
  }

  /**
   * @description fetch professions from the api
   */
  const fetch_professions = async () => {
    try {
      // const response = await getRequest('/professions/')
      const response = await fetch('http://0.0.0.0:8000/api/v1/professions/')
      const data = await response.json()
      setProfessionList([...data])

    } catch (error) {
      console.warn('error fetching professions', error)
    }
  }

  const steps = [
    <VehicleUsageForm onNext={() => handleNextStep(1)} formData={formData} setFormData={setFormData} />,
    <RegistrationForm onNext={() => handleNextStep(2)} onBack={() => handleNextStep(0)} formData={formData} setFormData={setFormData} />,
    //<InsuranceHistoryForm onNext={() => handleNextStep(3)} onBack={() => handleNextStep(1)} formData={formData} setFormData={setFormData} />,
    <UserInformationForm onNext={() => handleNextStep(4)} onBack={() => handleNextStep(2)} professions={professionList} onSubmit={handleSubmit} isLoading={isLoading} formData={formData} setFormData={setFormData} />,
    // <CoverageForm onBack={() => handleNextStep(3)} onSubmit={handleSubmit} formData={formData} setFormData={setFormData} />
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
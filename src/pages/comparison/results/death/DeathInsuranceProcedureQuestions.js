import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { authenticatedPostRequestWithSession } from '../../../../api';
import { DOBPicker } from '../../../Insurance/results_tab/DOBPicker';




const UserInformationForm = ({ onNext, onBack, formData, setFormData, professions }) => {
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

            {professions.length > 0 && (
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


const BeneficiaryInformationForm = ({ onSubmit, isLoading, formData, setFormData, professions }) => {
    return (
        <div className="form-section">
            <h2>Primry Beneficiary Information</h2>

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

            {professions.length > 0 && (
                <div className="question-box">
                    <label>Profession</label>
                    <div className="user-info-input-wrapper">
                        <select
                            value={formData.beneficiary_profession || ''}
                            onChange={(e) => setFormData({ ...formData, beneficiary_profession: e.target.value })}
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
                <button></button>
                <button onClick={onSubmit} disabled={isLoading}>{isLoading ? 'Submitting...' : 'Submit Information'}</button>
            </div>
        </div>
    );
};


const DeathInsuranceProcedureQuestions = () => {
    const location = useLocation();
    const { payload } = location.state || {};
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [professionList, setProfessionList] = useState([]);
    const [comparison, setComparison] = useState(null);
    const session_id = payload?.session_id;
    const navigate = useNavigate();


    useEffect(() => {
        fetch_professions();
    }, [])


    /**
       * @description fetch professions from the api
       */
    const fetch_professions = async () => {
        try {
            // const response = await getRequest('/professions/')
            const response = await fetch('https://harpie-app.site/api/v1/professions/')
            const data = await response.json()
            setProfessionList([...data])

        } catch (error) {
            console.warn('error fetching professions', error)
        }
    }

    const handleSubmit = async () => {
        console.log('Form submitted:', formData);

        // Handle form submission
        const data = {
            ...payload,
            ...formData
        }

        console.log('the data', data)
        setIsLoading(true)
        const response = await authenticatedPostRequestWithSession(session_id, `/death-insurance/comparison/subscribe/`, JSON.stringify(data));
        if (response.status === 201) {
            setComparison(null);
            const payment_url = response.data.payment_url

            try {
                window.open(payment_url, '_parent', 'noopener,noreferrer');
            } catch (error) {
                console.warn('error fetching insurance pdf', error)
            }
        }
        setIsLoading(false)
    };

    const handleNextStep = (step) => {
        setStep(step)
        window.scrollTo(0, 0);
    }


    const steps = [
        <UserInformationForm professions={professionList} onNext={() => handleNextStep(1)} formData={formData} setFormData={setFormData} />,
        <BeneficiaryInformationForm professions={professionList} onSubmit={handleSubmit} isLoading={isLoading} formData={formData} setFormData={setFormData} />,
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

export default DeathInsuranceProcedureQuestions;


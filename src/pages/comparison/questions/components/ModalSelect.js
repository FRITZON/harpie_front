import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { VscClose } from 'react-icons/vsc';

const ModalSelect = ({ api, currentQuestion, handleAnswer }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [contentList, setContentList] = useState(null);

  useEffect(() => {
    fetch_data();
  }, []);

  const fetch_data = async () => {
    try {
      setLoading(true);
      const response = await axios.get(api);
      if (response.status === 200) {
        setList(response.data?.results);
        // Si selectedOption est défini, mettez à jour contentList
        if (selectedOption) {
          const selected = response.data?.results.find(item => item.type === selectedOption);
          setContentList(selected);
        }
      }
    } catch (err) {
      setError('An error occurred while fetching the data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handle_remove_modal = () => {
    setSelectedOption(null);
    setContentList(null); // Réinitialiser le contenu lorsque le modal est fermé
  };

  const update_selected_option = (option) => {
    setSelectedOption(option);
    const selected = list.find(item => item.type === option);
    setContentList(selected);
  };

  const confirm_option = () => {
    handleAnswer(selectedOption);
    handle_remove_modal();
  };

  return (
    <>
      <div className="options">
        {currentQuestion.map((question) => (
          <div key={question.id}>
            {question.type === 'multiple_choice' && (
              <div>
                <h3>{question.question?.text}</h3>
                {Array.isArray(question.question?.choices) ? question.question.choices.map(choice => (
                  <button
                    key={choice.code}
                    onClick={() => update_selected_option(choice.code)}
                  >
                    {choice.en}
                  </button>
                )) : <div>No options available</div>}
              </div>
            )}
            {/* Vous pouvez ajouter d'autres types de questions ici */}
          </div>
        ))}
      </div>

      {selectedOption && (
        <div className='insurance_modal_select'>
          <div className='modal_select'>
            {loading && <div className='Loader' />}
            <h2>Coverage details for your selected Insurance</h2>
            <div className='insurance_modal_buttons_wrapper'>
              {list.map((listItem) => (
                <button
                  className={selectedOption === listItem?.type ? "selected" : ""}
                  key={listItem?.id}
                  onClick={() => update_selected_option(listItem?.type)}
                >
                  {listItem?.type} Insurance
                </button>
              ))}
            </div>
            <div className='insurance_modal_select_contents'>
              {contentList && (
                <>
                  <li className="insurance_list_partial_results">
                    <FaCheckCircle className="text-green-500 mr-2" />
                    <span className="font-medium">Supported Hospitals: </span>
                    <span className="ml-2">
                      {contentList.public_hospitals && 'Public Hospitals'}
                      {contentList.para_public_hospitals && '- Para-public Hospitals '}
                      {contentList.private_hospitals && '- Private Hospitals'}
                    </span>
                  </li>
                  <li className="insurance_list_partial_results">
                    <FaCheckCircle className="text-green-500 mr-2" />
                    <span className="font-medium">Coverage Rate: </span>
                    <span className="ml-2">{contentList.coverage_rate}% </span>
                  </li>
                  <li className="insurance_list_partial_results">
                    {contentList.consultation_general_practitioner ? (
                      <FaCheckCircle className="text-green-500 mr-2" />
                    ) : (
                      <FaTimesCircle className="text-green-500 mr-2" style={{ color: 'var(--red)' }} />
                    )}
                    <span className="font-medium">General Consultation: </span>
                    <span className="ml-2" style={{ color: contentList.consultation_general_practitioner ? 'var(--green)' : 'var(--red)' }}>
                      {contentList.consultation_general_practitioner ? 'Available' : 'Unavailable'}
                    </span>
                  </li>
                  <li className="insurance_list_partial_results">
                    {contentList.consultation_specialist ? (
                      <FaCheckCircle className="text-green-500 mr-2" />
                    ) : (
                      <FaTimesCircle className="text-green-500 mr-2" style={{ color: 'var(--red)' }} />
                    )}
                    <span className="font-medium">Special Consultation: </span>
                    <span className="ml-2" style={{ color: contentList.consultation_specialist ? 'var(--green)' : 'var(--red)' }}>
                      {contentList.consultation_specialist ? 'Available' : 'Unavailable'}
                    </span>
                  </li>
                  <li className="insurance_list_partial_results">
                    {contentList.consultation_professor ? (
                      <FaCheckCircle className="text-green-500 mr-2" />
                    ) : (
                      <FaTimesCircle className="text-green-500 mr-2" style={{ color: 'var(--red)' }} />
                    )}
                    <span className="font-medium">Expert Consultation: </span>
                    <span className="ml-2" style={{ color: contentList.consultation_professor ? 'var(--green)' : 'var(--red)' }}>
                      {contentList.consultation_professor ? 'Available' : 'Unavailable'}
                    </span>
                  </li>
                  <li className="insurance_list_partial_results">
                    {contentList.hospitalization ? (
                      <FaCheckCircle className="text-green-500 mr-2" />
                    ) : (
                      <FaTimesCircle className="text-green-500 mr-2" style={{ color: 'var(--red)' }} />
                    )}
                    <span className="font-medium">Hospitalization: </span>
                    <span className="ml-2" style={{ color: contentList.hospitalization ? 'var(--green)' : 'var(--red)' }}>
                      {contentList.hospitalization ? 'Available' : 'Unavailable'}
                    </span>
                  </li>
                  <li className="insurance_list_partial_results">
                    {contentList.nuclear_medicine ? (
                      <FaCheckCircle className="text-green-500 mr-2" />
                    ) : (
                      <FaTimesCircle className="text-green-500 mr-2" style={{ color: 'var(--red)' }} />
                    )}
                    <span className="font-medium">Nuclear Medicine: </span>
                    <span className="ml-2" style={{ color: contentList.nuclear_medicine ? 'var(--green)' : 'var(--red)' }}>
                      {contentList.nuclear_medicine ? 'Available' : 'Unavailable'}
                    </span>
                  </li>
                  <li className="insurance_list_partial_results">
                    {contentList.optics_every_two_years ? (
                      <FaCheckCircle className="text-green-500 mr-2" />
                    ) : (
                      <FaTimesCircle className="text-green-500 mr-2" style={{ color: 'var(--red)' }} />
                    )}
                    <span className="font-medium">Optics once/2 years: </span>
                    <span className="ml-2" style={{ color: contentList.optics_every_two_years ? 'var(--green)' : 'var(--red)' }}>
                      {contentList.optics_every_two_years ? 'Available' : 'Unavailable'}
                    </span>
                  </li>
                  <li className="insurance_list_partial_results">
                    {contentList.speech_therapy ? (
                      <FaCheckCircle className="text-green-500 mr-2" />
                    ) : (
                      <FaTimesCircle className="text-green-500 mr-2" style={{ color: 'var(--red)' }} />
                    )}
                    <span className="font-medium">Speech Therapy: </span>
                    <span className="ml-2" style={{ color: contentList.speech_therapy ? 'var(--green)' : 'var(--red)' }}>
                      {contentList.speech_therapy ? 'Available' : 'Unavailable'}
                    </span>
                  </li>
                </>
              )}
            </div>
            <div className='insurance_list_selected_btn' onClick={confirm_option}>Select</div>
            <div onClick={handle_remove_modal} className='logout_modal_close'>
              <VscClose />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalSelect;
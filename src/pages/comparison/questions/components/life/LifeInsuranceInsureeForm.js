import React, { useEffect, useState } from 'react'
import { useQuestionContext } from '../../../../../context/QuestionContext'
import { getRequest } from '../../../../../api'

const LifeInsuranceInsureeForm = ({ previous_answers }) => {
    const [name, setName] = useState('')
    const [profession, setProfession] = useState(null)
    const [status, setStatus] = useState(null)
    const [phone, setPhone] = useState('')
    const [dob, setdob] = useState(null)
    const [professionList, setProfessionList] = useState([])

    const context = useQuestionContext();

    useEffect(() => {
      fetch_professions()
    }, [])


    /**
     * @description fetch professions from the api
     */
    const fetch_professions = async () => {
        try {
            const response = await getRequest('/professions/')
            const data = response.data
            setProfessionList(data)
        
        } catch (error) {
            console.warn('error fetching professions', error)
        }
    }
    

    useEffect(() => {
        const validated_data = valide_data()
        if(validated_data){
            save_data()
        }
        else {
            handleAnswer(null)
        }
        console.info(validated_data)
    }, [name, dob, status, profession, phone])


    const valide_data = () => {
        if(name.trim().length < 2){
            return false
        }
        if(!dob){
            return false
        }
        if(!status){
            return false
        }
        if(!profession){
            return false
        }
        if(phone.trim().length < 9){
            return false
        }
        return true
    }

    const save_data = () => {
        const data = {
            name,
            dob,    
            profession,
            phone,
            status
        }
        handleAnswer(JSON.stringify({"user_data": data}))

    }

   


    const { currentQuestion, handleAnswer, currentAnswer } = context;
    
  return (
    <div className='question_user_form'>
        <div className='question_form_wrapper'>
            <div className='question_form_input'>
                <label>Full Name <br/><span className='required'>required</span></label>
                <input value={name} onChange={e=> setName(e.target.value)} type='text' placeholder='Full Name' />
            </div>

            <div className='question_form_input'>
                <label>Birthday <br/><span className='required'>required</span></label>
                <input 
                    value={dob} 
                    onChange={e => setdob(e.target.value)} 
                    type='date' 
                    max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
                    min={new Date(new Date().setFullYear(new Date().getFullYear() - 65)).toISOString().split('T')[0]}
                />
            </div>

            <div className='question_form_input'>
                <label>Profession <br/><span className='required'>required</span></label>
                <select onChange={e => setProfession(e.target.value)}>
                    <option value=''>Select Profession</option>
                    {
                        professionList.map(prof => (
                            <option key={prof.id} value={prof.code}>{prof?.value}</option>
                         )
                        )
                    }
                </select>
            </div>

            <div className='question_form_input'>
                <label>Status <br/><span className='required'>required</span></label>
                <select onChange={e => setStatus(e.target.value)}>
                    <option value=''>Marital Status</option>
                    <option value='single'>Single</option>
                    <option value='maried'>Maried</option>
                    <option value='widow'>Widowed</option>
                    <option value='divorce'>Divorced</option>
                </select>
            </div>
            
            <div className='question_form_input'>
                <label>Phone <br/><span className='required'>required</span></label>
                <input value={phone} onChange={e=> setPhone(e.target.value)} type='text' placeholder='Phone' />
            </div>
        </div>
    </div>
  )
}

export default LifeInsuranceInsureeForm
import React, { useEffect, useState } from 'react'
import './questions.css'
import { useQuestionContext } from '../../../../context/QuestionContext'

const UserForm = () => {
    const [name, setName] = useState('')
    const [gender, setGender] = useState('male')
    const [licenseNumber, setLicenseNumber] = useState('')
    const [profession, setProfession] = useState('')
    const [phone, setPhone] = useState('')

    const context = useQuestionContext();

    useEffect(() => {
        const validated_data = valide_data()
        if(validated_data){
            save_data()
        }
        else {
            handleAnswer(null)
        }
        console.log(validated_data)
    }, [name, licenseNumber, profession, phone])


    const valide_data = () => {
        if(name.trim().length < 5){
            return false
        }
        if(licenseNumber.trim().length < 8){
            return false
        }
        if(profession.trim().length < 3){
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
            profession,
            phone,
            "license_number": licenseNumber
        }

        handleAnswer({"user_data": data})

    }


    const { currentQuestion, handleAnswer, currentAnswer } = context;
    
  return (
    <div className='question_user_form'>
        <div className='question_form_wrapper'>
            <div className='question_form_input'>
                <input value={name} onChange={e=> setName(e.target.value)} type='text' placeholder='Full Name' />
            </div>
            <div className='question_form_input'>
                <select onChange={e => setGender(e.target.value)}>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                </select>
                {/* <input value={name} onChange={e=> setName(e.target.value)} type='text' placeholder='Full Name' /> */}
            </div>
            <div className='question_form_input'>
                <input value={licenseNumber} onChange={e=> setLicenseNumber(e.target.value)} type='text' placeholder='License Number' />
            </div>
            <div className='question_form_input'>
                <input value={profession} onChange={e=> setProfession(e.target.value)} type='text' placeholder='Profession' />
            </div>
            <div className='question_form_input'>
                <input value={phone} onChange={e=> setPhone(e.target.value)} type='text' placeholder='Phone' />
            </div>
        </div>
    </div>
  )
}

export default UserForm
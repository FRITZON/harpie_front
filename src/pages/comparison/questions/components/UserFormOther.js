import React, { useEffect, useState } from 'react'
import './questions.css'
import { useQuestionContext } from '../../../../context/QuestionContext'
import { getRequest } from '../../../../api'

const UserFormOther = () => {
    const [name, setName] = useState('')
    const [gender, setGender] = useState('male')
    const [licenseNumber, setLicenseNumber] = useState('')
    const [profession, setProfession] = useState('')
    const [permit, setPermit] = useState('')
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
    }, [name, licenseNumber, profession, phone])


    const valide_data = () => {
        if(name.trim().length < 2){
            return false
        }
        if(!dob){
            return false
        }
        if(permit.trim().length < 1){
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
            "license_number": licenseNumber,
            "permit": permit,
        }

        handleAnswer({"user_data": data})

    }

    const permit_list = [
        {
            "name": "Permit A",
            "code": "permit_a"
        },
        {
            "name": "Permit B",
            "code": "permit_b"
        },
        {
            "name": "Permit C",
            "code": "permit_c"
        },
        {
            "name": "Permit D",
            "code": "permit_d"
        },
        {
            "name": "Permit E",
            "code": "permit_e"
        },
        {
            "name": "Permit F",
            "code": "permit_f"
        },
        {
            "name": "Permit G",
            "code": "permit_g"
        },

    ]


    const { currentQuestion, handleAnswer, currentAnswer } = context;
    
  return (
    <div className='question_user_form'>
        <div className='question_form_wrapper'>
            <div className='question_form_input'>
                <label>Full Name</label>
                <input value={name} onChange={e=> setName(e.target.value)} type='text' placeholder='Full Name' />
            </div>
            <div className='question_form_input'>
                <label>Relation</label>
                <select onChange={e => setGender(e.target.value)}>
                    <option value='spouse'>Spouse</option>
                    <option value='child'>Child</option>
                    <option value='parent'>Parent</option>
                    <option value='other'>Other</option>
                </select>
            </div>
            <div className='question_form_input'>
                <label>DoB</label>
                <input 
                    value={dob} 
                    onChange={e => setdob(e.target.value)} 
                    type='date' 
                    max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
                    min={new Date(new Date().setFullYear(new Date().getFullYear() - 65)).toISOString().split('T')[0]}
                />
            </div>
            {/* <div className='question_form_input'>
                <input value={licenseNumber} onChange={e=> setLicenseNumber(e.target.value)} type='text' placeholder='License Number' />
                </div> */}
            <div className='question_form_input'>
                <label>Permit</label>
                <select onChange={e => setProfession(e.target.value)}>
                    <option value=''>Select Permit</option>
                    {
                        permit_list.map(perm => (
                            <option key={perm.code} value={perm.code}>{perm?.name}</option>
                         )
                        )
                    }
                </select>
            </div>
            {/* <div className='question_form_input'>
                <label>Profession</label>
                <select onChange={e => setPermit(e.target.value)}>
                    <option value=''>Select Profession</option>
                    {
                        professionList.map(prof => (
                            <option key={prof.id} value={prof.code}>{prof?.value}</option>
                         )
                        )
                    }
                </select>
            </div> */}
            
            <div className='question_form_input'>
                <label>Phone</label>
                <input value={phone} onChange={e=> setPhone(e.target.value)} type='text' placeholder='Phone' />
            </div>
        </div>
    </div>
  )
}

export default UserFormOther
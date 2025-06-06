import React, { useEffect, useState } from 'react'
import './questions.css'
import { useQuestionContext } from '../../../../context/QuestionContext'
import { getRequest } from '../../../../api'

const UserForm = () => {
    const [name, setName] = useState('')
    const [gender, setGender] = useState('male')
    const [licenseNumber, setLicenseNumber] = useState('')
    const [profession, setProfession] = useState('')
    const [dob, setdob] = useState(null)
    const [permit, setPermit] = useState('')
    const [phone, setPhone] = useState('')
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
            // const response = await getRequest('/professions/')
            const response = await fetch('http://0.0.0.0:8000/api/v1/professions/')
            const data =await response.json()
            setProfessionList([...data])
        
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
    }, [name, dob, licenseNumber, profession, phone])


    const valide_data = () => {
        if(name.trim().length < 2){
            return false
        }
        // if(licenseNumber.trim().length < 8){
        //     return false
        // }
        if(profession.trim().length < 3){
            return false
        }
        if(permit.trim().length < 1){
            return false
        }
        if(phone.trim().length < 9){
            return false
        }
        if(!dob){
            return false
        }
        return true
    }

    const save_data = () => {
        const data = {
            name,
            profession,
            phone,
            dob,
            "license_number": licenseNumber,
            "permit": permit,
        }

        handleAnswer({"user_data": data})

    }

    

    const handlePhoneChange = (e) => {
        const value = e.target.value.replace(/\D/g, ''); 
        setPhone(value);
    };

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
                <label>Full Name <br/><span className='required'>required</span> </label>
                <input value={name} onChange={e=> setName(e.target.value)} type='text' placeholder='Full Name' />
            </div>
            <div className='question_form_input'>
                <label>Gender <br/><span className='required'>required</span> </label>
                <select onChange={e => setGender(e.target.value)}>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                </select>
                {/* <input value={name} onChange={e=> setName(e.target.value)} type='text' placeholder='Full Name' /> */}
            </div>
            {/* <div className='question_form_input'>
                <input value={licenseNumber} onChange={e=> setLicenseNumber(e.target.value)} type='text' placeholder='License Number' />
                </div> */}

            <div className='question_form_input'>
                <label>Birthday<br/><span className='required'>required</span></label>
                <input 
                    value={dob} 
                    onChange={e => setdob(e.target.value)} 
                    type='date' 
                    max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
                    min={new Date(new Date().setFullYear(new Date().getFullYear() - 65)).toISOString().split('T')[0]}
                />
            </div>

            <div className='question_form_input'>
                <label>Permit <br/><span className='required'>required</span> </label>
                <select onChange={e => setPermit(e.target.value)}>
                    <option value=''>Select Permit</option>
                    {
                        permit_list.map(perm => (
                            <option key={perm.code} value={perm.code}>{perm?.name}</option>
                         )
                        )
                    }
                </select>
            </div>

            <div className='question_form_input'>
                <label>Profession <br/><span className='required'>required</span> </label>
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
                <label>Phone <br/><span className='required'>required</span> </label>
                <input value={phone} onChange={handlePhoneChange} type='text' placeholder='Phone' />
            </div>
        </div>
    </div>
  )
}

export default UserForm
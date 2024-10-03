import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { FaCheckCircle, FaChevronDown, FaTimesCircle } from 'react-icons/fa';
import { VscClose, VscArrowRight, VscArrowLeft } from 'react-icons/vsc';
import { useQuestionContext } from '../../../../context/QuestionContext';



/// USED EXCLUSSIVELY FOR INPUTING LICENSE PLATE NUMBER OF USERS. AS CAN BE SEEN IN VEHICLE INSURANCE
//----------------------------
/// RELATED INSURANCE: VEHICLE
//----------------------------

const LicensePlateNumber = ({ api }) => {
  const [list, setlist] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [checkedItems, setCheckedItems] = useState({});
  const [selectedRegion, setSelectedRegion] = useState('LT')
  const [licenseNumber, setLicenseNumber] = useState('')
  const [showRegionList, setShowRegionList] = useState(false)

  
  const context = useQuestionContext();
  
  useEffect(() => {
    fetch_data()
  }, [])


  /**
   * Fetch data from the API
   */
  const fetch_data = async () => {
    const url = api
    
    try {
      setLoading(true)
      const response = await axios.get(url)
      response.status === 200 && setlist(response.data)
      // setSelectedRegion(response.data[0])
    }
    catch (err) {
      setError('An error occurred while fetching the data.');
      console.warn(err);
    } finally {
      setLoading(false);
    }
  }

  const { currentQuestion, handleAnswer, currentAnswer } = context;


  const updateLicense = (str) => {
    setLicenseNumber(str)
    handleAnswer(selectedRegion?.code + str)
  }

  const cleanup_select = (e) => {
    setShowRegionList(false)
    e.target.parentElement.nextElementSibling.focus()
  }


  return (
    <div className='options'>
      <div className='flex_license_number'>
        <div onClick={() => setShowRegionList(!showRegionList) } className='selected_region'>{ selectedRegion?.code || '__' } <span className='icon'><FaChevronDown /></span></div>
          <div className={`dropdown_region_list ${ showRegionList ? 'show' : '' }`}>
            { list.map(listItem => (
              <p onClick={() => setSelectedRegion(listItem)} onMouseUp={e => cleanup_select(e)} key={listItem?.code}>{listItem?.value}</p>
            ))}
          </div>
          <input type='text' value={ licenseNumber } disabled={!selectedRegion?.code} autoFocus onChange={(e) => updateLicense(e.target.value.toUpperCase())} placeholder='Enter your license plate number' />
            
      </div>
      <div className='flex_license_inputs'>
        <div className='license_location_italic'>{ selectedRegion?.value }</div>
        <div className='license_number_example'>Example: {selectedRegion?.code} 123ABC</div>

      </div>
    </div>
  )
}

export default LicensePlateNumber
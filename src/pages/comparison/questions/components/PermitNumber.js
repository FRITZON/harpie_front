import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { FaCheckCircle, FaChevronDown, FaTimesCircle } from 'react-icons/fa';
import { VscClose, VscArrowRight, VscArrowLeft } from 'react-icons/vsc';
import { useQuestionContext } from '../../../../context/QuestionContext';



/// USED EXCLUSSIVELY FOR INPUTING LICENSE PLATE NUMBER OF USERS. AS CAN BE SEEN IN VEHICLE INSURANCE
//----------------------------
/// RELATED INSURANCE: VEHICLE
//----------------------------

const PermitNumber = ({ api, user_inputs }) => {
  const [list, setlist] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [checkedItems, setCheckedItems] = useState({});
  const [selectedRegion, setSelectedRegion] = useState('LT')
  const [licenseNumber, setLicenseNumber] = useState('')
  const [showRegionList, setShowRegionList] = useState(false)
  const [showYearList, setShowYearList] = useState(false)

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const [selectedYear, setSelectedYear] = useState(null);

  
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
      console.log(response)
    }
    catch (err) {
      setError('An error occurred while fetching the data.');
      console.warn(err);
    } finally {
      setLoading(false);
    }
  }

  const { currentQuestion, handleAnswer, currentAnswer } = context;

  useEffect(() => {
    let license = selectedRegion?.code + licenseNumber + ("" +selectedYear).slice(-2)
    handleAnswer(license)
  }, [selectedYear, selectedRegion, licenseNumber])
  
  const updateLicense = (str) => {
    setLicenseNumber(str)
  }

  const cleanup_select = (e) => {
    setShowRegionList(false)
    e.target.parentElement.nextElementSibling.focus()
  }

  const handleYearClick = (year) => {
    setSelectedYear(year);
    setShowYearList(false)
  };

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
          <div onClick={() => setShowYearList(!showYearList) } className='selected_region'>{ selectedYear || '__' } <span className='icon'><FaChevronDown /></span></div>
            <div className={`dropdown_region_list right ${ showYearList ? 'show' : '' }`}>
              { years.map(year => (
                <p onClick={() => handleYearClick(year)} key={year}>{year}</p>
              ))}
            </div>
        </div>
        {/* <span className='license_number_year'>- { (""+user_inputs?.personal_and_vehicle_info?.vehicle_year).slice(-2)}</span>  */}
      <div className='flex_license_inputs'>
        <div className='license_location_italic'>Region:{ selectedRegion?.value }</div>
        <div className='license_number_example'>Example: {selectedRegion?.code}-123456 - Year:{ selectedYear  && (""+selectedYear) }</div>
      </div>
    </div>
  )
}

export default PermitNumber
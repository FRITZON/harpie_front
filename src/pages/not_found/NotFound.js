import React from 'react'
import './not_found.css'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const NotFound = () => {

  const { t } = useTranslation()
  return (
    <div className='not_found_page'>
        <h1>404</h1>
        <h3>{ t('not_found.description') } </h3>
        <p>{ t('not_found.link') }</p>
        <Link to='/' className='not_found_link'>{ t('not_found.home') }</Link>
    </div>
  )
}

export default NotFound
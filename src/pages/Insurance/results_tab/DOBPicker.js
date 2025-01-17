'use client'

import { useState, useRef, useEffect } from 'react'
import { Calendar } from 'lucide-react'

export const DOBPicker = ({ onChange, value }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentDate, setCurrentDate] = useState(value || new Date())
  const [selectedDate, setSelectedDate] = useState(value)
  const calendarRef = useRef(null)

  const years = Array.from({ length: 74 }, (_, i) => new Date().getFullYear() - i)
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const daysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const firstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const formatDate = (date) => {
    if (!date) return 'Select birth date'
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const handleDateClick = (day) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    setSelectedDate(newDate)
    onChange?.(newDate)
    setIsOpen(false)
  }

  const isSelectedDate = (day) => {
    if (!selectedDate) return false
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    return date.toDateString() === selectedDate.toDateString()
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="date-range-picker" ref={calendarRef}>
      <button 
        className="date-picker-button" 
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <Calendar className="calendar-icon" />
        <span>{formatDate(selectedDate)}</span>
      </button>

      {isOpen && (
        <div className="calendar-dropdown">
          <div className="dob-picker-selectors">
            <select
              className="dob-picker-select"
              value={currentDate.getMonth()}
              onChange={(e) => setCurrentDate(new Date(currentDate.getFullYear(), parseInt(e.target.value), 1))}
            >
              {months.map((month, index) => (
                <option key={month} value={index}>{month}</option>
              ))}
            </select>
            <select
              className="dob-picker-select"
              value={currentDate.getFullYear()}
              onChange={(e) => setCurrentDate(new Date(parseInt(e.target.value), currentDate.getMonth(), 1))}
            >
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div className="calendar-grid">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="calendar-day-header">{day}</div>
            ))}

            {[...Array(firstDayOfMonth(currentDate))].map((_, index) => (
              <div key={`empty-${index}`} className="calendar-day empty"></div>
            ))}

            {[...Array(daysInMonth(currentDate))].map((_, index) => {
              const day = index + 1
              return (
                <div
                  key={day}
                  className={`calendar-day ${isSelectedDate(day) ? 'dob-selected-date' : ''}`}
                  onClick={() => handleDateClick(day)}
                >
                  {day}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
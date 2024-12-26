'use client'

import { useState, useRef, useEffect } from 'react'
import { Calendar } from 'lucide-react'
import './DateRangePicker.css'

export const DateRangePicker = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [dateRange, setDateRange] = useState({ start: null, end: null })
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const calendarRef = useRef(null)

  const daysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const firstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const formatDate = (date) => {
    if (!date) return ''
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const handleDateClick = (day) => {
    const clickedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    
    if (!dateRange.start || (dateRange.start && dateRange.end)) {
      setDateRange({ start: clickedDate, end: null })
    } else {
      if (clickedDate < dateRange.start) {
        setDateRange({ start: clickedDate, end: dateRange.start })
      } else {
        setDateRange({ start: dateRange.start, end: clickedDate })
      }
    }
  }

  const isDateInRange = (day) => {
    if (!dateRange.start || !dateRange.end) return false
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    return date >= dateRange.start && date <= dateRange.end
  }

  const isStartDate = (day) => {
    if (!dateRange.start) return false
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    return date.getTime() === dateRange.start.getTime()
  }

  const isEndDate = (day) => {
    if (!dateRange.end) return false
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    return date.getTime() === dateRange.end.getTime()
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
      <button className="date-picker-button" onClick={() => setIsOpen(!isOpen)}>
        <Calendar className="calendar-icon" />
        <span>
          {dateRange.start ? (
            dateRange.end ? (
              `${formatDate(dateRange.start)} - ${formatDate(dateRange.end)}`
            ) : (
              formatDate(dateRange.start)
            )
          ) : (
            'Select date range'
          )}
        </span>
      </button>

      {isOpen && (
        <div className="calendar-dropdown">
          <div className="calendar-header">
            <button 
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
            >
              ←
            </button>
            <span>
              {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </span>
            <button 
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
            >
              →
            </button>
          </div>

          <div className="calendar-grid">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="calendar-day-header">{day}</div>
            ))}

            {[...Array(firstDayOfMonth(currentMonth))].map((_, index) => (
              <div key={`empty-${index}`} className="calendar-day empty"></div>
            ))}

            {[...Array(daysInMonth(currentMonth))].map((_, index) => {
              const day = index + 1
              return (
                <div
                  key={day}
                  className={`calendar-day ${
                    isDateInRange(day) ? 'in-range' : ''
                  } ${isStartDate(day) ? 'start-date' : ''
                  } ${isEndDate(day) ? 'end-date' : ''}`}
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


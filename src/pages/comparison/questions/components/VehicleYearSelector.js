import React, { useState, useEffect, useRef } from 'react';

const VehicleYearSelector = ({ onYearSelect }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const [selectedYear, setSelectedYear] = useState(null);
  const selectorRef = useRef(null);

  useEffect(() => {
    if (selectorRef.current) {
      selectorRef.current.scrollTop = 0;
    }
  }, []);

  const handleYearClick = (year) => {
    setSelectedYear(year);
    if (onYearSelect) {
      onYearSelect(year);
    }
  };

  return (
    <div className="vys-container">
      <h2 className="vys-title">Select Vehicle Year</h2>
      <div className="vys-selector" ref={selectorRef}>
        {years.map((year) => (
          <div
            key={year}
            className={`vys-year ${selectedYear === year ? 'vys-selected' : ''}`}
            onClick={() => handleYearClick(year)}
          >
            {year}
          </div>
        ))}
      </div>
      {selectedYear && (
        <div className="vys-selected-year">
          Selected Year: <span>{selectedYear}</span>
        </div>
      )}
    </div>
  );
};

export default VehicleYearSelector;
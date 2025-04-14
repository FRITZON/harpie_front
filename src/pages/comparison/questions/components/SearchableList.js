import React, { useState } from 'react';

const SearchableList = ({ list, onSelect, questionId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isListVisible, setIsListVisible] = useState(false); 

  const filteredList = list.filter(item => {
    return item.value && item.value.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setIsListVisible(true); 
  };

  const handleSelect = (item) => {
    if (item) {
      setSelectedItem(item);
      onSelect(item.value); 
      setIsListVisible(false); 
    }
  };

  return (
    <div className="searchable-list">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        autoFocus
        onChange={handleSearch}
        onClick={() => setIsListVisible(true)} 
        className="searchable-list-input"
      />
      {isListVisible && (
        <div className="searchable-list-container">
          {filteredList.map((item) => (
            <div
              key={item.id}
              className={`searchable-list-item ${selectedItem === item ? 'selected' : ''}`}
              onClick={() => handleSelect(item)}
            >
              {item.value}
            </div>
          ))}
        </div>
      )}
      {selectedItem && (
        <div className="searchable-list-selected">
          Selected: <span className="selected-value">{selectedItem.value}</span>
        </div>
      )}
    </div>
  );
};

export default SearchableList;
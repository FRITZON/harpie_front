import React, { useState } from 'react';

const SearchableList = ({ list, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredList = list.filter(item =>
    item.value.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelect = (item) => {
    setSelectedItem(item);
    onSelect(item.value);
  };

  return (
    <div className="searchable-list">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        autoFocus
        onChange={handleSearch}
        className="searchable-list-input"
      />
      <div className="searchable-list-container">
        {filteredList.map((item) => (
          <div
            key={item.value}
            className={`searchable-list-item ${selectedItem === item ? 'selected' : ''}`}
            onClick={() => handleSelect(item)}
          >
            {item.value}
          </div>
        ))}
      </div>
      {selectedItem && (
        <div className="searchable-list-selected">
          Selected: <span className="selected-value">{selectedItem.value}</span>
        </div>
      )}
    </div>
  );
};

export default SearchableList;
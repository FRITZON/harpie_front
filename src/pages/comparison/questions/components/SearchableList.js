import React, { useState } from 'react';

const SearchableList = ({ list, onSelect, questionId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isListVisible, setIsListVisible] = useState(false); // État pour contrôler la visibilité de la liste

  const filteredList = list.filter(item => {
    return item.value && item.value.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setIsListVisible(true); // Afficher la liste lors de la saisie
  };

  const handleSelect = (item) => {
    if (item) {
      setSelectedItem(item);
      onSelect(questionId, item.value); // Passer l'ID et la valeur
      setIsListVisible(false); // Cacher la liste après sélection
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
        onClick={() => setIsListVisible(true)} // Afficher la liste lors du clic sur le champ
        className="searchable-list-input"
      />
      {isListVisible && (
        <div className="searchable-list-container">
          {filteredList.map((item) => (
            <div
              key={item.id} // Utilisez l'ID comme clé
              className={`searchable-list-item ${selectedItem === item ? 'selected' : ''}`}
              onClick={() => handleSelect(item)} // Appel à handleSelect avec l'item
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
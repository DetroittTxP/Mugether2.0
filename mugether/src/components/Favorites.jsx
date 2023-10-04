import React, { useState } from 'react';

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addToFavorites = () => {
    if (inputValue.trim() !== '') {
      setFavorites([...favorites, inputValue]);
      setInputValue('');
    }
  };

  const removeFromFavorites = (index) => {
    const newFavorites = [...favorites];
    newFavorites.splice(index, 1);
    setFavorites(newFavorites);
  };

  return (
    <div>
      <h2>My Favorites</h2>
      <div>
        <input
          type="text"
          placeholder="Add an item"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={addToFavorites}>Add to Favorites</button>
      </div>
      <ul>
        {favorites.map((favorite, index) => (
          <li key={index}>
            {favorite}
            <button onClick={() => removeFromFavorites(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Favorites;

import React, { useContext } from 'react';
import StarWarContext from '../context/StarWarContext';

function NameInput() {
  const { filterName, handleChange } = useContext(StarWarContext);
  const { filterByName } = filterName;
  const { name } = filterByName;

  return (
    <div>
      <label htmlFor="name-filter">
        Search Name:
        <input
          type="text"
          data-testid="name-filter"
          value={ name }
          onChange={ handleChange }
          id="name-filter"
        />
      </label>
    </div>
  );
}

export default NameInput;

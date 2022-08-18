import React, { useState } from 'react';
import Proptypes from 'prop-types';
import StarWarContext from './StarWarContext';

function StarWarsProvider({ children }) {
  const [filterName, setFilterName] = useState({
    filterByName: {
      name: '',
    },
  });

  const handleChange = ({ target }) => {
    const { value } = target;
    setFilterName({
      filterByName: {
        name: value,
      },
    });
  };

  return (
    <StarWarContext.Provider value={ { filterName, handleChange } }>
      {children}
    </StarWarContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: Proptypes.objectOf(),
}.isRequired;

export default StarWarsProvider;

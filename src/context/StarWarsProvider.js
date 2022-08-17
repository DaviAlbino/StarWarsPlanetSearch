import React from 'react';

import StarWarContext from './StarWarContext';

function StarWarsProvider({ children }) {
  <StarWarContext.Provider>
    {children}
  </StarWarContext.Provider>;
}

export default StarWarsProvider;

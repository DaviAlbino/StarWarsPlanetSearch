import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import StarWarsProvider from './context/StarWarsProvider';

ReactDOM.render(
  <StarWarsProvider>
    <App />
  </StarWarsProvider>,
  document.getElementById('root'),
);

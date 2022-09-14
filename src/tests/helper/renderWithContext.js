import React from 'react';
import { render } from '@testing-library/react';
import StarWarsProvider from '../../context/StarWarsProvider';

const renderWithContext = (component) => {
  return (
    render(
      <StarWarsProvider>
          {component}
      </ StarWarsProvider>,
    )
  )
};
export default renderWithContext;
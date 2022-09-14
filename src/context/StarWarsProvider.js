import React, { useState, useEffect } from 'react';
import Proptypes from 'prop-types';
import StarWarContext from './StarWarContext';

const ENDPOINT = 'https://swapi-trybe.herokuapp.com/api/planets/';

function StarWarsProvider({ children }) {
  const [planetsInfo, setPlanetsInfo] = useState([]);

  const [filterName, setFilterName] = useState({
    filterByName: {
      name: '',
    },
  });

  const [filterPlanet, setFilterPlanet] = useState({
    coluna: 'population',
    operador: 'maior que',
    valor: 0,
  });

  const [columnsOptions, setColumnsOptions] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  const handleChange = ({ target }) => {
    const { value } = target;
    setFilterName({
      filterByName: {
        name: value,
      },
    });
  };

  useEffect(() => {
    const getPlanetsList = async () => {
      const data = await fetch(ENDPOINT).then((response) => response.json());
      setPlanetsInfo(data.results);
    };
    getPlanetsList();
  }, []);

  return (
    <StarWarContext.Provider
      value={ {
        filterName,
        handleChange,
        columnsOptions,
        setColumnsOptions,
        planetsInfo,
        setPlanetsInfo,
        filterPlanet,
        setFilterPlanet,
      } }
    >
      {children}
    </StarWarContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: Proptypes.objectOf(),
}.isRequired;

export default StarWarsProvider;

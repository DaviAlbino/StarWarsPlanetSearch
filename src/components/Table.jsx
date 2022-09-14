import React, { useEffect, useState, useContext } from 'react';
import StarWarContext from '../context/StarWarContext';

const ENDPOINT = 'https://swapi-trybe.herokuapp.com/api/planets/';

function Table() {
  const [planetsInfo, setPlanetsInfo] = useState([]);

  const { filterName, columnsOptions, setColumnsOptions } = useContext(StarWarContext);
  const { filterByName } = filterName;
  const { name: inputName } = filterByName;
  const [filterPlanet, setFilterPlanet] = useState({
    coluna: 'population',
    operador: 'maior que',
    valor: 0,
  });
  const { coluna, operador, valor } = filterPlanet;

  useEffect(() => {
    const getPlanetsList = async () => {
      const data = await fetch(ENDPOINT).then((response) => response.json());
      setPlanetsInfo(data.results);
    };
    getPlanetsList();
  }, []);

  // console.log(data);

  function handleFilterPlanet({ target }) {
    const { value, name } = target;
    setFilterPlanet({ ...filterPlanet, [name]: value });
  }

  function filterSelector() {
    const result = planetsInfo.filter((planet) => {
      if (operador === 'maior que') {
        return Number(planet[coluna]) > Number(valor);
      }
      if (operador === 'menor que') {
        return Number(planet[coluna]) < Number(valor);
      }
      if (operador === 'igual a') {
        return Number(planet[coluna]) === Number(valor);
      }
      return planet;
    });
    setPlanetsInfo(result);
    const newColumnFilter = columnsOptions.filter((column) => column !== coluna);
    setColumnsOptions(newColumnFilter);
  }

  return (
    <div>
      <label htmlFor="filterPlanet">
        <select
          data-testid="column-filter"
          value={ coluna }
          name="coluna"
          onChange={ handleFilterPlanet }
        >
          { columnsOptions.map((option, index) => (
            <option key={ index }>{ option }</option>
          )) }
        </select>
        <select
          data-testid="comparison-filter"
          value={ operador }
          name="operador"
          onChange={ handleFilterPlanet }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          data-testid="value-filter"
          name="valor"
          type="number"
          value={ valor }
          onChange={ handleFilterPlanet }
        />
        <button
          data-testid="button-filter"
          type="button"
          onClick={ filterSelector }
        >
          Filtrar
        </button>
      </label>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          { planetsInfo && planetsInfo
            .filter((planet) => planet.name.includes(inputName)).map((planet, index) => (
              <tr key={ index }>
                <td>{planet.name}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.diameter}</td>
                <td>{planet.climate}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
                <td>{planet.films}</td>
                <td>{planet.created}</td>
                <td>{planet.edited}</td>
                <td>{planet.url}</td>
              </tr>
            )) }
        </tbody>
      </table>

    </div>
  );
}

export default Table;

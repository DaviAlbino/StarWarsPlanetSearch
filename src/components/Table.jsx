import React, { useContext, useState } from 'react';
import StarWarContext from '../context/StarWarContext';

function Table() {
  const { filterName,
    columnsOptions,
    setColumnsOptions,
    planetsInfo,
    setPlanetsInfo,
    filterPlanet,
    setFilterPlanet,
  } = useContext(StarWarContext);

  const [showFilters, setShowFilters] = useState([]);

  const { filterByName } = filterName;
  const { name: inputName } = filterByName;

  function handleFilterPlanet({ target }) {
    const { value, name } = target;
    setFilterPlanet({ ...filterPlanet, [name]: value });
  }

  // function filterSelector() {
  //   const { coluna, operador, valor } = filterPlanet;
  //   // const result = planetsInfo.filter((planet) => {
  //   //   if (operador === 'maior que') {
  //   //     return Number(planet[coluna]) > Number(valor);
  //   //   }
  //   //   if (operador === 'menor que') {
  //   //     return Number(planet[coluna]) < Number(valor);
  //   //   }
  //   //   if (operador === 'igual a') {
  //   //     return Number(planet[coluna]) === Number(valor);
  //   //   }
  //   //   // return planet[coluna];
  //   //   // return planet[coluna];
  //   // });

  //   const result = planetsInfo.filter((planet) => {
  //     if (operador === 'maior que') {
  //       return Number(planet[coluna]) > Number(valor);
  //     }
  //     if (operador === 'menor que') {
  //       return Number(planet[coluna]) < Number(valor);
  //     }
  //     if (operador === 'igual a') {
  //       return Number(planet[coluna]) === Number(valor);
  //     }
  //     // return planet[coluna];
  //     // return planet[coluna];
  //   });
  //   setPlanetsInfo(result);
  //   const newColumnFilter = columnsOptions.filter((column) => column !== coluna);
  //   setFilterPlanet({ ...filterPlanet, coluna: newColumnFilter[0] });
  //   setColumnsOptions(newColumnFilter);
  //   setShowFilters([...showFilters, filterPlanet]);
  // }

  function filterSelector() {
    const { coluna, operador, valor } = filterPlanet;
    const result = planetsInfo.filter((planet) => {
      let data;
      if (operador === 'maior que') {
        data = Number(planet[coluna]) > Number(valor);
      }
      if (operador === 'menor que') {
        data = Number(planet[coluna]) < Number(valor);
      }
      if (operador === 'igual a') {
        data = Number(planet[coluna]) === Number(valor);
      }
      return data;
      // return planet[coluna];
    });

    setPlanetsInfo(result);
    const newColumnFilter = columnsOptions.filter((column) => column !== coluna);
    setFilterPlanet({ ...filterPlanet, coluna: newColumnFilter[0] });
    setColumnsOptions(newColumnFilter);
    setShowFilters([...showFilters, filterPlanet]);
  }

  async function deleteFilter(col) {
    const ENDPOINT = 'https://swapi-trybe.herokuapp.com/api/planets/';
    const data = await fetch(ENDPOINT).then((response) => response.json());
    let global = data.results;

    const newShowFilters = showFilters.filter((option) => option.coluna !== col);
    setColumnsOptions([...columnsOptions, col]);
    setShowFilters(newShowFilters);

    newShowFilters.forEach((show) => {
      const { coluna, operador, valor } = show;
      if (operador === 'maior que') {
        global = global.filter((info) => info[coluna] > Number(valor));
      }
      if (operador === 'menor que') {
        global = global.filter((info) => info[coluna] < Number(valor));
      }
      if (operador === 'igual a') {
        global = global.filter((info) => info[coluna] === Number(valor));
      }
    });
    setPlanetsInfo(global);
    console.log('li', planetsInfo);
  }

  async function deleteAll() {
    const ENDPOINT = 'https://swapi-trybe.herokuapp.com/api/planets/';
    const data = await fetch(ENDPOINT).then((response) => response.json());
    setPlanetsInfo(data.results);
    setShowFilters([]);
    setColumnsOptions([
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ]);
    console.log('pl', planetsInfo);
  }

  return (
    <div>
      <label htmlFor="filterPlanet">
        <select
          data-testid="column-filter"
          value={ filterPlanet.coluna }
          name="coluna"
          onChange={ handleFilterPlanet }
        >
          { columnsOptions.map((option, index) => (
            <option key={ index }>{ option }</option>
          )) }
        </select>
        <select
          data-testid="comparison-filter"
          value={ filterPlanet.operador }
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
          value={ filterPlanet.valor }
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
      { showFilters && showFilters.map((myFilter, index) => (
        <span data-testid="filter" key={ index }>
          { myFilter.coluna }
          { myFilter.operador }
          { myFilter.valor }
          <button
            type="button"
            onClick={ () => deleteFilter(myFilter.coluna) }
          >
            Apagar
          </button>
        </span>
      )) }
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ deleteAll }
      >
        Remover filtros
      </button>
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
              <tr key={ index } data-testid="table-read">
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

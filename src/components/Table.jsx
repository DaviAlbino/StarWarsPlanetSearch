import React, { useEffect, useState } from 'react';

const ENDPOINT = 'https://swapi-trybe.herokuapp.com/api/planets/';

function Table() {
  const [planetsInfo, setPlanetsInfo] = useState([]);

  useEffect(() => {
    const getPlanetsList = async () => {
      const data = await fetch(ENDPOINT).then((response) => response.json());
      setPlanetsInfo(data);
    };
    getPlanetsList();
  }, []);

  const { results } = planetsInfo;
  return (
    <div>
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
          { results && results.map((planet, index) => (
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
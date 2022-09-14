import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import renderWithContext from './helper/renderWithContext';
import userEvent from '@testing-library/user-event';
import mockFetch from './helper/mockFetch';

describe('Testar a aplicação Star Wars', () => {
  beforeEach(() => jest.resetAllMocks())
  it('Testando os elementos da tela', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockFetch)
    }))
    renderWithContext(<App />);
    const nameInput = screen.getByTestId(/name-filter/i);
    const filterButton = screen.getByTestId(/button-filter/i);
    const removeFilter = screen.getByTestId(/button-remove-filters/i);
    const selectFilter = screen.getByTestId(/comparison-filter/i)
    const title = screen.getByText(/Hello, App!!/i)
    const table = screen.getByRole('table')
    expect(nameInput).toBeInTheDocument();
    expect(filterButton).toBeInTheDocument();
    expect(removeFilter).toBeInTheDocument();
    expect(selectFilter).toBeInTheDocument();
    expect(table).toBeInTheDocument();
    expect(title).toBeInTheDocument()
    const Tatooine = await screen.findByText(/Tatooine/i)
    const kamino = await screen.findByText(/Kamino/i)

    
  });

  it('Testando NameInput', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockFetch)
    }))
    renderWithContext(<App />);
    await waitFor(() => {
      expect(screen.getByText('Endor')).toBeInTheDocument()
    }, {
      timeout: 2500,
    });

    const nameInput = screen.getByTestId(/name-filter/i);
    const column = screen.getByTestId(/column-filter/i)
    const comparison = screen.getByTestId(/comparison-filter/i)
    const value = screen.getByTestId(/value-filter/i)
    const filterButton = screen.getByTestId(/button-filter/i);
    const removeFilter = screen.getByTestId(/button-remove-filters/i);

    const coruscant = screen.getByText('Coruscant')
    const unknown = screen.getAllByText(/unknown/i)
    expect(unknown).toHaveLength(3)
    userEvent.type(nameInput, 'oo')
    expect(coruscant).not.toBeInTheDocument();
    userEvent.clear(nameInput)
    userEvent.selectOptions(column, 'surface_water')
    userEvent.selectOptions(comparison, 'igual a')
    userEvent.clear(value)
    userEvent.type(value, '10')
    userEvent.click(filterButton)

    const water = screen.getByText(/surface_water/i)
    expect(water).toBeInTheDocument()

    const singleFilter = screen.getByText(/apagar/i);
    userEvent.click(singleFilter);
    userEvent.selectOptions(column, 'diameter')
    userEvent.selectOptions(comparison, 'maior que')
    userEvent.clear(value)
    userEvent.type(value, '12000')
    userEvent.click(filterButton)
    userEvent.selectOptions(column, 'orbital_period')
    userEvent.selectOptions(comparison, 'menor que')
    userEvent.clear(value)
    userEvent.type(value, '450')
    userEvent.click(filterButton)
    userEvent.click(removeFilter)
  });

  it('Testando a chamada da api', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockFetch)
    }))

    const ENDPOINT = 'https://swapi-trybe.herokuapp.com/api/planets/';
    await fetch(ENDPOINT).then((response) => response.json());

    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith(ENDPOINT)
  });

  it('Testese Filtro igual a', async() => {
    global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve(mockFetch)
    }))
  
    renderWithContext(<App />);
  
  // await waitFor(() => expect(fetch).toBeCalled())
  const btn =  screen.getByTestId("button-filter")
  expect(btn).toBeInTheDocument()
  
  
  const getTagSelect = screen.getByTestId("column-filter")
  expect(getTagSelect).toBeInTheDocument()
  
  
  const btn2 =  screen.getByTestId("button-filter")
  userEvent.selectOptions(getTagSelect, 'surface_water')
  const getTagSelect2 = screen.getByTestId("comparison-filter")
  userEvent.selectOptions(getTagSelect2,'igual a' )
  expect(getTagSelect2).toHaveValue('igual a')
  expect(getTagSelect).toHaveValue('surface_water')
  const btn3 =  screen.getByTestId("value-filter")
  userEvent.type(btn3,'12')
  expect(btn3).toHaveValue(12)
  userEvent.click(btn)
  const text1 = await screen.findByText(/Naboo/i)
  expect(text1).toBeInTheDocument()
  const singleFilter = screen.getByTestId('filter')
  expect(singleFilter).toBeInTheDocument()
  
  // expect(btn2).toBeInTheDocument()
  // expect(getTagSelect2).toBeInTheDocument()
  
  })
  
  it('Testese Filtro menor que', async() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockFetch)
  }))

  renderWithContext(<App />);
  
  await waitFor(() => expect(fetch).toBeCalled())
  const btn =  screen.getByTestId("button-filter")
  expect(btn).toBeInTheDocument()
  
  
  const getTagSelect = screen.getByTestId("column-filter")
  expect(getTagSelect).toBeInTheDocument()
  
  
  const btn2 =  screen.getByTestId("button-filter")
  userEvent.selectOptions(getTagSelect, 'surface_water')
  const getTagSelect2 = screen.getByTestId("comparison-filter")
  userEvent.selectOptions(getTagSelect2,'menor que' )
  expect(getTagSelect2).toHaveValue('menor que')
  expect(getTagSelect).toHaveValue('surface_water')
  const btn3 =  screen.getByTestId("value-filter")
  userEvent.type(btn3,'12')
  expect(btn3).toHaveValue(12)
  userEvent.click(btn)
  const text1 = screen.getByText(/Tatooine/i)
  expect(text1).toBeInTheDocument()
  const singleFilter = screen.getByTestId('filter')
  expect(singleFilter).toBeInTheDocument()
  
  // expect(btn2).toBeInTheDocument()
  // expect(getTagSelect2).toBeInTheDocument()
  
  })

  it('Testese Filtro maior que', async() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockFetch)
  }))

  renderWithContext(<App />);
  
  await waitFor(() => expect(fetch).toBeCalled())
  const btn =  screen.getByTestId("button-filter")
  expect(btn).toBeInTheDocument()
  
  
  const getTagSelect = screen.getByTestId("column-filter")
  expect(getTagSelect).toBeInTheDocument()
  
  
  const btn2 =  screen.getByTestId("button-filter")
  userEvent.selectOptions(getTagSelect, 'surface_water')
  const getTagSelect2 = screen.getByTestId("comparison-filter")
  userEvent.selectOptions(getTagSelect2,'maior que' )
  expect(getTagSelect2).toHaveValue('maior que')
  expect(getTagSelect).toHaveValue('surface_water')
  const btn3 =  screen.getByTestId("value-filter")
  userEvent.type(btn3,'12')
  expect(btn3).toHaveValue(12)
  userEvent.click(btn)
  const text1 = screen.getByText(/Alderaan/i)
  expect(text1).toBeInTheDocument()

  const singleFilter = screen.getByTestId('filter')
  expect(singleFilter).toBeInTheDocument()
  
  // expect(btn2).toBeInTheDocument()
  // expect(getTagSelect2).toBeInTheDocument()
  
  })

  it('Testese renderiza o botao e os textos', async() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockFetch)
  }))

  renderWithContext(<App />);

  await waitFor(() => expect(fetch).toBeCalled());
  const Tatooine = await screen.findByText(/Tatooine/i)
  expect(Tatooine).toBeInTheDocument()
  const Alderaan = await screen.findByText(/Alderaan/i)
  expect(Alderaan).toBeInTheDocument()
  const YavinIV = await screen.findByText(/Yavin IV/i)
  expect(YavinIV).toBeInTheDocument()
  const Hoth = await screen.findByText(/Hoth/i)
  expect(Hoth).toBeInTheDocument()
  });

  it('Testese Filtro maior que', async() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockFetch)
    }))

    renderWithContext(<App />);
  
    await waitFor(() => expect(fetch).toBeCalled())
    const btn =  screen.getByTestId("button-filter")
    expect(btn).toBeInTheDocument()
    
    
    const getTagSelect = screen.getByTestId("column-filter")
    expect(getTagSelect).toBeInTheDocument()
  
  
    // const btn2 =  screen.getByTestId("button-filter")
    userEvent.selectOptions(getTagSelect, 'surface_water')
    const getTagSelect2 = screen.getByTestId("comparison-filter")
    userEvent.selectOptions(getTagSelect2,'maior que' )
    expect(getTagSelect2).toHaveValue('maior que')
    expect(getTagSelect).toHaveValue('surface_water')
    const btn3 =  screen.getByTestId("value-filter")
    userEvent.type(btn3,'12')
    expect(btn3).toHaveValue(12)
    userEvent.click(btn)
    const text1 = screen.getByText(/Alderaan/i)
    expect(text1).toBeInTheDocument()
    const singleFilter = screen.getByTestId('filter')
    expect(singleFilter).toBeInTheDocument()
    const newBtn = screen.getByRole('button', { name: 'Apagar' })
    expect(newBtn).toBeInTheDocument();
    expect(singleFilter).toHaveTextContent(/surface_watermaior que012Apagar/i)
  
  });

  it('Testando o botão de "Remover Filtros"', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockFetch)
    }));

    renderWithContext(<App />);

    const columnInput = screen.getByTestId("column-filter");
    const operatorInput = screen.getByTestId("comparison-filter");
    const valueInput = screen.getByTestId("value-filter");
    const btnToFilter = screen.getByTestId("button-filter");
    const removeFiltersBtn = screen.getByTestId("button-remove-filters");

    userEvent.selectOptions(columnInput, "surface_water");
    userEvent.selectOptions(operatorInput, "igual a");
    userEvent.type(valueInput, "8");
    
    const filteredRows = await screen.findAllByTestId("table-read");
    userEvent.click(btnToFilter);
    expect(screen.getAllByTestId('table-read')).toHaveLength(3);

    userEvent.selectOptions(operatorInput, "menor que");
    userEvent.type(valueInput, "2000");
    userEvent.click(btnToFilter);
    expect(screen.getAllByTestId('table-read')).toHaveLength(1);


    // filteredRows = screen.getAllByRole("row");
    // expect(filteredRows).toHaveLength(1);

    userEvent.click(removeFiltersBtn);

    const filteredRows2 = await screen.findAllByTestId('table-read');
    expect(screen.getAllByTestId('table-read')).toHaveLength(10);
  });

  it('Verifica se é possível remover um filtro ao clicar no \'x\'', async () => {

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockFetch)
    }));

    const { debug } = renderWithContext(<App />);

    const column4 = screen.getByTestId('column-filter');
    const comparison4 = screen.getByTestId('comparison-filter');
    const value4 = screen.getByTestId('value-filter');
    const buttonFilter4 = screen.getByTestId('button-filter');
    // const buttonXFilter = screen.getByTestId('button-remove-filters');

    userEvent.selectOptions(column4, 'orbital_period');
    userEvent.selectOptions(comparison4, 'maior que');
    userEvent.type(value4, '304');
    const filteredRows = await screen.findAllByTestId("table-read");
    expect(filteredRows).toHaveLength(10)
    userEvent.click(buttonFilter4);
    expect(screen.getAllByTestId('table-read')).toHaveLength(9);

    userEvent.selectOptions(column4, 'population');
    userEvent.selectOptions(comparison4, 'menor que');
    userEvent.type(value4, '4500000000');
    const filteredRows1 = await screen.findAllByTestId("table-read");
    expect(filteredRows1).toHaveLength(9)
    await waitFor(() => {
      userEvent.click(buttonFilter4);
    })
    // debug();
    expect(await screen.findAllByTestId('table-read')).toHaveLength(7);

    userEvent.selectOptions(column4, 'rotation_period');
    userEvent.selectOptions(comparison4, 'igual a');
    userEvent.type(value4, '18');
    const filteredRows3 = await screen.findAllByTestId("table-read");
    expect(filteredRows3).toHaveLength(7)
    userEvent.click(buttonFilter4);
    // expect(screen.getByTestId('table-read')).toHaveLength(1);

    const singleFilter = screen.getAllByTestId('filter')
    expect(singleFilter).toHaveLength(3)
    const newBtn = screen.getAllByRole('button', { name: 'Apagar' })
    expect(newBtn).toHaveLength(3);
    // expect(singleFilter).toHaveTextContent(/surface_waterigual a040Apagar/i)
    userEvent.click(newBtn[0]);

    // const filteredRows2 = await screen.findAllByTestId('table-read');
    // expect(screen.getAllByTestId('table-read')).toHaveLength(10);
    // expect(screen.getByRole('button', { name: 'Apagar' })).not.toBeInTheDocument()
  });

  it('Testando Filtro default', async() => {
    global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve(mockFetch)
    }))
  
    renderWithContext(<App />);
  
  // await waitFor(() => expect(fetch).toBeCalled())
  
  
  const getTagSelect = screen.getByTestId("column-filter")
  expect(getTagSelect).toBeInTheDocument()
  
  
  // const btn2 =  screen.getByTestId("button-filter")
  // userEvent.selectOptions(getTagSelect, 'surface_water')
  const getTagSelect2 = screen.getByTestId("comparison-filter")
  // userEvent.selectOptions(getTagSelect2,'igual a' )
  expect(getTagSelect2).toHaveValue('maior que')
  expect(getTagSelect).toHaveValue('population')
  const btn3 =  screen.getByTestId("value-filter")

  const filteredRows = await screen.findAllByTestId("table-read");
  expect(filteredRows).toHaveLength(10)

  const btn =  screen.getByTestId("button-filter")
  expect(btn).toBeInTheDocument()
  // userEvent.type(btn3,'12')
  expect(btn3).toHaveValue(0)
  userEvent.click(btn)
  expect(screen.getAllByTestId('table-read')).toHaveLength(8)
  const text1 = await screen.findByText(/Tatooine/i)
  expect(text1).toBeInTheDocument()
  const singleFilter = screen.getByTestId('filter')
  expect(singleFilter).toBeInTheDocument()
  

  
  })
 

});

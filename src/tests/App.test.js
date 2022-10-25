import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import App from '../App';
import testData from '../../cypress/mocks/testData';
import MyContext from '../context/MyContext';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';



describe('test App', () => {
  test('elements', () => {
    render(<App />)

    const pesquisar =screen.getByRole('searchbox', {
      name: /pesquisar:/i
    })

    const number = screen.getByRole('spinbutton')

    const button = screen.getByRole('button', {
      name: /adicionar filtro/i
    })

    const select = screen.getByTestId('column-filter')

    expect(pesquisar).toBeInTheDocument();
    expect(number).toBeInTheDocument();
    expect(select).toBeInTheDocument();
  })

  test('functions', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(testData),
    }));
    await act(async () => {
      render(<MyContext><App /></MyContext>);
    });

    // waitForElementToBeRemoved( screen.findByTestId('loading'))

    const element = await screen.getByText('Tatooine')

    const pesquisar = await screen.findByRole('searchbox', {
      name: /pesquisar:/i
    });

    userEvent.type(pesquisar, 'Tatooine')

    expect(element).toBeInTheDocument();

    const dropdown = screen.getByTestId('column-filter')

    userEvent.selectOptions(dropdown, ['population'])

    const dropdownComparison = screen.getByTestId('comparison-filter')

    userEvent.selectOptions(dropdownComparison, ['menor que'])

    const numberFilter = screen.getByTestId('value-filter')

    userEvent.type(numberFilter, '1001')

    const buttonAdd = screen.getByRole('button', {
      name: /adicionar filtro/i
    });

    userEvent.click(buttonAdd)

    const planet = await screen.findByRole('cell', {
      name: /yavin iv/i
    })
    expect(planet).toBeInTheDocument()

    const radioButtonAsc = screen.getByTestId('column-sort-input-asc')

    userEvent.click(radioButtonAsc)

    const orderButton = screen.getByRole('button', {
      name: /ordenar/i
    })

    userEvent.click(orderButton)

    const planets = await screen.findAllByTestId('planet-name')

    expect(planets[0].innerHTML).toBe('Tatooine')

    const radioButtonDsc = screen.getByTestId('column-sort-input-desc')

    userEvent.click(radioButtonDsc)

    userEvent.click(orderButton)

    expect(planets[0].innerHTML).toBe('Tatooine')
  })
})

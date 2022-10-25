import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import App from '../App';
import data from '../services/data';
import userEvent from '@testing-library/user-event';



describe('test App', () => {
  test('elements', () => {
    global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(data),
    })
  );
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
    render(<App />);

    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(global.fetch).toHaveBeenCalledWith('https://swapi.dev/api/planets')

    const element = screen.getByRole('cell', {
      name: /tatooine/i
    });

    const elementRemove = screen.getByRole('cell', {
      name: /alderaan/i
    });

    const pesquisar = screen.getByRole('searchbox', {
      name: /pesquisar:/i
    });

    userEvent.type(pesquisar, 'Tatooine')

    expect(element).toBeInTheDocument();
  })
})

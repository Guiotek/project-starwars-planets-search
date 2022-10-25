import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import MyContext, { Context } from '../context/MyContext';


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

    expect(pesquisar).toBeInTheDocument();
    expect(number).toBeInTheDocument();
    expect(number).toBeInTheDocument();
  })

  test('functions', async () => {
    render(<App />);

    await waitForElementToBeRemoved(screen.getByTestId('loading'));

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

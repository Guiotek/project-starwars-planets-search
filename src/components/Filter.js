import React, { useState, useContext } from 'react';
import { Context } from '../context/MyContext';

function Filter() {
  const [valueNow, setValueNow] = useState({
    inputValue: '',
  });
  const [filterNumber, setFilterNumber] = useState({
    optionOne: 'population',
    optionTwo: 'maior que',
    number: 0,
  });

  const { filterValuechange, setFilterNumberActive } = useContext(Context);
  const { inputValue } = valueNow;

  const searchOnChange = ({ target }) => {
    console.log('Valor:', target);
    setValueNow((state) => ({
      ...state,
      inputValue: target.value,
    }));
    filterValuechange(target.value);
  };

  const filterNumberChange = ({ target }) => {
    const { name } = target;
    const { value } = target;
    setFilterNumber((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const onClickFilter = () => {
    setFilterNumberActive((state) => ({
      ...state,
      optionOne: filterNumber.optionOne,
      optionTwo: filterNumber.optionTwo,
      number: Number(filterNumber.number),
      filterOn: true,
    }));
  };

  return (
    <div>
      <label htmlFor="inputSearch">
        Pesquisar:
        <input
          type="search"
          id="inputSearch"
          data-testid="name-filter"
          onChange={ searchOnChange }
          value={ inputValue }
        />
      </label>
      <br />
      <label htmlFor="filterCase">
        <select
          id="filterCase"
          name="optionOne"
          data-testid="column-filter"
          onChange={ filterNumberChange }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>
      <label htmlFor="filterLength">
        <select
          id="filterLength"
          data-testid="comparison-filter"
          name="optionTwo"
          onChange={ filterNumberChange }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="numberFilter">
        <input
          type="number"
          id="numberFilter"
          name="number"
          value={ filterNumber.number }
          data-testid="value-filter"
          onChange={ filterNumberChange }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ onClickFilter }
      >
        Adicionar filtro
      </button>
    </div>
  );
}

export default Filter;

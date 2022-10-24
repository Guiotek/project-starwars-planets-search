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

  const [optionDisabled, setOptionDisabled] = useState({
    population: false,
    orbital_period: false,
    diameter: false,
    rotation_period: false,
    surface_water: false,
  });

  const {
    filterValuechange,
    setFilterNumberActive,
    setFilterActivate,
    filterValuechangeOff,
    setValueSort,
  } = useContext(Context);

  const { inputValue } = valueNow;

  const searchOnChange = ({ target }) => {
    setValueNow((state) => ({
      ...state,
      inputValue: target.value,
    }));
    if (target.value !== '') {
      filterValuechange(target.value);
    } else {
      filterValuechangeOff();
    }
  };

  const filterNumberChange = ({ target }) => {
    const { name } = target;
    const { value } = target;
    setFilterNumber((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const sortOnChange = ({ target }) => {
    const { name, value } = target;
    setValueSort((s) => ({
      ...s,
      [name]: value,
      isSort: true,
    }));
  };

  const ClickSort = () => {
    setValueSort((s) => ({
      ...s,
      isSort: false,
    }));
  };

  const onClickFilter = () => {
    setFilterNumberActive((state) => ([
      ...state,
      {
        optionOne: filterNumber.optionOne,
        optionTwo: filterNumber.optionTwo,
        number: Number(filterNumber.number),
      },
    ]));
    setFilterActivate(true);
    switch (filterNumber.optionOne) {
    case 'population':
      setOptionDisabled((s) => ({
        ...s,
        population: true,
      }));
      break;
    case 'orbital_period':
      setOptionDisabled((s) => ({
        ...s,
        orbitalPeriod: true,
      }));
      break;
    case 'diameter':
      setOptionDisabled((s) => ({
        ...s,
        diameter: true,
      }));
      break;
    case 'rotation_period':
      setOptionDisabled((s) => ({
        ...s,
        rotationPeriod: true,
      }));
      break;
    case 'surface_water':
      setOptionDisabled((s) => ({
        ...s,
        surfaceWater: true,
      }));
      break;
    default:
      return undefined;
    }
  };

  const {
    population,
    orbitalPeriod,
    diameter,
    rotationPeriod,
    surfaceWater,
  } = optionDisabled;

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
          {!population && <option value="population">population</option>}
          {!orbitalPeriod && <option value="orbital_period">orbital_period</option>}
          {!diameter && <option disabled={ diameter } value="diameter">diameter</option>}
          {!rotationPeriod && <option value="rotation_period">rotation_period</option>}
          {!surfaceWater && <option value="surface_water">surface_water</option>}
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
      <select
        data-testid="column-sort"
        name="column"
        onChange={ sortOnChange }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <label htmlFor="Asc">
        <input
          type="radio"
          id="Asc"
          value="ASC"
          name="sorte"
          onChange={ sortOnChange }
          data-testid="column-sort-input-asc"
        />
        Ascendente
        <input
          type="radio"
          id="Asc"
          value="DESC"
          name="sorte"
          onChange={ sortOnChange }
          data-testid="column-sort-input-desc"
        />
        Descendente
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ ClickSort }
      >
        Ordenar

      </button>
    </div>
  );
}

export default Filter;

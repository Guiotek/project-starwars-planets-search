import React, { useState, useContext } from 'react';
import { Context } from '../context/MyContext';

function Filter() {
  const [valueNow, setValueNow] = useState({
    inputValue: '',
  });

  const { filterValuechange } = useContext(Context);
  const { inputValue } = valueNow;

  const searchOnChange = ({ target }) => {
    console.log('Valor:', target);
    setValueNow((state) => ({
      ...state,
      inputValue: target.value,
    }));
    filterValuechange(target.value);
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
    </div>
  );
}

export default Filter;

import { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import fetchStarWars from '../services/fetchStarWars';
import filterSelect from '../services/filterSelect';
import sortFilter from '../services/sortFilter';

export const Context = createContext({});

function MyContext({ children }) {
  const [API, setApi] = useState({
    Api: {},
    isLoading: true,
  });
  const [filter, setIsFilter] = useState({
    isfilter: false,
    filterValue: '',
  });

  const [filterNumberActive, setFilterNumberActive] = useState([]);
  const [filterActivate, setFilterActivate] = useState(false);

  const filterValuechange = useCallback((param) => {
    setIsFilter({
      isfilter: true,
      filterValue: param,
    });
  }, []);

  const filterValuechangeOff = useCallback(() => {
    setIsFilter({
      isfilter: false,
    });
  }, []);

  const [valueSort, setValueSort] = useState({
    column: 'population',
    sorte: 'ASC',
    isSort: true,
  });

  const { isSort, column, sorte } = valueSort;
  const { filterValue } = filter;

  const { optionOne, optionTwo, number } = filterNumberActive;

  useEffect(() => {
    const fetchData = async () => {
      const ApiRequest = await fetchStarWars();
      let results = ApiRequest.map((e) => {
        delete e.residents;
        return e;
      });
      if (!isSort) {
        results = sortFilter(results, column, sorte);
      }
      if (filter.isfilter) {
        const a = results.filter((e) => e.name.includes(filterValue));
        setApi({
          Api: a,
          isLoading: false,
        });
      } else if (filterActivate) {
        let filtered = results;
        filterNumberActive.forEach((e) => {
          filtered = filterSelect(filtered, e.optionOne, e.optionTwo, e.number);
        });
        setApi((stateOld) => ({
          ...stateOld,
          Api: filtered,
          isLoading: false,
        }));
      } else {
        setApi((stateOld) => ({
          stateOld,
          Api: results,
          isLoading: false,
        }));
      }
    };
    fetchData();
  }, [
    filterValue,
    filter.isfilter,
    filterNumberActive, optionOne,
    optionTwo,
    number,
    filterActivate,
    isSort,
    column,
    sorte,
  ]);

  const initialValue = useMemo(() => ({
    API,
    filterValuechange,
    filterValuechangeOff,
    filterNumberActive,
    setFilterNumberActive,
    setFilterActivate,
    valueSort,
    setValueSort,
  }), [
    API,
    filterValuechange,
    setFilterNumberActive,
    filterNumberActive,
    filterValuechangeOff,
    valueSort,
    setValueSort,
  ]);

  return (
    <Context.Provider value={ initialValue }>
      {children}
    </Context.Provider>
  );
}

MyContext.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default MyContext;

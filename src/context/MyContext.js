import { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import fetchStarWars from '../services/fetchStarWars';
import filterSelect from '../services/filterSelect';

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

  console.log(filterNumberActive);

  const filterValuechange = useCallback((param) => {
    setIsFilter((stateOld) => ({
      ...stateOld,
      isfilter: true,
      filterValue: param,
    }));
  }, []);

  const { filterValue } = filter;

  const { optionOne, optionTwo, number } = filterNumberActive;

  useEffect(() => {
    const fetchData = async () => {
      const ApiRequest = await fetchStarWars();
      const results = ApiRequest.map((e) => {
        delete e.residents;
        return e;
      });
      if (filter.isfilter) {
        const a = results.filter((e) => e.name.includes(filterValue));
        setApi((stateOld) => ({
          ...stateOld,
          Api: a,
          isLoading: false,
        }));
      }
      if (filterActivate) {
        let filtered = results;
        filterNumberActive.forEach((e) => {
          filtered = filterSelect(filtered, e.optionOne, e.optionTwo, e.number);
          console.log(filtered);
        });
        if (filtered.length) {
          setApi((stateOld) => ({
            ...stateOld,
            Api: filtered,
            isLoading: false,
          }));
        } else {
          setApi((stateOld) => ({
            ...stateOld,
            Api: results,
            isLoading: false,
          }));
        }
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
  ]);

  const initialValue = useMemo(() => ({
    API,
    filterValuechange,
    filterNumberActive,
    setFilterNumberActive,
    setFilterActivate,
  }), [API, filterValuechange, setFilterNumberActive, filterNumberActive]);

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

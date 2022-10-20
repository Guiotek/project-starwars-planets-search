import { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import fetchStarWars from '../data/fetchStarWars';

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

  const filterValuechange = useCallback((param) => {
    setIsFilter((stateOld) => ({
      ...stateOld,
      isfilter: true,
      filterValue: param,
    }));
  }, []);

  const { filterValue } = filter;

  useEffect(() => {
    const fetchData = async () => {
      const ApiRequest = await fetchStarWars();
      const results = ApiRequest.map((e) => {
        delete e.residents;
        return e;
      });
      console.log(filter.isfilter);
      if (filter.isfilter) {
        const a = results.filter((e) => e.name.includes(filterValue));
        console.log('Filter Value:', a);
        setApi((stateOld) => ({
          stateOld,
          Api: a,
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
  }, [filterValue, filter.isfilter]);

  // const initialValue = useCallback(
  //   () => ({
  //     API,
  //     filterValuechange,
  //   }),
  //   [API, filterValuechange],
  // );
  const initialValue = useMemo(() => ({
    API, filterValuechange }), [API, filterValuechange]);

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

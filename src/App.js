// import React, { useContext, useEffect } from 'react';
import './App.css';
import Filter from './components/Filter';
import Table from './components/Table';
import MyContext from './context/MyContext';
// import fetchStarWars from './data/fetchStarWars';

function App() {
  return (
    <MyContext>
      <Filter />
      <Table />
    </MyContext>
  );
}

export default App;

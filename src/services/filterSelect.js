function filterSelect(results, optionOne, optionTwo, number) {
  let resultsFiltered = {};

  switch (optionTwo) {
  case 'maior que':
    resultsFiltered = results.filter((e) => {
      console.log(Number(e[optionOne]));
      return Number(e[optionOne]) > number;
    });
    break;
  case 'menor que':
    resultsFiltered = results.filter((e) => {
      console.log(Number(e[optionOne]));
      return Number(e[optionOne]) < number;
    });
    break;
  case 'igual a':
    resultsFiltered = results.filter((e) => {
      console.log(Number(e[optionOne]));
      return Number(e[optionOne]) === number;
    });
    break;
  default:
    return undefined;
  }

  return resultsFiltered;
}

export default filterSelect;

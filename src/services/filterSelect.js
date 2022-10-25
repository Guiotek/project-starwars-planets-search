function filterSelect(results, optionOne, optionTwo, number) {
  let resultsFiltered = {};
  switch (optionTwo) {
  case 'maior que':
    resultsFiltered = results.filter((e) => {
      console.log(Number(e[optionOne]));
      return Number(e[optionOne]) > Number(number);
    });
    break;
  case 'menor que':
    resultsFiltered = results.filter((e) => {
      console.log(Number(e[optionOne]));
      return Number(e[optionOne]) < Number(number);
    });
    break;
  case 'igual a':
    resultsFiltered = results.filter((e) => {
      console.log(Number(e[optionOne]));
      return Number(e[optionOne]) === Number(number);
    });
    break;
  default:
    return undefined;
  }

  return resultsFiltered;
}

export default filterSelect;

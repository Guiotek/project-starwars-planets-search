function filterSelect(results, optionOne, optionTwo, number) {
  let resultsFiltered = {};

  console.log(optionTwo);
  console.log(optionOne);
  console.log(results);
  console.log(number);

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

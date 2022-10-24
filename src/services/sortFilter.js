const sortFilter = (api, column, sort) => {
  if (sort === 'ASC') {
    return api.sort((a, b) => {
      if (b[column] === 'unknown') {
        const menosUm = -1;
        return menosUm;
      }
      return Number(a[column]) - Number(b[column]);
    });
  }
  if (sort === 'DESC') {
    return api.sort((a, b) => {
      if (b[column] === 'unknown') {
        const menosUm = -1;
        return menosUm;
      }
      return Number(b[column]) - Number(a[column]);
    });
  }
};

export default sortFilter;

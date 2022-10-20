const fetchStarWars = async () => {
  const request = await fetch('https://swapi.dev/api/planets');
  const requestJson = await request.json();
  return requestJson.results;
};

export default fetchStarWars;

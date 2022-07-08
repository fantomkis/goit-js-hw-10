export const fetchCountries = name => {
  fetch(`https://restcountries.com/v3.1/name/${name}`).then(response => {
    if (!response.ok) {
      throw 'Oops, there is no country with that name';
    }
    return response.json();
  });
};

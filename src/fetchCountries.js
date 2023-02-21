import { Notify } from 'notiflix/build/notiflix-notify-aio';
const url = `https://restcountries.com/v2/`;

function fetchCountries(name) {
  return fetch(
    `${url}name/${name}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error(
        Notify.failure('Oops, there is no country with that name')
      );
    }
    return response.json();
  });
}
export { fetchCountries };

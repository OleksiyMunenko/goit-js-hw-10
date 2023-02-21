import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');

inputEl.addEventListener('input', debounce(searchСountry, DEBOUNCE_DELAY));

function searchСountry() {
  const inputValue = inputEl.value.trim();
  countryList.innerHTML = '';
  if (inputValue !== '') {
    fetchCountries(inputValue)
      .then(data => {
        if (data.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (data.length === 0) {
          Notiflix.Notify.failure('Oops, there is no country with that name');
        } else if (data.length < 10 && data.length >= 2) {
          renderCountriesUl(data);
        } else if (data.length === 1) {
          renderCountry(data);
        }
      })
      .catch(error => {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      });
  }
}

function renderCountry(countries) {
  const markup = countries
    .map(country => {
      return `<div class="flag-and-name-wrap"><img src="${
        country.flags.svg
      }" alt=${country.name.official} width="50" height="25">
        <h2> ${country.name.official}</h2></div>
        <p class="country-text"><b>Capital :</b>${country.capital}</p>
        <p class="country-text"><b>Population :</b>${country.population}</p>
        <p class="country-text"><b>Languages :</b>${Object.values(country.languages).join(
          ', '
        )}</p>`;
    })
    .join('');
  countryList.innerHTML = markup;
}
function renderCountriesUl(countries) {
  const markup = countries
    .map(country => {
      return `<li class="country-item"><img src="${country.flags.svg}" alt=${country.name.official} width="50" height="25">
        <h2> ${country.name.official}</h2></li>`;
    })
    .join('');
  countryList.innerHTML = markup;
}

import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { createLongMarkup, createShortMarkup } from './renderCountries.js';
const input = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const DEBOUNCE_DELAY = 300;
let arrayOfCountryLanguages = [];

input.addEventListener('input', debounce(getCountry, DEBOUNCE_DELAY));

function getCountry(evt) {
  const countryName = evt.target.value.trim();

  if (countryName === '') {
    cleanMarkup();
    return;
  }

  fetchCountries(countryName)
    .then(data => {
      if (data.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (data.length <= 10 && data.length >= 2) {
        cleanMarkup();
        createShortMarkup(data);
      } else if (data.length === 1) {
        cleanMarkup();
        sortLanguagesToArray(data);
        
        let stringOfCountryLanguages = arrayOfCountryLanguages.join(', ');
        createLongMarkup(data, stringOfCountryLanguages);
        arrayOfCountryLanguages = [];
       
      }
    })
    .catch(error => {
      console.log(error);
    });
}

function cleanMarkup() {
  countryList.innerHTML = '';
}

function sortLanguagesToArray(data) {
  for (let i = 0; i < data[0].languages.length; i += 1) {
    const separateLanguages = data[0].languages[i].name;
    arrayOfCountryLanguages.push(separateLanguages);
  }
}

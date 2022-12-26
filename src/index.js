const debounce = require('lodash/debounce');
import Notiflix from 'notiflix';

import './css/styles.css';
import { fetchCountries } from './api/fetchCountries';
import { addCountriesList, addCountryInfo } from './layout/newMarkup';

const DEBOUNCE_DELAY = 300;

const searchBoxRef = document.querySelector('#search-box');
const countriesListRef = document.querySelector('.country-list');
const countryInfoRef = document.querySelector('.country-info');

searchBoxRef.addEventListener(
  'input',
  debounce(event => {
    countriesListRef.innerHTML = '';
    countryInfoRef.innerHTML = '';

    const countryName = event.target.value.trim();

    if (countryName) {
      fetchCountries(countryName)
        .then(response => {
          if (response.length > 10) {
            Notiflix.Notify.info(
              'Too many matches found. Please enter a more specific name.'
            );
          } else if (response.length == 1) {
            addCountryInfo(response, countryInfoRef);
          } else {
            addCountriesList(response, countriesListRef);
          }
        })
        .catch(err => {
          Notiflix.Notify.failure('Oops, there is no country with that name');
          console.log(err);
        });
    }
  }, DEBOUNCE_DELAY)
);

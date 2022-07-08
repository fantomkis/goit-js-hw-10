import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries.js';
import card from './parsal/cantri-card.hbs';
import list from './parsal/list-cantri.hbs';

const inputEl = document.querySelector('#search-box');
const contriListEl = document.querySelector('.country-list');
const contriInfoEl = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;

inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
  if (!event.target.value.trim()) {
    clin();
    return;
  }
  if (event.value === 0) {
    Notify.failure('not found', { timeout: 400 });
  }

  fetchCountries(event.target.value.trim())
    .then(countries => {
      clin();
      if (countries.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.',
          { timeout: 400 }
        );
        return;
      }
      if (countries.length <= 10 && countries.length >= 2) {
        contriListEl.innerHTML = countries.map(list).join('');
        return;
      }
      contriInfoEl.innerHTML = card(countries[0]);
      return;
    })
    .catch(error => {
      clin();
      Notify.failure(error, {
        timeout: 400,
      });
    });
}

function clin() {
  contriListEl.innerHTML = '';
  contriInfoEl.innerHTML = '';
}

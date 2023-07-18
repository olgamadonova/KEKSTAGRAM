import './form-photo-upload.js';

import { showAlert, debounce } from './utils.js';
import { makeRequest } from './fetch.js';
import { renderPicturesList } from './render-thumbnails.js';
import { onFilterListClick, toggleFilterButtonState } from './filter-pictures.js';

const filterListElement = document.querySelector('.img-filters');

let pictures = [];
const onFilterListElementClick = debounce((evt) => onFilterListClick(pictures, evt));

const onSuccess = (photos) => {
  pictures = photos.slice();

  renderPicturesList(pictures);

  filterListElement.classList.remove('img-filters--inactive');
  filterListElement.addEventListener('click', toggleFilterButtonState);

  filterListElement.addEventListener('click', onFilterListElementClick);

};

const onError = () => {
  showAlert('Не удалось загрузить данные, попробуйте обновить страницу');
};

makeRequest(onSuccess, onError);


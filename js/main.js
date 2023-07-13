const filterListElement = document.querySelector('.img-filters');
import './form-photo-upload.js';
import './filter-pictures.js';

import { showAlert } from './utils.js';
import { makeRequest } from './fetch.js';
import { renderPicturesList } from './render-thumbnails.js';
import { onFilterListClick } from './filter-pictures.js';

makeRequest((photos) => {
  renderPicturesList(photos);
  filterListElement.addEventListener('click', onFilterListClick(photos));
}, () => {
  showAlert('Не удалось загрузить данные, попробуйте обновить страницу');
});


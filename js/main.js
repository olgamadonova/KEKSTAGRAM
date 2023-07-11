import './form-photo-upload.js';
import './show-photo-preview.js';

import { showAlert } from './utils.js';
import { makeRequest } from './fetch.js';
import { renderPicturesList } from './render-thumbnails.js';

makeRequest(renderPicturesList, () => {
  showAlert('Не удалось загрузить данные, попробуйте обновить страницу');
});

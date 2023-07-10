import './form-photo-upload.js';
import './show-photo-preview.js';

import { showAlert } from './utils.js';
import { getData } from './fetch.js';
import { renderPicturesList } from './render-thumbnails.js';

getData()
  .then((data) => renderPicturesList(data))
  .catch((err) => showAlert(err.message));


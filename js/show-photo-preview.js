import { normalizeString } from './utils.js';

const FILE_TYPES = ['gif', 'webp', 'jpeg', 'png', 'avif', 'jpg', 'svg'];

const uploadInputElement = document.querySelector('.img-upload__input');
const photoPreviewElement = document.querySelector('.img-upload__preview img');

const showPhotoPreview = () => {
  const file = uploadInputElement.files[0];
  const fileName = normalizeString(file.name);

  const isMatching = FILE_TYPES.some((extention) => fileName.endsWith(extention));

  if (isMatching) {
    photoPreviewElement.src = URL.createObjectURL(file);
  }
};

export { showPhotoPreview };


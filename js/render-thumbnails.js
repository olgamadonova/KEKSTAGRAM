import { showBigPicture } from './render-picture-popup.js';

const picturesContainerElement = document.querySelector('.pictures');
const picturesListFragment = document.createDocumentFragment();
const pictureTemplate = document.querySelector('#picture')?.content;

const renderPicture = (picture) => {
  const { url, id, comments, likes, description } = picture;
  const pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture').id = id;
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.querySelector('.picture__likes').textContent = likes;

  pictureElement.querySelector('.picture').addEventListener('click', (evt) => {
    evt.preventDefault();
    showBigPicture(picture);
  });
  return pictureElement;
};

const renderPicturesList = (pictures) => {
  document.querySelectorAll('.pictures .picture').forEach((picture) => picture.remove());
  pictures.forEach((picture) => {
    if (pictureTemplate) {
      picturesListFragment.appendChild(renderPicture(picture));
    }
  });
  picturesContainerElement.appendChild(picturesListFragment);
};

export { renderPicturesList };

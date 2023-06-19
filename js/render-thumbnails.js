import { getPhotoList } from './mock.js';
import { onPicturesListClick } from './render-picture-popup.js';

const picturesContainerElement = document.querySelector('.pictures');
const picturesListFragment = document.createDocumentFragment();
const pictureTemplate = document.querySelector('#picture')?.content;
const picturesList = getPhotoList();

const renderPicturesList = (pictures) => {
  pictures.forEach(({ url, id, comments, likes, description }) => {
    if (pictureTemplate) {
      const pictureElement = pictureTemplate.cloneNode(true);

      pictureElement.querySelector('.picture').id = id;
      pictureElement.querySelector('.picture__img').src = url;
      pictureElement.querySelector('.picture__img').alt = description;
      pictureElement.querySelector('.picture__comments').textContent = comments.length;
      pictureElement.querySelector('.picture__likes').textContent = likes;
      picturesListFragment.appendChild(pictureElement);
    }
  });
  picturesContainerElement.appendChild(picturesListFragment);
  picturesContainerElement.addEventListener('click', onPicturesListClick);

};

renderPicturesList(picturesList);

export { picturesList };

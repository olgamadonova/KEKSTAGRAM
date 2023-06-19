import { isEscPressed, renderPopup, elementAddListener, elementRemoveListener, closePopup, setNoScrollBody, setScrollBody } from './utils.js';
import { picturesList } from './render-thumbnails.js';
import { createComment } from './create-dom-elements.js';

const picturePopupElement = document.querySelector('.big-picture');
const picturePopupCloseBtnElement = picturePopupElement.querySelector('.big-picture__cancel');
const commentsCountElement = picturePopupElement.querySelector('.social__comment-count');
const commentsLoader = picturePopupElement.querySelector('.comments-loader');
const COMMENT_STEP = 5;
let commentsRendered = 0;

const onPicturePopupElementKeydown = (evt) => {
  if (isEscPressed(evt)) {
    closePopup(picturePopupElement);
    setScrollBody();
    elementRemoveListener(picturePopupCloseBtnElement, 'click',onPicturePopupCloseBtnElementClick);
    elementRemoveListener(document, 'keydown', onPicturePopupElementKeydown);
  }
};

//линтер выдает ошибку в функции onPicturePopupElementKeydown если объявить onPicturePopupCloseBtnElementClick в стрелочном синтаксисе, так как она была использована до объявление, function declaration так использовать можно, но код получается неконсистентным, как тут быть?
function onPicturePopupCloseBtnElementClick () {
  closePopup(picturePopupElement);
  setScrollBody();
  elementRemoveListener(picturePopupCloseBtnElement, 'click',onPicturePopupCloseBtnElementClick);
  elementRemoveListener(document, 'keydown', onPicturePopupElementKeydown);
}

const onPicturesListClick = (evt) => {
  const target = evt.target.closest('.picture');
  if (!target) {
    return;
  } const targetId = target.getAttribute('id');

  const currentPictureItem = picturesList.find((picture) => picture.id === parseInt(targetId, 10));

  const { url, description, likes, comments} = currentPictureItem;

  renderPopup(picturePopupElement);
  setNoScrollBody();

  if (!picturePopupElement.classList.contains('hidden')) {
    elementAddListener(picturePopupCloseBtnElement, 'click',onPicturePopupCloseBtnElementClick);
    elementAddListener(document, 'keydown', onPicturePopupElementKeydown);
  }

  picturePopupElement.querySelector('.big-picture__img img').src = url;
  picturePopupElement.querySelector('.big-picture__social .social__caption').textContent = description;
  picturePopupElement.querySelector('.big-picture__social .social__likes .likes-count').textContent = likes;
  picturePopupElement.querySelector('.social__comments').innerHTML = '';

  //не могу понять как сделать дополнительную подгрузку фотографий
  comments.forEach(({ avatar, message, name }) => {

    if (comments.length <= COMMENT_STEP) {
      commentsRendered = comments.length;
      commentsLoader.classList.add('hidden');
      const comment = createComment(avatar, message, name);
      picturePopupElement.querySelector('.social__comments').insertAdjacentHTML('beforeend', comment);
      return;
    }
    if (comments.length > COMMENT_STEP) {
      commentsRendered = COMMENT_STEP;
      commentsLoader.classList.remove('hidden');
    }
    picturePopupElement.querySelector('.social__comments').insertAdjacentHTML('beforeend', createComment(avatar, message, name));

  });
  commentsCountElement.innerHTML = `${commentsRendered} из <span class="comments-count">${comments.length}</span> комментариев`;
};

export { onPicturesListClick };

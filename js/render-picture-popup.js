import { isEscPressed, renderPopup, elementAddListener, elementRemoveListener, closePopup, setNoScrollBody, setScrollBody } from './utils.js';
import { picturesList } from './render-thumbnails.js';
import { createComment } from './create-dom-elements.js';

const picturePopupElement = document.querySelector('.big-picture');
const picturePopupCommentsElement = picturePopupElement.querySelector('.social__comments');
const picturePopupCloseBtnElement = picturePopupElement.querySelector('.big-picture__cancel');
const commentsCountElement = picturePopupElement.querySelector('.social__comment-count');
const commentsLoader = picturePopupElement.querySelector('.comments-loader');

const COMMENT_STEP = 5;
let commentsRendered = 0;

//тут все равно ниже пришлось использовать function declaration так как функции-обработчики частично отличаются
const onPicturePopupElementKeydown = (evt) => isEscPressed(evt) && setClosePopupConfigs();
const onPicturePopupCloseBtnElementClick = () => setClosePopupConfigs();
function setClosePopupConfigs () {
  closePopup(picturePopupElement);
  setScrollBody();
  elementRemoveListener(picturePopupCloseBtnElement, 'click',onPicturePopupCloseBtnElementClick);
  elementRemoveListener(document, 'keydown', onPicturePopupElementKeydown);
}

//логика отрисовки комментариев и загрузчика
const renderComments = (commentsList) => {
  picturePopupCommentsElement.innerHTML = '';
  if (commentsList.length <= commentsRendered) {
    commentsRendered = commentsList.length;
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
  for (let i = 0; i < commentsRendered; i++) {
    const commentItem = createComment(commentsList[i].avatar, commentsList[i].message, commentsList[i].name);
    picturePopupCommentsElement.insertAdjacentHTML('beforeend', commentItem);

  }
  commentsCountElement.innerHTML = `${commentsRendered} из <span class="comments-count">${commentsList.length}</span> комментариев`;
};

//при клике на кнопку увеличиваем счетчик на 5 и заново все отрисовываем, замыкание, чтобы можно было передать аргумент в колбэк
const onCommentsLoaderClick = (commentsList) => {
  commentsRendered += COMMENT_STEP;
  renderComments(commentsList);
};


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

  //блок отвечающий за отрисовку и подгрузку комментариев
  commentsRendered = COMMENT_STEP;
  renderComments(comments);

  //обработчик не удаляется
  const onLoaderClick = () => onCommentsLoaderClick(comments);
  if (!commentsLoader.classList.contains('hidden')) {
    elementAddListener(commentsLoader, 'click', onLoaderClick);
  } else {
    elementRemoveListener(commentsLoader, 'click', onLoaderClick);
  }
};

export { onPicturesListClick };

import { isEscPressed, openPopup, closePopup, setNoScrollBody, setScrollBody } from './utils.js';
import { createComment } from './create-dom-elements.js';

const picturePopupElement = document.querySelector('.big-picture');
const picturePopupCommentsElement = picturePopupElement.querySelector('.social__comments');
const picturePopupCloseBtnElement = picturePopupElement.querySelector('.big-picture__cancel');
const commentsCountRenderElement = picturePopupElement.querySelector('.comments-count--render');
const commentsCountTotalElement = picturePopupElement.querySelector('.comments-count');
const commentsLoader = picturePopupElement.querySelector('.comments-loader');

const COMMENT_STEP = 5;
let commentsRendered = 0;
let currentComments = [];
let onLoaderClick;

//логика отрисовки кнопки для загрузки доп порции комментариев
const checkMoreButton = (cb, totalCommentsList, currentCommentsList = '') => {
  if (totalCommentsList.length > COMMENT_STEP) {
    commentsLoader.classList.remove('hidden');
    commentsLoader.addEventListener('click', cb);
  } if (totalCommentsList.length === currentCommentsList.length || totalCommentsList.length <= COMMENT_STEP) {
    commentsLoader.classList.add('hidden');
    commentsLoader.removeEventListener('click', cb);
  }
};

//логика отрисовки комментариев
const renderComments = (currentCommentsList, totalCommentsList) => {
  picturePopupCommentsElement.innerHTML = '';

  if (currentCommentsList.length <= commentsRendered) {
    commentsRendered = currentCommentsList.length;
  }
  currentCommentsList.forEach(({ avatar, message, name }) => {
    const commentItem = createComment(avatar, message, name);
    picturePopupCommentsElement.appendChild(commentItem);
  });

  totalCommentsList = totalCommentsList > currentCommentsList ? totalCommentsList : currentCommentsList;
  commentsCountRenderElement.textContent = commentsRendered;
  commentsCountTotalElement.textContent = totalCommentsList.length;
};

const onPicturePopupEscKeydown = (evt) => isEscPressed(evt) && closeBigPicture();

function closeBigPicture () {
  closePopup(picturePopupElement);

  setScrollBody();

  document.removeEventListener('keydown', onPicturePopupEscKeydown);
  commentsLoader.removeEventListener('click', onLoaderClick);
}

const showBigPicture = (picture) => {
  const { url, description, likes, comments } = picture;

  picturePopupElement.querySelector('.big-picture__img img').src = url;
  picturePopupElement.querySelector('.big-picture__social .social__caption').textContent = description;
  picturePopupElement.querySelector('.big-picture__social .social__likes .likes-count').textContent = likes;

  commentsRendered = comments.length < COMMENT_STEP ? comments.length : COMMENT_STEP;
  currentComments = comments.slice(0, commentsRendered);

  onLoaderClick = () => {
    commentsRendered += comments.length < (commentsRendered + COMMENT_STEP) ? comments.length : COMMENT_STEP;

    currentComments = comments.slice(0, commentsRendered);

    renderComments(currentComments, comments);

    checkMoreButton(onLoaderClick, comments, currentComments);
  };

  renderComments(currentComments, comments);

  checkMoreButton(onLoaderClick, comments);

  openPopup(picturePopupElement);

  setNoScrollBody();

  document.addEventListener('keydown', onPicturePopupEscKeydown);
  picturePopupCloseBtnElement.addEventListener('click', closeBigPicture);
};

export { showBigPicture };

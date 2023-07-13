import { createDomElement } from './create-dom-elements.js';

const ALERT_TIME = 3500;
const PICTURES_AMOUNT = 10;

const bodyElement = document.querySelector('body');

const getRandomArrayElement = (elements) => elements[Math.floor(Math.random() * elements.length)];

const getRandomPictures = (pictures) => [...pictures].sort(() => 0.5 - Math.random()).slice(0, PICTURES_AMOUNT);

const getDiscussedPictures = (pictures) => [...pictures].sort((a, b) => b.comments.length - a.comments.length);

const getRandomPositiveInteger = (min, max) => {

  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const showAlert = (message) => {
  const alertContainer = createDomElement('div', 'alert-message', message);
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.right = 0;
  alertContainer.style.top = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'tomato';
  alertContainer.style.transform = 'scale(1)';

  bodyElement.appendChild(alertContainer);

  setTimeout(() => {
    alertContainer.style.transform = 'scale(0)';
  }, ALERT_TIME);
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {

    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const isEscPressed = (evt) => evt.key === 'Escape';

const openPopup = (popup) => popup.classList.remove('hidden');

const closePopup = (popup) => popup.classList.add('hidden');

const setNoScrollBody = () => bodyElement.classList.add('modal-open');

const setScrollBody = () => bodyElement.classList.remove('modal-open');

const normalizeString = (str) => str.toLowerCase().trim();

const renderNotification = (element) => bodyElement.appendChild(element);

export { getRandomArrayElement, getRandomPositiveInteger, isEscPressed, openPopup, closePopup, setNoScrollBody, setScrollBody, normalizeString, showAlert, renderNotification, getRandomPictures, getDiscussedPictures, debounce };

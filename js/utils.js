import { createDomElement } from './create-dom-elements.js';

const ALERT_TIME = 3500;
const RERENDER_DELAY = 500;

const bodyElement = document.querySelector('body');

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

const debounce = (callback, timeoutDelay = RERENDER_DELAY) => {
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

export { isEscPressed, openPopup, closePopup, setNoScrollBody, setScrollBody, normalizeString, showAlert, renderNotification, debounce };

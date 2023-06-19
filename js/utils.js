const bodyElement = document.querySelector('body');

const isValidLength = (string, lengthValue) => string.length <= lengthValue;

isValidLength('instagram', 10);

/*const getNumbers = (string) => parseInt(string.replace(/\D+/g, ''), 10);
getNumbers('1 кефир, 0.5 батона');*/

const getRandomArrayElement = (elements) => elements[Math.floor(Math.random() * elements.length)];

const getRandomPositiveInteger = (min, max) => {

  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const isEscPressed = (evt) => evt.key === 'Escape';

const renderPopup = (popup) => popup.classList.remove('hidden');

const closePopup = (popup) => popup.classList.add('hidden');

const elementRemoveListener = (element, evtType, listener) => element.removeEventListener(evtType, listener);

const elementAddListener = (element, evtType, listener) => element.addEventListener(evtType, listener);

const setNoScrollBody = () => bodyElement.classList.add('modal-open');

const setScrollBody = () => bodyElement.classList.remove('modal-open');

export { getRandomArrayElement, getRandomPositiveInteger, isEscPressed, renderPopup, elementAddListener, elementRemoveListener, closePopup, setNoScrollBody, setScrollBody };

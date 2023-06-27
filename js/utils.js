const bodyElement = document.querySelector('body');

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

const openPopup = (popup) => popup.classList.remove('hidden');

const closePopup = (popup) => popup.classList.add('hidden');

const setNoScrollBody = () => bodyElement.classList.add('modal-open');

const setScrollBody = () => bodyElement.classList.remove('modal-open');

const normalizeString = (str) => str.toLowerCase().trim();

export { getRandomArrayElement, getRandomPositiveInteger, isEscPressed, openPopup, closePopup, setNoScrollBody, setScrollBody, normalizeString };

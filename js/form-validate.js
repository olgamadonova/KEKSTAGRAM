import { normalizeString, showAlert } from './utils.js';
import { createDomElement } from './create-dom-elements.js';
import { closeUploadPopup } from './form-photo-upload.js';
import { sendData } from './fetch.js';
import { showSuccessPopup, showErrorPopup } from './render-notifications.js';

const MAX_DESCRIPTION_LENGTH = 140;
const MAX_HASHTAG_QTY = 5;
const MAX_HASHTAG_LENGTH = 20;

const ErrorMessage = {
  INVALID_VALUE: 'хэш-тег содержит недопустимые символоы',
  INVALID_QUANTITY: `нельзя указать больше ${MAX_HASHTAG_QTY} хэш-тегов`,
  INVALID_REPEAT: 'хэш-теги не должны повторяться',
  INVALID_HASHTAG_LENGTH: `максимальная длина одного хэш-тега ${MAX_HASHTAG_LENGTH} символов, включая решётку`,
  INVALID_SEPARATOR: 'хэш-теги разделяются пробелами',
  INVALID_FIRST_SYMBOL: 'хэш-тег начинается с символа #',
  LIMIT_DESCRIPTION_LENGHT: `вы ввели максимально допустимое количество символов - ${MAX_DESCRIPTION_LENGTH}`,
};

const formElement = document.querySelector('.img-upload__form');
const hashtagInputElement = formElement.querySelector('.text__hashtags');
const descriptionInputElement = formElement.querySelector('.text__description');
const submitBtnElement = formElement.querySelector('.img-upload__submit');

let errorAlert = '';
const error = () => errorAlert;


const showLengthWarning = (evt) => {
  const normalizedText = normalizeString(descriptionInputElement.value);
  if (normalizedText.length === MAX_DESCRIPTION_LENGTH) {
    const warningElement = createDomElement('p', 'warning__message', ErrorMessage.LIMIT_LENGHT);
    const parent = evt.target.parentNode;
    parent.appendChild(warningElement);
  }
};

const hashtagValidator = (inputValue) => {
  errorAlert = '';

  const inputText = normalizeString(inputValue);

  if (!inputText) {
    return true;
  }

  const inputArray = inputText.split(/\s+/);

  if (!inputArray.length) {
    return true;
  }

  const rules = [
    {
      check: inputArray.some((hashtag) => hashtag.indexOf('#', 1) >= 1),
      error: ErrorMessage.INVALID_SEPARATOR,

    },
    {
      check: inputArray.some((hashtag) => hashtag[0] !== '#'),
      error: ErrorMessage.INVALID_FIRST_SYMBOL,
    },

    {
      check: inputArray.some((hashtag, _, array) => array.indexOf(hashtag) !== array.lastIndexOf(hashtag)),
      error: ErrorMessage.INVALID_REPEAT,
    },

    {
      check: inputArray.some((hashtag) => hashtag.length > MAX_HASHTAG_LENGTH),
      error: ErrorMessage.INVALID_HASHTAG_LENGTH,
    },

    {
      check: inputArray.length > MAX_HASHTAG_QTY,
      error: ErrorMessage.INVALID_QUANTITY,
    },

    {
      check: inputArray.some((hashtag) => !/^#[a-zа-яё0-9]{1,19}$/i.test(hashtag)),
      error: ErrorMessage.INVALID_VALUE,
    },
  ];

  return rules.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      errorAlert = rule.error;
    }
    return !isInvalid;
  });
};

const pristine = new Pristine (formElement, {
  classTo: 'field-validate',
  errorClass: 'field-validate--invalid',
  successClass: 'field-validate--valid',
  errorTextParent: 'field-validate',
  errorTextTag: 'p',
  errorTextClass: 'form__error',
});

pristine.addValidator(hashtagInputElement, hashtagValidator, error, 2, false);

const blockSubmitBtn = () => {
  submitBtnElement.disabled = true;
};

const unblockSubmitBtn = () => {
  submitBtnElement.disabled = false;
};


const onHashtagInput = () => {
  if (pristine.validate()) {
    unblockSubmitBtn();
  } else {
    blockSubmitBtn();
  }
};

descriptionInputElement.addEventListener('input', showLengthWarning);
hashtagInputElement.addEventListener('input', onHashtagInput);

const onFormSubmit = (evt) => {
  evt.preventDefault();

  blockSubmitBtn();

  sendData(new FormData(evt.target))
    .then(() => {
      closeUploadPopup();
      showSuccessPopup();
    })
    .catch(showErrorPopup)
    .finally(unblockSubmitBtn);
};

export { onFormSubmit };



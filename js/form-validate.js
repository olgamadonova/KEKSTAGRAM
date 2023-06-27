import { normalizeString } from './utils.js';
import { createDomElement } from './create-dom-elements.js';
import { closeUploadPopup } from './form-photo-upload.js';

const MAX_DESCRIPTION_LENGTH = 140;

const ErrorMessage = {
  INVALID_VALUE: 'введен невалидный хэш-тег',
  INVALID_QUANTITY: 'превышено максимально допустимое количество хэш-тегов',
  INVALID_REPEAT: 'хэш-теги не должны повторяться',
  LIMIT_LENGHT: 'вы ввели максимально допустимое количество символов',
};

const formElement = document.querySelector('.img-upload__form');
const hashtagInputElement = formElement.querySelector('.text__hashtags');
const descriptionInputElement = formElement.querySelector('.text__description');

const Validator = {

  isValidHashtag (hashtags) {
    if (!hashtags.length) {
      return true;
    }
    const pattern = /^#[a-zа-яё0-9]{1,19}$/i;
    return hashtags.split(' ').every((hashtag) => pattern.test(hashtag));
  },

  isValidHashtagQty (hashtags) {
    return hashtags.split(' ').length <= 5;
  },

  isUniqueHashtags (hashtags) {
    return normalizeString(hashtags)
      .split(' ')
      .every((hashtag, _, array) => array.indexOf(normalizeString(hashtag)) === array.lastIndexOf(normalizeString(hashtag))
      );
  },

  showLengthWarning (evt) {
    const normalizedText = normalizeString(descriptionInputElement.value);
    if (normalizedText.length === MAX_DESCRIPTION_LENGTH) {
      const warningElement = createDomElement('p', 'warning__message', ErrorMessage.LIMIT_LENGHT);
      const parent = evt.target.parentNode;
      parent.appendChild(warningElement);
    }
  },
};

const pristine = new Pristine (formElement, {
  classTo: 'field-validate',
  errorClass: 'field-validate--invalid',
  successClass: 'field-validate--valid',
  errorTextParent: 'field-validate',
  errorTextTag: 'p',
  errorTextClass: 'form__error',
});

const validateFormInputs = () => {
  pristine.addValidator(hashtagInputElement, Validator.isValidHashtag, ErrorMessage.INVALID_VALUE);
  pristine.addValidator(hashtagInputElement, Validator.isUniqueHashtags, ErrorMessage.INVALID_REPEAT);
  pristine.addValidator(hashtagInputElement, Validator.isValidHashtagQty , ErrorMessage.INVALID_QUANTITY);

  descriptionInputElement.addEventListener('input', Validator.showLengthWarning);
};

//в комментариях вывожу в консоль данные отправляемые на сервер для контроля ожидаемого поведения
const onFormSubmit = (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  //const formData = new FormData(evt.target);

  if (isValid) {
    closeUploadPopup();
  //  console.log('valid');
  //  console.log(Object.fromEntries(formData));
  } else {
  //  console.log('INvalid');
  }
};

export { onFormSubmit, validateFormInputs };


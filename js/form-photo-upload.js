import { isEscPressed, openPopup, closePopup, setNoScrollBody, setScrollBody } from './utils.js';
import { onFormSubmit } from './form-validate.js';
import { destroySlider, initNoUiSlider, setDefaultConfigs } from './slider-effects.js';
import { initScaleBtnEvents, removeScaleBtnEvents } from './scale-effect.js';

const formElement = document.querySelector('.img-upload__form');
const uploadInputElement = formElement.querySelector('.img-upload__input');
const uploadPopupElement = formElement.querySelector('.img-upload__overlay');
const closePopupBtnElement = formElement.querySelector('.img-upload__cancel');

//const DEFAULT_SCALE_VAUE = 100;

const onUploadPopupEscKeydown = (evt) => isEscPressed(evt)
&& !evt.target.classList.contains('text__hashtags')
&& !evt.target.classList.contains('text__description')
&& closeUploadPopup();

const resetUploadForm = () => {
  formElement.reset();
};

function closeUploadPopup () {
  closePopup(uploadPopupElement);
  setScrollBody();
  document.removeEventListener('keydown', onUploadPopupEscKeydown);
  resetUploadForm();
  formElement.removeEventListener('submit', onFormSubmit);
  destroySlider();
  removeScaleBtnEvents();
}

const openUploadPopup = () => {
  setNoScrollBody();
  openPopup(uploadPopupElement);
  document.addEventListener('keydown', onUploadPopupEscKeydown);
  closePopupBtnElement.addEventListener('click', closeUploadPopup);
  setDefaultConfigs();
  initNoUiSlider();
  initScaleBtnEvents();
};


const onUploadInputChange = () => {
  openUploadPopup();
  formElement.addEventListener('submit', onFormSubmit);
};

uploadInputElement.addEventListener('change', onUploadInputChange);

export { closeUploadPopup };


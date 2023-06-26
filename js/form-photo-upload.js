import { isEscPressed, openPopup, closePopup, setNoScrollBody, setScrollBody } from './utils.js';

const formElement = document.querySelector('.img-upload__form');
const uploadInputElement = formElement.querySelector('.img-upload__input');
const uploadPopupElement = formElement.querySelector('.img-upload__overlay');
const submitUploadElement = formElement.querySelector('.img-upload__submit');
const closePopupBtnElement = formElement.querySelector('.img-upload__cancel');

const onUploadPopupEscKeydown = (evt) => isEscPressed(evt)
&& !evt.target.classList.contains('text__hashtags')
&& !evt.target.classList.contains('text__description')
&& closeUploadPopup();

const resetUploadForm = () => {
  formElement.reset();
};

const blockEscKeydown = (evt) => isEscPressed(evt) && (!evt.target.classList.contains('text__hashtags') || !evt.target.classList.contains('text__description'));

function closeUploadPopup () {
  closePopup(uploadPopupElement);
  setScrollBody();
  document.removeEventListener('keydown', onUploadPopupEscKeydown);
  resetUploadForm();
}


const openUploadPopup = () => {
  setNoScrollBody();
  openPopup(uploadPopupElement);
  document.addEventListener('keydown', onUploadPopupEscKeydown);
  closePopupBtnElement.addEventListener('click', closeUploadPopup);
};

const onUploadInputChange = () => {
  openUploadPopup();
};

uploadInputElement.addEventListener('change', onUploadInputChange);


import { renderNotification, isEscPressed } from './utils.js';

const successPopupElement = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const successBtn = successPopupElement.querySelector('.success__button');

const errorPopupElement = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const errorBtn = errorPopupElement.querySelector('.error__button');

const onSuccessBtnClick = () => removeSuccessNotification();
const onSuccessOverlayClick = (evt) => !evt.target.closest('.success__inner') && removeSuccessNotification();
const onSuccessPopupEscKeydown = (evt) => isEscPressed(evt) && removeSuccessNotification();

function removeSuccessNotification () {
  successPopupElement.remove();
  document.removeEventListener('keydown', onSuccessPopupEscKeydown);
  successBtn.removeEventListener('click', onSuccessBtnClick);
  successPopupElement.removeEventListener('click', onSuccessOverlayClick);
}

const showSuccessPopup = () => {
  renderNotification(successPopupElement);
  document.addEventListener('keydown', onSuccessPopupEscKeydown);
  successBtn.addEventListener('click', onSuccessBtnClick);
  successPopupElement.addEventListener('click', onSuccessOverlayClick);
};

const onErrorBtnClick = () => removeErrorNotification();
const onErrorOverlayClick = (evt) => !evt.target.closest('error__inner') && removeErrorNotification();
const onErrorPopupEscKeydown = (evt) => isEscPressed(evt) && removeErrorNotification();

function removeErrorNotification () {
  errorPopupElement.remove();
  document.removeEventListener('keydown', onErrorPopupEscKeydown);
  successBtn.removeEventListener('click', onErrorBtnClick);
  successPopupElement.removeEventListener('click', onErrorOverlayClick);
}

const showErrorPopup = () => {
  renderNotification(errorPopupElement);
  document.addEventListener('keydown', onErrorPopupEscKeydown);
  errorBtn.addEventListener('click', onErrorBtnClick);
  errorPopupElement.addEventListener('click', onErrorOverlayClick);
};

export { showErrorPopup, showSuccessPopup };


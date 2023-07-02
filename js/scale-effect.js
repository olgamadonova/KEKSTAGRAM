const picturePreviewElement = document.querySelector('.img-upload__preview img');
const smallerBtnElement = document.querySelector('.scale__control--smaller');
const biggerBtnElement = document.querySelector('.scale__control--bigger');
const scaleValueElement = document.querySelector('.scale__control--value');

const ScaleControl = {
  step: 25,
  minValue: 25,
  maxValue: 100,
  defaultValue: 100,
};

const checkScaleBtn = (currentValue) => {
  if (currentValue === ScaleControl.maxValue) {
    biggerBtnElement.setAttribute('disabled', true);
    biggerBtnElement.style.backgroundColor = 'red';
    smallerBtnElement.removeAttribute('disabled');
    smallerBtnElement.style.backgroundColor = 'green';
    return;
  } if (currentValue === ScaleControl.minValue) {
    smallerBtnElement.setAttribute('disabled', true);
    smallerBtnElement.style.backgroundColor = 'red';
    biggerBtnElement.removeAttribute('disabled');
    biggerBtnElement.style.backgroundColor = 'green';
    return;
  }
  biggerBtnElement.removeAttribute('disabled');
  biggerBtnElement.style.backgroundColor = 'green';
  smallerBtnElement.removeAttribute('disabled');
  smallerBtnElement.style.backgroundColor = 'green';

};

const onBiggerBtnClick = (evt) => {
  const targetBtn = evt.target.closest('.scale__control--bigger');
  let currentScaleValue = parseInt(scaleValueElement.value, 10);


  console.log(currentScaleValue);
  if (!targetBtn) {
    return;
  } if (currentScaleValue === ScaleControl.maxValue) {
    return;
  }
  currentScaleValue += ScaleControl.step;

  console.log(currentScaleValue);
  scaleValueElement.value = `${currentScaleValue}%`;
  picturePreviewElement.style.transform = `scale(${currentScaleValue / 100})`;
  checkScaleBtn(currentScaleValue);
};

const onSmallerBtnClick = (evt) => {
  const targetBtn = evt.target.closest('.scale__control--smaller');
  let currentScaleValue = parseInt(scaleValueElement.value, 10);
  checkScaleBtn(currentScaleValue);

  console.log(currentScaleValue);
  if (!targetBtn) {
    return;
  } if (currentScaleValue === ScaleControl.minValue) {
    return;
  }
  currentScaleValue -= ScaleControl.step;
  console.log(currentScaleValue);
  scaleValueElement.value = `${currentScaleValue}%`;
  picturePreviewElement.style.transform = `scale(${currentScaleValue / 100})`;
};

const initScaleBtnEvents = () => {
  checkScaleBtn(ScaleControl.defaultValue);
  smallerBtnElement.addEventListener('click', onSmallerBtnClick);
  biggerBtnElement.addEventListener('click', onBiggerBtnClick);
};

const removeScaleBtnEvents = () => {
  smallerBtnElement.removeEventListener('click', onSmallerBtnClick);
  biggerBtnElement.removeEventListener('click', onBiggerBtnClick);
}

export { initScaleBtnEvents, removeScaleBtnEvents };

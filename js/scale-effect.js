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

//функция для блокировки кнопок, для наглядности добавлен цвет фона
const checkScaleBtn = (currentValue) => {
  switch(currentValue) {
    case ScaleControl.maxValue:
      biggerBtnElement.disabled = true;
      biggerBtnElement.style.backgroundColor = 'red';
      smallerBtnElement.disabled = false;
      smallerBtnElement.style.backgroundColor = 'green';
      break;
    case ScaleControl.minValue:
      smallerBtnElement.disabled = true;
      smallerBtnElement.style.backgroundColor = 'red';
      smallerBtnElement.disabled = false;
      biggerBtnElement.style.backgroundColor = 'green';
      break;
    default:
      biggerBtnElement.disabled = false;
      biggerBtnElement.style.backgroundColor = 'green';
      smallerBtnElement.disabled = false;
      smallerBtnElement.style.backgroundColor = 'green';
      break;
  }
};

const onScaleBtnClick = (evt, className, value, operand) => {
  const targetBtn = evt.target.closest(`.scale__control--${className}`);
  if (!targetBtn) {
    return;
  }
  let currentScaleValue = parseInt(scaleValueElement.value, 10);

  if (currentScaleValue === value) {
    return;
  }
  currentScaleValue += ScaleControl.step * operand;

  scaleValueElement.value = `${currentScaleValue}%`;
  picturePreviewElement.style.transform = `scale(${currentScaleValue / 100})`;
  checkScaleBtn(currentScaleValue);
};

const onBiggerBtnClick = (evt) => onScaleBtnClick(evt, 'bigger', ScaleControl.maxValue, 1);
const onSmallerBtnClick = (evt) => onScaleBtnClick(evt, 'smaller', ScaleControl.minValue, -1);


const initScaleBtnEvents = () => {
  checkScaleBtn(ScaleControl.defaultValue);
  biggerBtnElement.addEventListener('click', onBiggerBtnClick);
  smallerBtnElement.addEventListener('click', onSmallerBtnClick);
};

const removeScaleBtnEvents = () => {
  smallerBtnElement.removeEventListener('click', onSmallerBtnClick);
  biggerBtnElement.removeEventListener('click', onBiggerBtnClick);
};

export { initScaleBtnEvents, removeScaleBtnEvents };

const picturePreviewElement = document.querySelector('.img-upload__preview img');
const effectLevelElement = document.querySelector('.effect-level__value');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const effectLevelSlider = sliderContainer.querySelector('.effect-level__slider');
const effectListElement = document.querySelector('.effects__list');

const SliderOptions = {
  none: {
    start: 0,
    connect: 'lower',
    step: 1,
    range: {
      'min': 0,
      'max': 100,
    }
  },
  chrome : {
    start: 1,
    step: 0.1,
    range: {
      'min': 0,
      'max': 1,
    }
  },
  sepia : {
    start: 1,
    step: 0.1,
    range: {
      'min': 0,
      'max': 1,
    }
  },
  marvin : {
    start: 100,
    step: 1,
    range: {
      'min': 0,
      'max': 100,
    }
  },
  phobos : {
    start: 3,
    step: 0.1,
    range: {
      'min': 0,
      'max': 3,
    }
  },
  heat : {
    start: 3,
    step: 0.1,
    range: {
      'min': 1,
      'max': 3,
    }
  },
};

const Effects = {
  none: ['', ''],
  chrome: ['grayscale', ''],
  sepia: ['sepia', ''],
  marvin: ['invert', '%'],
  phobos: ['blur', 'px'],
  heat: ['brightness', ''],
};

const updateNoUiSlider = (effect) => effectLevelSlider.noUiSlider.updateOptions(SliderOptions[effect]);

const createNoUiSlider = () => {
  noUiSlider.create(effectLevelSlider, {
    start: 0,
    connect: 'lower',
    step: 1,
    range: {
      'min': 0,
      'max': 100,
    }
  });
};
createNoUiSlider();

console.dir(effectLevelSlider.noUiSlider);

const getSliderValue = () => {
  console.log(effectLevelSlider.noUiSlider.get());
  effectLevelElement.value = effectLevelSlider.noUiSlider.get();
  console.log(effectLevelElement.value);
  return effectLevelElement.value;
};


const disableSlider = () => {
  effectLevelSlider.setAttribute('disabled', true);
  effectLevelSlider.noUiSlider.reset();
  sliderContainer.style.display = 'none';
  picturePreviewElement.style.filter = '';
};

const enableSlider = () => {
 //effectLevelSlider.noUiSlider.reset();
  effectLevelSlider.removeAttribute('disabled');
  sliderContainer.style.display = '';
};

const addEffect = (effect, effectLevel, measure) => {
  picturePreviewElement.style.filter = `${effect}(${effectLevel}${measure})`;
  console.log(`${effect}(${effectLevel}${measure})`);
};

//disableSlider();
const onEffectListChange = (evt) => {
  const currentEffectItem = evt.target.closest('.effects__item');
  if (! currentEffectItem) {
    return;
  } const currentEffectValue = currentEffectItem.querySelector('.effects__radio').value;
  console.log(currentEffectValue);
  updateNoUiSlider(currentEffectValue);
  enableSlider();
  currentEffectValue === 'none' ? disableSlider() : enableSlider();
  effectLevelSlider.noUiSlider.on('update', getSliderValue);
  //picturePreviewElement.style.filter = `${currentEffectValue}(100%)`;
  console.log(picturePreviewElement, Effects[currentEffectValue][0], getSliderValue(), Effects[currentEffectValue][1]);
  addEffect(Effects[currentEffectValue][0], getSliderValue(), Effects[currentEffectValue][1]);
};

effectListElement.addEventListener('change', onEffectListChange);

export { disableSlider };

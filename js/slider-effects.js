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
      'max': 0,
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
  none: ['none', ''],
  chrome: ['grayscale', ''],
  sepia: ['sepia', ''],
  marvin: ['invert', '%'],
  phobos: ['blur', 'px'],
  heat: ['brightness', ''],
};

const updateNoUiSlider = (effect) => effectLevelSlider.noUiSlider.updateOptions(SliderOptions[effect]);

const initNoUiSlider = () => {
  noUiSlider.create(effectLevelSlider, {
    start: 100,
    connect: 'lower',
    step: 1,
    range: {
      'min': 0,
      'max': 100,
    }
  });
};


const setDefaultConfigs = () => {
  sliderContainer.style.display = 'none';
  picturePreviewElement.style.transform = 'scale(1)';
};

const disableSlider = () => {
  effectLevelSlider.setAttribute('disabled', true);
  sliderContainer.style.display = 'none';
  picturePreviewElement.removeAttribute('style');
};

const destroySlider = () => {
  effectLevelSlider.noUiSlider.destroy();
  sliderContainer.style.display = 'none';
  picturePreviewElement.removeAttribute('style');
};

const enableSlider = () => {
  effectLevelSlider.removeAttribute('disabled');
  sliderContainer.style.display = '';
};

const addEffect = (effect, effectLevel, measure) => {

  if (effect === 'none') {
    picturePreviewElement.removeAttribute('style');
    return;
  }
  picturePreviewElement.style.filter = `${effect}(${effectLevel}${measure})`;
};

const onEffectListChange = (evt) => {
  const currentEffectItem = evt.target.closest('.effects__item');

  if (! currentEffectItem) {
    return;
  }
  const currentEffectValue = currentEffectItem.querySelector('.effects__radio').value;

  updateNoUiSlider(currentEffectValue);

  if (currentEffectValue === 'none') {
    disableSlider();
  } else {
    enableSlider();
  }

  effectLevelSlider.noUiSlider.on('update', () => {
    effectLevelElement.value = effectLevelSlider.noUiSlider.get();
    addEffect(Effects[currentEffectValue][0], effectLevelElement.value, Effects[currentEffectValue][1]);
  });
};

effectListElement.addEventListener('change', onEffectListChange);

export { destroySlider, initNoUiSlider, setDefaultConfigs };

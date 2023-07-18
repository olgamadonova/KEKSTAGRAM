import { renderPicturesList } from './render-thumbnails.js';

const PICTURES_AMOUNT = 10;

const getRandomPictures = (pictures) => [...pictures].sort(() => 0.5 - Math.random()).slice(0, PICTURES_AMOUNT);

const getDiscussedPictures = (pictures) => [...pictures].sort((a, b) => b.comments.length - a.comments.length);

const FilterValue = {
  FILTER_RANDOM: 'filter-random',
  FILTER_DISCUSSED: 'filter-discussed',
  FILTER_DEFAULT: 'filter-default',
};

function filterChanger (filterValue, pictures) {
  switch(filterValue) {
    case FilterValue.FILTER_RANDOM: {
      const randomPictures = getRandomPictures(pictures);
      return renderPicturesList(randomPictures);
    }
    case FilterValue.FILTER_DISCUSSED: {
      const discussedPictures = getDiscussedPictures(pictures);
      return renderPicturesList(discussedPictures);
    }
    case FilterValue.FILTER_DEFAULT: {
      return renderPicturesList(pictures);
    }
  }
}


const onFilterListClick = (pictures, evt) => {
  const triggerFilterButton = evt.target.closest('.img-filters__button--active');

  filterChanger(triggerFilterButton.id, pictures);
};

const toggleFilterButtonState = (evt) => {
  const triggerFilterButton = evt.target.closest('.img-filters__button');

  if (!triggerFilterButton) {
    return;
  }

  const currentFilterContainer = triggerFilterButton.closest('.img-filters__form');

  const activeButton = currentFilterContainer.querySelector('.img-filters__button--active');
  if (activeButton === triggerFilterButton) {
    return;
  }

  activeButton.classList.remove('img-filters__button--active');
  triggerFilterButton.classList.add('img-filters__button--active');
};

export { onFilterListClick, toggleFilterButtonState };


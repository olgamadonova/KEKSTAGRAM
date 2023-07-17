import { getRandomPictures, getDiscussedPictures, debounce } from './utils.js';
import { renderPicturesList } from './render-thumbnails.js';

const RERENDER_DELAY = 500;

const filterChanger = (filterValue, pictures) => {
  switch(filterValue) {
    case 'filter-random':
      return getRandomPictures(pictures);
    case 'filter-discussed':
      return getDiscussedPictures(pictures);
    case 'filter-default':
      return pictures;
  }
};

const onFilterListClick = (pictures) => function (evt) {
  const triggerFilterBtn = evt.target.closest('.img-filters__button');

  if (!triggerFilterBtn) {
    return;
  }

  const currentFilterContainer = triggerFilterBtn.closest('.img-filters__form');

  const activeBtn = currentFilterContainer.querySelector('.img-filters__button--active');

  activeBtn.classList.remove('img-filters__button--active');
  triggerFilterBtn.classList.add('img-filters__button--active');

  if (activeBtn === triggerFilterBtn) {
    return;
  }

  const currentFilterValue = triggerFilterBtn.getAttribute('id');

  const filteredArray = filterChanger(currentFilterValue, pictures);

  debounce(
    () => {
      renderPicturesList(filteredArray);
    },
    RERENDER_DELAY,
  )();
};

export { onFilterListClick };


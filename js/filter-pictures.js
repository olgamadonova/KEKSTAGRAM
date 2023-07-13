import { getRandomPictures, getDiscussedPictures, debounce } from './utils.js';
import { renderPicturesList } from './render-thumbnails.js';

const RERENDER_DELAY = 500;

const filterListElement = document.querySelector('.img-filters');
const filterBtnElements = document.querySelectorAll('.img-filters__button ');
filterListElement.classList.remove('img-filters--inactive');

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
  const currentFilterBtn = evt.target.closest('.img-filters__button');

  if (!currentFilterBtn) {
    return;
  }
  filterBtnElements.forEach((btn) => btn.classList.remove('img-filters__button--active'));

  currentFilterBtn.classList.add('img-filters__button--active');
  const currentFilterValue = currentFilterBtn.getAttribute('id');

  const filteredArray = filterChanger(currentFilterValue, pictures);

  debounce(
    () => {
      renderPicturesList(filteredArray);
    },
    RERENDER_DELAY,
  )();

};

export { onFilterListClick };


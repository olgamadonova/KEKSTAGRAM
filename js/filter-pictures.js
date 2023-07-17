import { getRandomPictures, getDiscussedPictures, debounce } from './utils.js';
import { renderPicturesList } from './render-thumbnails.js';

function filterChanger (filterValue, pictures) {
  switch(filterValue) {
    case 'filter-random': {
      const randomPictures = getRandomPictures(pictures);
      return renderPicturesList(randomPictures);
    }
    case 'filter-discussed': {
      const discussedPictures = getDiscussedPictures(pictures);
      return renderPicturesList(discussedPictures);
    }
    case 'filter-default': {
      return renderPicturesList(pictures);
    }
  }
}


function onFilterListClick (pictures, evt) {

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

  filterChanger(currentFilterValue, pictures);

}

export { onFilterListClick };


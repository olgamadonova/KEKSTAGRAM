import { getPhotoList } from './mock.js';

const picturesContainerElement = document.querySelector('.pictures');


const renderPicturesList = () => {
  const picturesList = getPhotoList();
  const picturesListFragment = document.createDocumentFragment();
  const pictureTemplate = document.querySelector('#picture')?.content;

  picturesList.forEach(({ url, id, comments, likes, description }) => {
    if (pictureTemplate) {
      const pictureElement = pictureTemplate.cloneNode(true);

      pictureElement.querySelector('.picture').id = id; //или лучше записать в дата-атрибут, чтобы было понятно что это для взаимодействия через js dataset.id = id для отрисовки большого изображения буду применять
      pictureElement.querySelector('.picture__img').src = url;
      pictureElement.querySelector('.picture__img').alt = description;
      pictureElement.querySelector('.picture__comments').textContent = comments.length;
      pictureElement.querySelector('.picture__likes').textContent = likes;
      picturesListFragment.appendChild(pictureElement); //в скринкастах сказали, что лучше использовать вместо appendChild append, но как я понимаю фишка append в том, что можно передать несколько элементов, а appendChild явно показывает то, что мы добавляем один элемент, он ведь тут уместнее? (appendChild)
    }
  });

  picturesContainerElement.appendChild(picturesListFragment);
};

renderPicturesList();

import { getRandomArrayElement, getRandomPositiveInteger } from './utils.js';

const PhotoItem = {
  QUANTITY: 25,
  ID_QUANTITY: 25,
  URL_QUANTITY: 25,
  LIKES_MIN_QUANTITY: 15,
  LIKES_MAX_QUANTITY: 200,
  COMMENTS_MIN_QUANTITY:0,
  COMMENTS_MAX_QUANTITY: 30,
  COMMENTS: {
    AVATAR_QUANTITY: 6,
  }
};

const { QUANTITY, ID_QUANTITY, URL_QUANTITY, LIKES_MAX_QUANTITY, LIKES_MIN_QUANTITY, COMMENTS_MIN_QUANTITY, COMMENTS_MAX_QUANTITY, COMMENTS: { AVATAR_QUANTITY } } = PhotoItem;

const photoItemDescriptions = [
  'один',
  'два',
  'три',
  'четыре',
  'пять',
  'шесть',
  'семь',
  'восемь',
  'девять',
  'десять',
];

const photoItemsIds = () => Array.from({length: ID_QUANTITY}, (_, index) => index + 1);
const photoItemsUrls = () => Array.from({length: URL_QUANTITY}, (_, index) => `photos/${index + 1}.jpg`);

const commentItemAvatars = () => Array.from({length: AVATAR_QUANTITY}, (_, index) => `img/avatar-${index + 1}.svg`);
const commentItemMessages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const commentItemAuthors = [
  'Борис',
  'Антон',
  'Ирина',
  'Мария',
  'Евгений',
  'Кирилл',
  'Елена',
];

const getCommentItem = () => ({
  id: + new Date(),
  avatar: getRandomArrayElement(commentItemAvatars()),
  message: getRandomArrayElement(commentItemMessages),
  name: getRandomArrayElement(commentItemAuthors),
});

const getCommentList = () => Array.from({length: getRandomPositiveInteger(COMMENTS_MIN_QUANTITY, COMMENTS_MAX_QUANTITY)}, getCommentItem);

const getPhotoItem = () => ({
  id: 'id',
  url: 'url',
  description: getRandomArrayElement(photoItemDescriptions),
  likes: getRandomPositiveInteger(LIKES_MIN_QUANTITY, LIKES_MAX_QUANTITY),
  comments: getCommentList(),
});

const getPhotoList = () => Array.from({length: QUANTITY}, getPhotoItem);
console.table(getPhotoList());

const getRandomUniqueElement = (elements) => {
  const previousElements = [];

  let newRandomElement = getRandomArrayElement(elements);

  if (previousElements.length >= elements.length) {
    return;
  }
  while (previousElements.includes(newRandomElement)) {
    newRandomElement = getRandomArrayElement(elements);
  } previousElements.push(newRandomElement);

  return newRandomElement;
};

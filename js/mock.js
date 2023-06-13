import { getRandomArrayElement, getRandomPositiveInteger } from './utils.js';
//перечисление всех заданных количественных характеристик фотографии объединено в объект-перечисление
const PhotoItem = {
  FIRST_POST_ID: 1,
  FIRST_POST_URL: 1,
  QUANTITY: 25,
  LIKES_MIN_QUANTITY: 15,
  LIKES_MAX_QUANTITY: 200,
  COMMENTS_MIN_QUANTITY:0,
  COMMENTS_MAX_QUANTITY: 30,
  COMMENTS: {
    AVATAR_QUANTITY: 6,
    FIRST_COMMENT_ID: 1,
  }
};

const { QUANTITY, LIKES_MAX_QUANTITY, LIKES_MIN_QUANTITY, COMMENTS_MIN_QUANTITY, COMMENTS_MAX_QUANTITY, COMMENTS: { AVATAR_QUANTITY } } = PhotoItem;
let { FIRST_POST_ID, FIRST_POST_URL, COMMENTS: { FIRST_COMMENT_ID } } = PhotoItem;

//статические моки
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
const commentItemAvatars = () => Array.from({length: AVATAR_QUANTITY}, (_, index) => `img/avatar-${index + 1}.svg`);

//функция возвращает объект одного комментария
const getCommentItem = () => ({
  id: FIRST_COMMENT_ID++,
  avatar: getRandomArrayElement(commentItemAvatars()),
  message: getRandomArrayElement(commentItemMessages),
  name: getRandomArrayElement(commentItemAuthors),
});

//функция возращает список комментариев случайной длины в обозначенном в тз диапазоне
const getCommentList = () => Array.from({length: getRandomPositiveInteger(COMMENTS_MIN_QUANTITY, COMMENTS_MAX_QUANTITY)}, getCommentItem);

//функция возвращает объект одной фотокарточки
const getPhotoItem = () => ({
  id: FIRST_POST_ID++,
  url: `photos/${FIRST_POST_URL++}.jpg`,
  description: getRandomArrayElement(photoItemDescriptions),
  likes: getRandomPositiveInteger(LIKES_MIN_QUANTITY, LIKES_MAX_QUANTITY),
  comments: getCommentList(),
});

//функция возвращает список фотокарточек заданной в тз длины
const getPhotoList = () => Array.from({length: QUANTITY}, getPhotoItem);

getPhotoList();

const stringCleanPattern = /[\s\\.]/ig;

const isValidLength = (string, lengthValue) => typeof string === 'string' ? string.length <= lengthValue : String(string).length <= lengthValue;

isValidLength('instagram', 10);

const isPalindrome = (string) => {
  if (typeof string !== 'string') {
    return;
  }
  const normalizedString = string.toLowerCase().replaceAll(' ', '');
  return normalizedString.split('').reverse().join('') === normalizedString;
};

isPalindrome('Лёша на полке клопа нашёл ');

const getNumbers = (string) => {
  const validString = typeof string === 'string' ? string : String(string);
  const numbersArray = validString.split(' ').filter((item) => ! Number.isNaN(parseFloat(item)));

  if (!numbersArray.length) {
    return NaN;
  }
  const cleanedNumber = 1 * (numbersArray.map((numberInStr) =>Math.abs(parseFloat(numberInStr))).join(' ').replaceAll(stringCleanPattern, ''));
  return cleanedNumber;
};

getNumbers('1 кефир, 0.5 батона');
getNumbers('1.5');


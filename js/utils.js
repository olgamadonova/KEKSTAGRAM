const isValidLength = (string, lengthValue) => string.length <= lengthValue;

isValidLength('instagram', 10);

const isPalindrome = (string) => {
  if (typeof string !== 'string') {
    return;
  }
  const normalizedString = string.toLowerCase().replaceAll(' ', '');
  return [...normalizedString].reverse().join('') === normalizedString;
};

isPalindrome('Лёша на полке клопа нашёл ');

const getNumbers = (string) => parseInt(string.replace(/\D+/g, ''), 10);
getNumbers('1 кефир, 0.5 батона');


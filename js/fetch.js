const Urls = {
  GET: 'https://29.javascript.pages.academy/kekstagram/data',
  POST: 'https://29.javascript.pages.academy/kekstagram/',
};

const makeRequest = (onSuccess, onError, method = 'GET', body = null) => fetch(Urls[method], {method, body}).then((response) => {
  if (!response.ok) {
    throw new Promise.reject();
  }
  return response.json();
})
  .then((photos) => onSuccess(photos))
  .catch(onError);

export { makeRequest };


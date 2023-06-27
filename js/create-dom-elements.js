const createDomElement = (tag, className, text) => {
  const domElement = document.createElement(tag);
  domElement.classList.add(className);

  if (text) {
    domElement.textContent = text;
  }
  return domElement;
};

const createComment = (avatar, message, name) => {
  const imageSize = 35;

  const listItem = createDomElement('li', 'social__comment');
  const paragraph = createDomElement('p', 'social__text', message);
  const image = createDomElement('img', 'social__picture');

  image.src = avatar;
  image.alt = name;
  image.style.width = `${imageSize}px`;
  image.style.height = `${imageSize}px`;

  listItem.append(image, paragraph);
  return listItem;
};

export { createComment, createDomElement };

const createElementWithClasses = (tagName, classes = []) => {
  const newElement = document.createElement(tagName);
  newElement.className = classes.join(' ');
  return newElement;
};
const setAttributesToElement = (element, attributes = {}) => {
  const attributeEntries = Object.entries(attributes);
  attributeEntries.forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
  return element;
};

const createFeedItemElement = () => {
  const listElementClasses = ['list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0'];
  return createElementWithClasses('li', listElementClasses);
};

const createFeedListLinkElement = (link, id) => {
  const linkClasses = ['fw-bold'];
  const linkAttributes = {
    href: link,
    'data-id': id,
    target: '_blank',
    rel: ['noopener', 'noreferrer'],
  };

  const linkElement = createElementWithClasses('a', linkClasses);
  linkElement.textContent = 'Просмотр';
  return setAttributesToElement(linkElement, linkAttributes);
};

const createFeedListButtonElement = (id) => {
  const buttonClasses = ['btn', 'btn-outline-primary', 'btn-sm'];
  const buttonAttributes = {
    type: 'button',
    'data-id': id,
    'data-bs-toggle': 'modal',
    'data-bs-target': '#modal',
  };

  const buttonElement = createElementWithClasses('button', buttonClasses);
  buttonElement.textContent = 'Просмотр';
  return setAttributesToElement(buttonElement, buttonAttributes);
};
export {
  createFeedListButtonElement,
  createFeedListLinkElement,
  createFeedItemElement,
};
export default createElementWithClasses;

import createElementWithClasses from './createElementWithClasses.js';
import setAttributesToElement from './setAttributesToElement.js';

const createFeedListButtonElement = (id, buttonName) => {
  const buttonClasses = ['btn', 'btn-outline-primary', 'btn-sm'];
  const buttonAttributes = {
    type: 'button',
    'data-id': id,
    'data-bs-toggle': 'modal',
    'data-bs-target': '#modal',
  };

  const buttonElement = createElementWithClasses('button', buttonClasses);
  buttonElement.textContent = buttonName;
  return setAttributesToElement(buttonElement, buttonAttributes);
};

export default createFeedListButtonElement;

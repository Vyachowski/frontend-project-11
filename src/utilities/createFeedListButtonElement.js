import createElementWithClasses from "./createElements.js";
import setAttributesToElement from "./setAttributesToElement.js";

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

export default createFeedListButtonElement;

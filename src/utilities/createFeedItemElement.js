import createElementWithClasses from "./createElements.js";

const createFeedItemElement = () => {
  const listElementClasses = ['list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0'];
  return createElementWithClasses('li', listElementClasses);
};

export default createFeedItemElement;

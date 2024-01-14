const createElementWithClasses = (tagName, classes = []) => {
  const newElement = document.createElement(tagName);
  newElement.className = classes.join(' ');
  return newElement;
};

export default createElementWithClasses;

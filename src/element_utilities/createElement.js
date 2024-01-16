const createElement = (tagName, classes = [], textContent = '') => {
  const newElement = document.createElement(tagName);
  newElement.className = classes.join(' ');
  newElement.textContent = textContent;
  return newElement;
};

export default createElement;

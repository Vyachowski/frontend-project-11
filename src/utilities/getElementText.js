const getElementText = (selector, document) => {
  const element = document.querySelector(selector);
  return element.textContent;
};

export default getElementText;

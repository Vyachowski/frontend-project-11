const changeElementText = (element, text) => {
  const newElement = element;
  if (!element.value) {
    newElement.textContent = text;
    return;
  }
  newElement.value = text;
};

export default changeElementText;

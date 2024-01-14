const changeElementText = (element, message) => {
  const newElement = element;
  if (!element.value) {
    newElement.textContent = message;
    return;
  }
  newElement.value = message;
};

export default changeElementText;

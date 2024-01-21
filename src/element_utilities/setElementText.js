const setElementText = (element, text) => {
  if (!element.value) {
    element.textContent = text;
    return;
  }
  element.value = text;
};

export default setElementText;

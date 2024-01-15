const setAttributesToElement = (element, attributes = {}) => {
  const attributeEntries = Object.entries(attributes);
  attributeEntries.forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
  return element;
};

export default setAttributesToElement;

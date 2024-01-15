import setElementText from '../../../element_utilities/setElementText.js';
import setElementStyle from '../../../element_utilities/setElementStyle.js';

const renderFilling = (elements) => {
  const { messageElement, inputElement, buttonElement } = elements;

  setElementText(messageElement, '');
  setElementStyle(inputElement, 'valid');
  buttonElement.disabled = false;
};

export default renderFilling;

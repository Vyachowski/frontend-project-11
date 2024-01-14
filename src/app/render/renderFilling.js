import setElementText from '../../utilities/setElementText.js';
import setElementStyle from '../../utilities/setElementStyle.js';

const renderFilling = (params, elements) => {
  const { messageElement, inputElement, buttonElement } = elements;

  setElementText(messageElement, '');
  setElementStyle(inputElement, 'valid');
  buttonElement.disabled = false;
};

export default renderFilling;

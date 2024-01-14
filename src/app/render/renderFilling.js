import setElementText from '../../utilities/setElementText.js';
import setElementStyle from '../../utilities/setElementStyle.js';

const renderFilling = (options) => {
  const { messageElement, inputElement, buttonElement } = options;
  setElementText(messageElement, '');
  setElementStyle(inputElement, 'valid');
  buttonElement.disabled = false;
};

export default renderFilling;

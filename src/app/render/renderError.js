import setElementText from '../../utilities/setElementText.js';
import setElementStyle from '../../utilities/setElementStyle.js';

const renderError = (options) => {
  const {
    params: errorText, messageElement, inputElement, buttonElement,
  } = options;
  setElementText(messageElement, errorText);
  setElementStyle(messageElement, 'danger');
  setElementStyle(inputElement, 'invalid');
  buttonElement.disabled = true;
};

export default renderError;

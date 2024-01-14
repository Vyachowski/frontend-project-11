import setElementText from '../../../utilities/setElementText.js';
import setElementStyle from '../../../utilities/setElementStyle.js';

const renderError = (params, elements) => {
  const { messageElement, inputElement, buttonElement } = elements;
  const { errors } = params;

  setElementText(messageElement, errors);
  setElementStyle(messageElement, 'danger');
  setElementStyle(inputElement, 'invalid');
  buttonElement.disabled = true;
};

export default renderError;

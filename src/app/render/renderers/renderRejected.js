import setElementText from '../../../element_utilities/setElementText.js';
import setElementStyle from '../../../element_utilities/setElementStyle.js';

const renderRejected = (elements, params) => {
  const { messageElement, inputElement, buttonElement } = elements;
  const { errors } = params;

  setElementText(messageElement, errors);
  setElementStyle(messageElement, 'danger');
  setElementStyle(inputElement, 'invalid');
  buttonElement.disabled = false;
};

export default renderRejected;

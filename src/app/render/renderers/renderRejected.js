import setElementText from '../../../element_utilities/setElementText.js';
import setElementStyle from '../../../element_utilities/setElementStyle.js';

const renderRejected = (elements, {errors}) => {
  const { messageElement, inputElement, buttonElement } = elements;

  buttonElement.disabled = false;
  setElementText(messageElement, errors);
  setElementStyle(messageElement, 'danger');
  setElementStyle(inputElement, 'invalid');
};

export default renderRejected;

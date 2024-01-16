import setElementText from '../../../element_utilities/setElementText.js';
import setElementStyle from '../../../element_utilities/setElementStyle.js';

const renderRejected = (elements, state) => {
  const { messageElement, inputElement, buttonElement } = elements;
  const { rssFormProcessing } = state;
  buttonElement.disabled = false;
  setElementText(messageElement, rssFormProcessing.errors);
  setElementStyle(messageElement, 'danger');
  setElementStyle(inputElement, 'invalid');
};

export default renderRejected;

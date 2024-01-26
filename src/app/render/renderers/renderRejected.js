import setElementText from '../../../element_utilities/setElementText.js';
import setElementStyle from '../../../element_utilities/setElementStyle.js';

const renderRejected = (elements, state) => {
  const { messageElement, inputElement, buttonElement } = elements;
  const { errorMessage, isUrlValid } = state.rssFormProcessing.errors;
  buttonElement.disabled = false;
  setElementText(messageElement, errorMessage);
  setElementStyle(messageElement, 'danger');
  isUrlValid ? setElementStyle(inputElement, 'valid') : setElementStyle(inputElement, 'invalid');
};

export default renderRejected;

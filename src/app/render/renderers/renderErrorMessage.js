import setElementText from '../../../element_utilities/setElementText.js';

const renderErrorMessage = (error) => {
  const messageElement = document.querySelector('.feedback');
  setElementText(messageElement, error);
};

export default renderErrorMessage;

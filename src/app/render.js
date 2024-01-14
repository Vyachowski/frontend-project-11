import changeElementText from '../utilities/changeElementText.js';
import setElementStyle from '../utilities/setElementStyle.js';

const messageElement = document.querySelector('.feedback');
const formElement = document.querySelector('.rss-form');
const [inputElement, buttonElement] = formElement.elements;

const renderError = (errorText) => {
  changeElementText(messageElement, errorText);
  setElementStyle(messageElement, 'danger');
  setElementStyle(inputElement, 'invalid');
  buttonElement.disabled = true;
};

const renderFilling = () => {
  changeElementText(messageElement, '');
  setElementStyle(inputElement, 'valid');
  buttonElement.disabled = false;
};

const renderSending = () => {
  buttonElement.disabled = true;
};

const renderSent = () => {
  setElementStyle(messageElement, 'success');
  changeElementText(inputElement, '');
};

const render = (state, error) => {
  const mapping = {
    error: (err) => renderError(err),
    filling: renderFilling,
    sending: renderSending,
    sent: renderSent,
  };

  mapping[state](error);
};

export {
  render,
  messageElement,
  formElement,
  inputElement,
  buttonElement,
};

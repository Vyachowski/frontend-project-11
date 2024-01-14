import setElementText from '../utilities/setElementText.js';
import setElementStyle from '../utilities/setElementStyle.js';

const messageElement = document.querySelector('.feedback');
const formElement = document.querySelector('.rss-form');
const [inputElement, buttonElement] = formElement.elements;

const renderError = (errorText) => {
  setElementText(messageElement, errorText);
  setElementStyle(messageElement, 'danger');
  setElementStyle(inputElement, 'invalid');
  buttonElement.disabled = true;
};

const renderFilling = () => {
  setElementText(messageElement, '');
  setElementStyle(inputElement, 'valid');
  buttonElement.disabled = false;
};

const renderSending = () => {
  buttonElement.disabled = true;
};

const renderSent = () => {
  setElementStyle(messageElement, 'success');
  setElementText(messageElement, 'RSS успешно загружен') // TODO Change to dynamic message
  setElementText(inputElement, '');
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

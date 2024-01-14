import renderError from "./renderError.js";
import renderFilling from "./renderFilling.js";
import renderSending from "./renderSending.js";
import renderSent from "./renderSent.js";

const messageElement = document.querySelector('.feedback');
const formElement = document.querySelector('.rss-form');
const [inputElement, buttonElement] = formElement.elements;

const render = (state, params) => {
  const mapping = {
    error: (err) => renderError(err),
    filling: renderFilling,
    sending: renderSending,
    sent: (info) => renderSent(info),
  };

  mapping[state](params);
};

export {
  render,
  messageElement,
  formElement,
  inputElement,
  buttonElement,
};

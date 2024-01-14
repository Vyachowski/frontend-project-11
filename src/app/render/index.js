import renderError from './renderError.js';
import renderFilling from './renderFilling.js';
import renderSending from './renderSending.js';
import renderSent from './renderSent.js';

const render = (state, params) => {
  const elements = {
    messageElement: document.querySelector('.feedback'),
    formElement: document.querySelector('.rss-form'),
    inputElement: document.querySelector('.rss-form input'),
    buttonElement: document.querySelector('.rss-form button'),
  };

  const options = { params, ...elements };

  const mapping = {
    error: renderError,
    filling: renderFilling,
    sending: renderSending,
    sent: renderSent,
  };

  mapping[state](options);
};

export default render;

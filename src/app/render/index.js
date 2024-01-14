import renderError from './renderers/renderError.js';
import renderFilling from './renderers/renderFilling.js';
import renderSending from './renderers/renderSending.js';
import renderSent from './renderers/renderSent.js';

const render = (state, params) => {
  const elements = {
    messageElement: document.querySelector('.feedback'),
    formElement: document.querySelector('.rss-form'),
    inputElement: document.querySelector('.rss-form input'),
    buttonElement: document.querySelector('.rss-form button'),
  };

  const mapping = {
    error: renderError,
    filling: renderFilling,
    sending: renderSending,
    sent: renderSent,
  };

  mapping[state](params, elements);
};

export default render;

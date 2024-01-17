import renderErrors from './renderers/renderErrors.js';
import renderFilling from './renderers/renderFilling.js';
import renderSending from './renderers/renderSending.js';
import renderSent from './renderers/renderSent.js';
import renderRejected from './renderers/renderRejected.js';

const renderFormState = (state, stateName) => {
  const elements = {
    messageElement: document.querySelector('.feedback'),
    formElement: document.querySelector('.rss-form'),
    inputElement: document.querySelector('.rss-form input'),
    buttonElement: document.querySelector('.rss-form button'),
  };

  const mapping = {
    errors: renderErrors,
    filling: renderFilling,
    sending: renderSending,
    sent: renderSent,
    rejected: renderRejected,
  };

  mapping[stateName](elements, state);
};

export default renderFormState;

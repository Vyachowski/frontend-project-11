import renderErrors from './renderers/renderErrors.js';
import renderSending from './renderers/renderSending.js';
import renderSent from './renderers/renderSent.js';
import renderRejected from './renderers/renderRejected.js';
import renderErrorMessage from './renderers/renderErrorMessage.js';
import { renderFeeds, renderPosts } from './renderers/renderFeed.js';
import renderListElement from './renderers/renderListElement.js';
import renderModalWindow from './renderers/renderModalWindow.js';
import renderVisitedPost from './renderers/renderVisitedPost.js';

const renderFormState = (state, stateName) => {
  const elements = {
    messageElement: document.querySelector('.feedback'),
    formElement: document.querySelector('.rss-form'),
    inputElement: document.querySelector('.rss-form input'),
    buttonElement: document.querySelector('.rss-form button'),
  };

  const mapping = {
    errors: renderErrors,
    sending: renderSending,
    sent: renderSent,
    rejected: renderRejected,
  };

  mapping[stateName](elements, state);
};

export {
  renderFormState,
  renderErrorMessage,
  renderFeeds,
  renderPosts,
  renderListElement,
  renderModalWindow,
  renderVisitedPost,
};

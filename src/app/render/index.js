import renderSending from './renderers/renderSending.js';
import renderSent from './renderers/renderSent.js';
import renderRejected from './renderers/renderRejected.js';
import { renderFeeds, renderPosts } from './renderers/renderFeed.js';
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
    sending: renderSending,
    sent: renderSent,
    rejected: renderRejected,
  };

  mapping[stateName](elements, state);
};

export {
  renderFormState,
  renderFeeds,
  renderPosts,
  renderModalWindow,
  renderVisitedPost,
};

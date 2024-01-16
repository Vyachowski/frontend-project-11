import onChange from 'on-change';
import render from './render/index.js';
import renderErrorMessage from './render/renderers/renderErrorMessage.js';

const setSentState = (sentState, {
  posts, feedId, feedTitle, feedDescription,
}) => {
  const updatedSentState = sentState;

  updatedSentState.posts = posts;
  updatedSentState.feed.id = feedId;
  updatedSentState.feed.title = feedTitle;
  updatedSentState.feed.description = feedDescription;
  updatedSentState.state = 'sent';
};

const setState = (currentState, state, params) => {
  const updatedState = currentState;

  const states = {
    error: (errorText) => {
      updatedState.errors = errorText;
      updatedState.state = 'errors';
    },
    filling: ({ url }) => {
      updatedState.rssUrl = url;
      updatedState.errors = '';
      updatedState.state = 'filling';
    },
    sending: () => {
      updatedState.state = 'sending';
      return updatedState.rssUrl;
    },
    sent: (sentOptions) => setSentState(updatedState, sentOptions),
    rejected: (errorText) => {
      updatedState.errors = errorText;
      updatedState.state = 'rejected';
    },
  };
  return states[state](params);
};

const createWatchedState = (i18next) => {
  const initialState = {
    feed: {}, // { id, title, description}
    posts: [], // [{ id, feedId, title, description, link }]
    rssUrl: null,
    state: null,
    errors: null,
    translation: i18next.t('interfaceText', { returnObjects: true }),
  };

  const watchedState = onChange(initialState, (path, value) => {
    if (path === 'state') {
      render(value, watchedState);
    }
    if (path === 'errors') {
      renderErrorMessage(value, value);
    }
  });

  return { watchedState, setState };
};

export default createWatchedState;

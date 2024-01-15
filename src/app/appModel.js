import onChange from 'on-change';
import render from './render/index.js';
import renderErrorMessage from './render/renderers/renderErrorMessage.js';

const setSentState = (usingState, {
  posts, feedId, feedTitle, feedDescription,
}) => {
  const updatedState = usingState;

  updatedState.posts = posts;
  updatedState.feed.id = feedId;
  updatedState.feed.title = feedTitle;
  updatedState.feed.description = feedDescription;
  updatedState.state = 'sent';
};

const setState = (currentState, state, params) => {
  const newState = currentState;

  const states = {
    error: (errorText) => {
      newState.errors = errorText;
      newState.state = 'errors';
    },
    filling: ({ url }) => {
      newState.rssUrl = url;
      newState.errors = '';
      newState.state = 'filling';
    },
    sending: () => {
      newState.state = 'sending';
      return newState.rssUrl;
    },
    sent: (sentOptions) => setSentState(newState, sentOptions),
    rejected: (errorText) => {
      newState.errors = errorText;
      newState.state = 'rejected';
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

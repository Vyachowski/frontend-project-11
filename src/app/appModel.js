import onChange from 'on-change';
import render from './render/index.js';
import renderErrorMessage from './render/renderers/renderErrorMessage.js';


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
    sent: ({
      posts, feedId, feedTitle, feedDescription,
    }) => {
      newState.posts = posts;
      newState.feed.id = feedId;
      newState.feed.title = feedTitle;
      newState.feed.description = feedDescription;
      newState.state = 'sent';
    },
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

import onChange from 'on-change';
import render from './render/index.js';
import renderErrorMessage from './render/renderers/renderErrorMessage.js';

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

  const setState = (state, params = {}) => {
    const states = {
      error: (errorText) => {
        watchedState.errors = errorText;
        watchedState.state = 'errors';
      },
      filling: ({ url }) => {
        watchedState.rssUrl = url;
        watchedState.errors = '';
        watchedState.state = 'filling';
      },
      sending: () => {
        watchedState.state = 'sending';
        return watchedState.rssUrl;
      },
      sent: ({
        posts, feedId, feedTitle, feedDescription,
      }) => {
        watchedState.posts = posts;
        watchedState.feed.id = feedId;
        watchedState.feed.title = feedTitle;
        watchedState.feed.description = feedDescription;
        watchedState.state = 'sent';
      },
      rejected: (errorText) => {
        watchedState.errors = errorText;
        watchedState.state = 'rejected';
      }
    };
    return states[state](params);
  };

  return { watchedState, setState };
};

export default createWatchedState;

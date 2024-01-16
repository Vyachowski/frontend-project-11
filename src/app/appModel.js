import onChange from 'on-change';
import render from './render/index.js';
import renderErrorMessage from './render/renderers/renderErrorMessage.js';

const setSentState = (sentState, {
  posts, feed,
}) => {
  const updatedSentState = sentState;
  const previousPosts = updatedSentState.posts;
  const previousFeeds = updatedSentState.feeds;

  updatedSentState.rssFormProcessing.state = 'sent';
  updatedSentState.posts = [...posts, ...previousPosts];
  updatedSentState.feeds = [{ ...feed }, ...previousFeeds];
};

const setState = (currentState, stateName, params) => {
  const updatedState = currentState;

  const states = {
    error: (errorText) => {
      updatedState.rssFormProcessing.errors = errorText;
      updatedState.rssFormProcessing.state = 'errors';
    },
    filling: ({ url }) => {
      updatedState.rssFormProcessing.rssUrl = url;
      updatedState.rssFormProcessing.errors = '';
      updatedState.rssFormProcessing.state = 'filling';
    },
    sending: () => {
      updatedState.rssFormProcessing.state = 'sending';
      return updatedState.rssFormProcessing.rssUrl;
    },
    sent: (sentOptions) => setSentState(updatedState, sentOptions),
    rejected: (errorText) => {
      updatedState.rssFormProcessing.errors = errorText;
      updatedState.rssFormProcessing.state = 'rejected';
    },
  };
  return states[stateName](params);
};

const createWatchedState = (i18next) => {
  const initialState = {
    rssFormProcessing: {
      state: null,
      errors: null,
      rssUrl: null,
    },
    uiState: {
      isInterfaceRendered: null,
      viewedPosts: [],
    },
    feeds: [], // { id, title, description}
    posts: [], // [{ id, feedId, title, description, link }]
    translation: i18next.t('interfaceText', { returnObjects: true }),
  };

  const watchedState = onChange(initialState, (path, value) => {
    if (path === 'rssFormProcessing.state') {
      render(value, watchedState);
    }
    if (path === 'rssFormProcessing.errors') {
      renderErrorMessage(value);
    }
  });

  return { watchedState, setState };
};

export default createWatchedState;

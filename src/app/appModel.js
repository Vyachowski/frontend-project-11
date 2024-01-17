import onChange from 'on-change';
import renderFormState from './render/index.js';
import renderErrorMessage from './render/renderers/renderErrorMessage.js';
import { renderFeeds, renderPosts } from './render/renderers/renderFeed.js';

const setSentState = (sentState, {
  posts, feed, feedUrl,
}) => {
  const updatedSentState = sentState;
  const previousPosts = updatedSentState.posts;
  const previousFeeds = updatedSentState.feeds;

  updatedSentState.rssUrls.push(feedUrl);
  updatedSentState.rssFormProcessing.rssUrl = '';
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

const initialStateTemplate = {
  rssFormProcessing: {
    state: null,
    errors: null,
    rssUrl: null,
  },
  uiState: {
    isInterfaceRendered: null,
    viewedPosts: [],
  },
  rssUrls: [],
  feeds: [], // { id, title, description}
  posts: [], // [{ id, feedId, title, description, link }]
  translation: null,
};

const createWatchedState = (i18next) => {
  const initialState = { ...initialStateTemplate, translation: i18next.t('interfaceText', { returnObjects: true }) };

  const watchedState = onChange(initialState, (path, value, previousValue) => {
    switch (path) {
      case 'rssFormProcessing.state':
        renderFormState(watchedState, value);
        break;
      case 'posts':
        renderPosts(watchedState, value, previousValue);
        break;
      case 'feeds':
        renderFeeds(value, previousValue);
        break;
      case 'rssFormProcessing.errors':
        renderErrorMessage(value);
        break;
      default:
        break;
    }
  });

  return { watchedState, setState };
};

export default createWatchedState;

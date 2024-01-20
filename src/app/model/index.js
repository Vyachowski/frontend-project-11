import onChange from 'on-change';
import renderFormState from '../render/index.js';
import renderErrorMessage from '../render/renderers/renderErrorMessage.js';
import { renderFeeds, renderPosts } from '../render/renderers/renderFeed.js';
import renderVisitedPost from '../render/renderers/renderVisitedPost.js';
import rssUpdateController from '../controller/controllers/rssUpdateController.js';

const setSentState = (sentState, {
  posts, feed, feedUrl,
}) => {
  const previousPosts = sentState.posts;
  const previousFeeds = sentState.feeds;

  sentState.feedsUrls.unshift(feedUrl);
  sentState.rssFormProcessing.rssUrl = '';
  sentState.rssFormProcessing.state = 'sent';
  sentState.posts = [...posts, ...previousPosts];
  sentState.feeds = [{ ...feed }, ...previousFeeds];
};

const setFormState = (currentState, stateName, params) => {
  const states = {
    error: (errorText) => {
      currentState.rssFormProcessing.errors = errorText;
      currentState.rssFormProcessing.state = 'errors';
    },
    filling: ({ url }) => {
      currentState.rssFormProcessing.rssUrl = url;
      currentState.rssFormProcessing.errors = '';
      currentState.rssFormProcessing.state = 'filling';
    },
    sending: () => {
      currentState.rssFormProcessing.state = 'sending';
      return currentState.rssFormProcessing.rssUrl;
    },
    sent: (sentOptions) => setSentState(currentState, sentOptions),
    rejected: (errorText) => {
      currentState.rssFormProcessing.errors = errorText;
      currentState.rssFormProcessing.state = 'rejected';
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
    isModalOpen: null,
    viewedPosts: [],
  },
  feedsUrls: [],
  feeds: [],
  posts: [],
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
        renderFeeds(watchedState, value, previousValue);
        break;
      case 'rssFormProcessing.errors':
        renderErrorMessage(value);
        break;
      case 'feedsUrls':
        rssUpdateController(watchedState, value[0]);
        break;
      case 'uiState.viewedPosts':
        renderVisitedPost(value[0]);
        break;
      default:
        break;
    }
  });
  return { watchedState, setFormState };
};

export default createWatchedState;

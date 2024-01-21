import onChange from 'on-change';
import rssUpdateController from '../controller/controllers/rssUpdateController.js';
import {
  renderErrorMessage,
  renderFeeds,
  renderFormState,
  renderModalWindow,
  renderPosts,
  renderVisitedPost,
} from '../render/index.js';

const initialStateTemplate = {
  rssFormProcessing: {
    state: null,
    errors: null,
    rssUrl: null,
  },
  uiState: {
    activePost: null,
    viewedPosts: [],
  },
  feedsUrls: [],
  feeds: [],
  posts: [],
  translation: null,
};

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
    },
    sent: (sentOptions) => setSentState(currentState, sentOptions),
    rejected: (errorText) => {
      currentState.rssFormProcessing.errors = errorText;
      currentState.rssFormProcessing.state = 'rejected';
    },
  };

  return states[stateName](params);
};

const stateHandler = (watchedState, path, value, previousValue) => {
  switch (path) {
    case 'rssFormProcessing.state':
      renderFormState(watchedState, value);
      break;
    case 'rssFormProcessing.errors':
      renderErrorMessage(value);
      break;
    case 'posts':
      renderPosts(watchedState, value, previousValue);
      break;
    case 'feeds':
      renderFeeds(watchedState, value, previousValue);
      break;
    case 'feedsUrls': {
      const newFeed = value[0];
      rssUpdateController(watchedState, newFeed);
      break;
    }
    case 'uiState.viewedPosts': {
      const newVisitedPostId = value[0];
      renderVisitedPost(newVisitedPostId);
      break;
    }
    case 'uiState.activePost':
      renderModalWindow(watchedState, value);
      break;
    default: break;
  }
};

const createWatchedState = (i18next) => {
  const initialState = { ...initialStateTemplate, translation: i18next.t('interfaceText', { returnObjects: true }) };

  const watchedState = onChange(
    initialState,
    (path, value, previousValue) => stateHandler(watchedState, path, value, previousValue),
  );

  return { watchedState, setFormState };
};

export default createWatchedState;

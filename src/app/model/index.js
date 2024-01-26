import onChange from 'on-change';
import rssUpdateController from '../controller/controllers/rssUpdateController.js';
import {
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

const setFormState = (currentState, stateName, params) => {
  const states = {
    sending: () => {
      currentState.rssFormProcessing.state = 'sending';
    },
    sent: ({
      posts, feed, feedUrl,
    }) => {
      const previousPosts = currentState.posts;
      const previousFeeds = currentState.feeds;

      currentState.feedsUrls.unshift(feedUrl);
      currentState.rssFormProcessing.rssUrl = '';
      currentState.rssFormProcessing.state = 'sent';
      currentState.posts = [...posts, ...previousPosts];
      currentState.feeds = [{ ...feed }, ...previousFeeds];
    },
    rejected: (errorInfo) => {
      currentState.rssFormProcessing.errors = errorInfo;
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

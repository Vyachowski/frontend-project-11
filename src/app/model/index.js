import onChange from 'on-change';
import renderFormState from '../render/index.js';
import renderErrorMessage from '../render/renderers/renderErrorMessage.js';
import { renderFeeds, renderPosts } from '../render/renderers/renderFeed.js';
import renderVisitedPost from '../render/renderers/renderVisitedPost.js';
import rssUpdateController from '../controller/controllers/rssUpdateController.js';
import setFormState from "./state_setters/setFormState.js";

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

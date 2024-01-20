import onChange from 'on-change';
import renderFormState from './render/index.js';
import renderErrorMessage from './render/renderers/renderErrorMessage.js';
import { renderFeeds, renderPosts } from './render/renderers/renderFeed.js';
import fetchRssFeed from '../other_utilities/fetchRssFeed.js';
import parseXmlDocument from '../other_utilities/parseXmlDocument.js';
import getPostsFromElements from '../other_utilities/getPostsFromElements.js';
import createRssLink from '../other_utilities/createRssLink.js';
import renderVisitedPost from './render/renderers/renderVisitedPost.js';

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

const setState = (currentState, stateName, params) => {
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

const getUniqueValuesFromArray = (newArray, previousArray) => {
  const idList = previousArray.map((el) => el.id);
  return newArray.filter(({ id: newPostId }) => !idList.includes(newPostId));
};

const setRssUpdater = (currentState, link) => {
  const UPDATE_INTERVAL = 5000;
  const linkWithProxy = createRssLink(link);
  const updateData = () => {
    fetchRssFeed(linkWithProxy)
      .then((xmlData) => parseXmlDocument(xmlData))
      .then((rssDocument) => {
        const itemElements = rssDocument.querySelectorAll('item');
        const newPosts = getPostsFromElements(itemElements, 'new');
        const uniqueNewPosts = getUniqueValuesFromArray(newPosts, currentState.posts);
        if (uniqueNewPosts.length > 0) {
          currentState.posts = [...uniqueNewPosts, ...currentState.posts];
        }
        setTimeout(updateData, UPDATE_INTERVAL);
      })
      .catch((error) => {
        console.error(error);
        setTimeout(updateData, UPDATE_INTERVAL);
      });
  };

  setTimeout(updateData, UPDATE_INTERVAL);
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
        setRssUpdater(watchedState, value[0]);
        break;
      case 'uiState.viewedPosts':
        renderVisitedPost(value[0]);
        break;
      default:
        break;
    }
  });

  return { watchedState, setState };
};

export default createWatchedState;

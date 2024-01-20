import uniqueId from 'lodash.uniqueid';
import parseXmlDocument from '../other_utilities/parseXmlDocument.js';
import createUrlSchema from '../other_utilities/createUrlSchema.js';
import getElementText from '../element_utilities/getElementText.js';
import getPostsFromElements from '../other_utilities/getPostsFromElements.js';
import createRssLink from '../other_utilities/createRssLink.js';
import fetchRssFeed from '../other_utilities/fetchRssFeed.js';

const viewButtonController = (e, watchedState) => {
  const dataIdValue = e.target.getAttribute('data-id');
  watchedState.uiState.viewedPosts.unshift(dataIdValue);
};

const closeButtonController = (e, watchedState) => {
  const dataIdValue = e.target.getAttribute('data-id');
  watchedState.uiState.viewedPosts.unshift(dataIdValue);
};

const inputController = (e, watchedState, setState) => {
  const feedLink = { url: e.target.value };
  const urlSchema = createUrlSchema();

  urlSchema.validate(feedLink)
    .then(({ url }) => {
      const params = { url };
      setState(watchedState, 'filling', params);
    })
    .catch(({ message }) => {
      const params = message
        ? watchedState.translation.errors[message]
        : watchedState.translation.errors.defaultError;
      setState(watchedState, 'error', params);
    });
};

const getFeedAndPostsFromRssDocument = (rssXmlDOM) => {
  const itemElements = rssXmlDOM.querySelectorAll('item');
  const feedId = uniqueId('feed_');
  return {
    feed: {
      feedId,
      feedTitle: getElementText('title', rssXmlDOM),
      feedDescription: getElementText('description', rssXmlDOM),
    },
    posts: getPostsFromElements(itemElements, feedId),
  };
};

const formController = (e, watchedState, setState) => {
  e.preventDefault();
  const feedLink = watchedState.rssFormProcessing.rssUrl;
  const rssExistErrorMessage = watchedState.translation.errors.rssExist;
  const { href: rssLink } = createRssLink(feedLink);
  setState(watchedState, 'sending');

  if (watchedState.feedsUrls.includes(feedLink)) {
    setState(watchedState, 'rejected', rssExistErrorMessage);
    return;
  }

  fetchRssFeed(rssLink)
    .then((xmlData) => parseXmlDocument(xmlData))
    .then((rssDocument) => {
      const params = getFeedAndPostsFromRssDocument(rssDocument, feedLink);
      params.feedUrl = feedLink;
      setState(watchedState, 'sent', params);
    })
    .catch(({ message }) => {
      const params = message
        ? watchedState.translation.errors[message]
        : watchedState.translation.errors.defaultError;
      setState(watchedState, 'rejected', params);
    });
};

export {
  inputController,
  formController,
  viewButtonController,
  closeButtonController,
};

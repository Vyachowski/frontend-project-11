import uniqueId from 'lodash.uniqueid';
import getElementText from '../../../element_utilities/getElementText.js';
import createRssLink from '../../../other_utilities/createRssLink.js';
import parseXmlDocument from '../../../other_utilities/parseXmlDocument.js';
import fetchRssFeed from '../../../other_utilities/fetchRssFeed.js';
import getPostsFromElements from '../../../other_utilities/getPostsFromElements.js';

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

export default formController;

import uniqueId from 'lodash.uniqueid';
import parseXmlDocument from '../other_utilities/parseXmlDocument.js';
import createUrlSchema from '../other_utilities/createUrlSchema.js';
import getElementText from '../element_utilities/getElementText.js';
import getPostsFromElements from '../other_utilities/getPostsFromElements.js';
import createRssLink from '../other_utilities/createRssLink.js';
import fetchRssFeed from '../other_utilities/fetchRssFeed.js';

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

const formController = (e, watchedState, setState) => {
  e.preventDefault();
  const feedLink = setState(watchedState, 'sending');
  const { href: rssLink } = createRssLink(feedLink);

  fetchRssFeed(rssLink)
    .then((xmlData) => parseXmlDocument(xmlData))
    .then((rssDocument) => {
      const itemElements = rssDocument.querySelectorAll('item');
      const feedId = uniqueId('feed_');
      const params = {
        feed: {
          feedId,
          feedTitle: getElementText('title', rssDocument),
          feedDescription: getElementText('description', rssDocument),
        },
        posts: getPostsFromElements(itemElements, feedId),
      };
      setState(watchedState, 'sent', params);
    })
    .catch(({ message }) => {
      const params = message
        ? watchedState.translation.errors[message]
        : watchedState.translation.errors.defaultError;
      setState(watchedState, 'rejected', params);
    });
};

export { inputController, formController };

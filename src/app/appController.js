import uniqueId from 'lodash.uniqueid';
import parseXmlDocument from '../other_utilities/parseXmlDocument.js';
import createUrlSchema from '../other_utilities/createUrlSchema.js';
import createRssLink from '../other_utilities/createRssLink.js';
import getElementText from '../element_utilities/getElementText.js';
import createPostList from '../other_utilities/createPostList.js';
import fetchRssFeed from '../other_utilities/fetchRssFeed.js';

const inputController = (e, watchedState, setState) => {
  const feedLink = { url: e.target.value };
  const urlSchema = createUrlSchema();

  urlSchema.validate(feedLink)
    .then(({ url }) => {
      const params = { url };
      setState('filling', params);
    })
    .catch(({ message }) => {
      const params = watchedState.translation.errors[message];
      setState('error', params);
    });
};

const formController = (e, watchedState, setState) => {
  e.preventDefault();
  const feedLink = setState('sending');
  const { href: rssLink } = createRssLink(feedLink);

  fetchRssFeed(rssLink)
    .then((xmlData) => parseXmlDocument(xmlData))
    .then((rssDocument) => {
      const itemElements = rssDocument.querySelectorAll('item');
      const feedId = uniqueId('feed_');
      const params = {
        feedId,
        feedTitle: getElementText('title', rssDocument),
        feedDescription: getElementText('description', rssDocument),
        posts: createPostList(itemElements, feedId),
      };
      setState('sent', params);
    })
    .catch(({ message }) => {
      const params = watchedState.translation.errors[message];
      setState('rejected', params);
    });
};

export { inputController, formController };

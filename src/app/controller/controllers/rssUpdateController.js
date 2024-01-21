import fetchRssFeed from '../../../other_utilities/fetchRssFeed.js';
import createRssLink from '../../../other_utilities/createRssLink.js';
import parseXmlDocument from '../../../other_utilities/parseXmlDocument.js';
import getPostsFromElements from '../../../other_utilities/getPostsFromElements.js';
import getUniqueValuesFromArrayById from '../../../other_utilities/getUniqueValuesFromArrayById.js';

const rssUpdateController = (watchedState, link) => {
  const UPDATE_INTERVAL = 5000;
  const linkWithProxy = createRssLink(link);
  const updateData = () => {
    fetchRssFeed(linkWithProxy)
      .then((xmlData) => parseXmlDocument(xmlData))
      .then((rssDocument) => {
        const itemElements = rssDocument.querySelectorAll('item');
        const newPosts = getPostsFromElements(itemElements, 'new');
        const uniqueNewPosts = getUniqueValuesFromArrayById(newPosts, watchedState.posts);
        if (uniqueNewPosts.length > 0) {
          watchedState.posts = [...uniqueNewPosts, ...watchedState.posts];
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

export default rssUpdateController;

import createRssLink from '../../../other_utilities/createRssLink.js';
import fetchRssFeed from '../../../other_utilities/fetchRssFeed.js';
import parseXmlDocument from '../../../other_utilities/parseXmlDocument.js';
import getPostsFromElements from '../../../other_utilities/getPostsFromElements.js';

const getUniqueValuesFromArray = (newArray, previousArray) => {
  const idList = previousArray.map((el) => el.id);
  return newArray.filter(({ id: newPostId }) => !idList.includes(newPostId));
};

const rssUpdateController = (currentState, link) => {
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

export default rssUpdateController;

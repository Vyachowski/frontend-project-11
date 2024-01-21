import uniqueId from "lodash.uniqueid";
import getElementText from "../element_utilities/getElementText.js";
import getPostsFromElements from "./getPostsFromElements.js";

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
export default getFeedAndPostsFromRssDocument;

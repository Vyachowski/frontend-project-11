import uniqueId from 'lodash.uniqueid';
import getElementText from '../element_utilities/getElementText.js';

const getPostsFromElements = (elements, feedId) => {
  const elementsArray = Array.from(elements);

  return elementsArray.map((item) => {
    const title = getElementText('title', item);
    const description = getElementText('description', item);
    const link = getElementText('link', item);
    const id = uniqueId();
    return {
      id, feedId, title, description, link,
    };
  });
};

export default getPostsFromElements;

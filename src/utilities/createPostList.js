import uniqueId from 'lodash.uniqueid';
import getElementText from './getElementText.js';

const createPostList = (elements) => {
  const elementsArray = Array.from(elements);

  return elementsArray.map((item) => {
    const title = getElementText('title', item);
    const description = getElementText('description', item);
    const link = getElementText('link', item);
    const id = uniqueId();
    return {
      id, title, description, link,
    };
  });
};

export default createPostList;

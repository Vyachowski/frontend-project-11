import createFeedListElement from '../../../element_utilities/createFeedListElement.js';
import setElementStyle from '../../../element_utilities/setElementStyle.js';
import setElementText from '../../../element_utilities/setElementText.js';

const renderSent = (elements, watchedState) => {
  const { messageElement, inputElement } = elements;
  const { posts, feed, translation } = watchedState;
  const feedTitle = document.querySelector('.feed-title');
  const feedDescription = document.querySelector('.feed-description');
  const listGroup = document.querySelector('.list-group');

  const feedList = createFeedListElement(posts);
  setElementStyle(messageElement, 'success');
  setElementText(messageElement, translation.rssForm.downloadMessage);
  setElementText(inputElement, '');
  setElementText(feedTitle, feed.title);
  setElementText(feedDescription, feed.description);

  feedList.forEach((item) => listGroup.appendChild(item));
};

export default renderSent;

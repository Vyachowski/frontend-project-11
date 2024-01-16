import createPostsListElement from '../../../element_utilities/createPostsListElement.js';
import setElementStyle from '../../../element_utilities/setElementStyle.js';
import setElementText from '../../../element_utilities/setElementText.js';
import createElementWithClasses from '../../../element_utilities/createElementWithClasses.js';

const createSectionHeader = (tagText) => {
  const header = createElementWithClasses('h2', ['card-title', 'h4']);
  header.textContent = tagText;

  return header;
};
const renderPosts = (posts, { title: postSectionTitle, button: postButtonText }) => {
  const listGroup = document.querySelector('.list-group');
  const postCardBody = document.querySelector('.posts-card-body');

  const postsHeader = createSectionHeader(postSectionTitle);
  const feedList = createPostsListElement(posts, postButtonText);

  feedList.forEach((item) => listGroup.appendChild(item));
  postCardBody.appendChild(postsHeader);
};

const renderFeeds = ({ title, description }, feedSectionTitle) => {
  const feedTitle = document.querySelector('.feed-title');
  const feedDescription = document.querySelector('.feed-description');
  const feedCardBody = document.querySelector('.feeds-card-body');

  setElementText(feedTitle, title);
  setElementText(feedDescription, description);

  const feedHeader = createSectionHeader(feedSectionTitle);
  feedCardBody.appendChild(feedHeader);
};

const renderSent = (elements, watchedState) => {
  const { messageElement, inputElement } = elements;
  const { posts, feed, translation } = watchedState;
  const feedTitleText = translation.feed.title;
  const postTexts = translation.post;

  setElementStyle(messageElement, 'success');
  setElementText(messageElement, translation.rssForm.downloadMessage);
  setElementText(inputElement, '');

  renderPosts(posts, postTexts);
  renderFeeds(feed, feedTitleText);
};

export default renderSent;

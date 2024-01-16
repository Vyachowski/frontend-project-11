import createPostsListElement from '../../../element_utilities/createPostsListElement.js';
import setElementStyle from '../../../element_utilities/setElementStyle.js';
import setElementText from '../../../element_utilities/setElementText.js';
import createElementWithClasses from '../../../element_utilities/createElementWithClasses.js';

const createSectionHeader = (tagText) => {
  const header = createElementWithClasses('h2', ['card-title', 'h4']);
  header.textContent = tagText;

  return header;
};

const renderSectionsTitles = (postSectionTitle, feedSectionTitle) => {
  const postCardBody = document.querySelector('.posts-card-body');
  const feedCardBody = document.querySelector('.feeds-card-body');
  const postsHeader = createSectionHeader(postSectionTitle);
  const feedHeader = createSectionHeader(feedSectionTitle);

  postCardBody.appendChild(postsHeader);
  feedCardBody.appendChild(feedHeader);
};

const renderPosts = (posts, postButtonText) => {
  const listGroup = document.querySelector('.list-group');
  const postsList = createPostsListElement(posts, postButtonText);
  postsList.forEach((item) => listGroup.prepend(item));
};

const renderFeeds = ({ title, description }) => {
  const feedTitle = document.querySelector('.feed-title');
  const feedDescription = document.querySelector('.feed-description');

  setElementText(feedTitle, title);
  setElementText(feedDescription, description);
};

const renderSent = (elements, watchedState) => {
  const { messageElement, inputElement } = elements;
  const { posts, feed, translation } = watchedState;
  const feedTitleText = translation.feed.title;
  const { title, button: buttonText } = translation.post;
  const updatedState = watchedState;

  setElementStyle(messageElement, 'success');
  setElementText(messageElement, translation.rssForm.downloadMessage);
  setElementText(inputElement, '');

  if (!watchedState.isInterfaceRendered) {
    renderSectionsTitles(title, feedTitleText);
  }

  renderPosts(posts, buttonText);
  renderFeeds(feed);

  updatedState.isInterfaceRendered = true;
};

export default renderSent;

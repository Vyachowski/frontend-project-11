import renderListElement from './renderListElement.js';

const renderPosts = (watchedState) => {
  const { posts, translation } = watchedState;
  const { button: postButtonText } = translation.post;
  const postsListGroupElement = document.querySelector('.list-group-posts');
  const postsList = renderListElement('posts', posts, postButtonText);

  postsList.forEach((item) => postsListGroupElement.prepend(item));
};

const renderFeeds = (watchedState) => {
  const { feeds } = watchedState;
  const feedsListGroupElement = document.querySelector('.list-group-feeds');
  const feedsList = renderListElement('feeds', feeds);

  feedsList.forEach((item) => feedsListGroupElement.prepend(item));
};

export { renderPosts, renderFeeds };

import renderListElement from './renderListElement.js';

const renderPosts = ({ posts, translation }, newPostsList, postsList) => {
  const { button: postButtonText } = translation.post;
  const postsListGroupElement = document.querySelector('.list-group-posts');
  const newPostsNumbers = newPostsList.length - postsList.length;
  const newPosts = newPostsList.slice(0, newPostsNumbers);
  const renderedPostsList = renderListElement('posts', newPosts, postButtonText);

  renderedPostsList.forEach((item) => postsListGroupElement.prepend(item));
};

const renderFeeds = ({ feeds }, newFeedsList, feedList) => {
  const feedsListGroupElement = document.querySelector('.list-group-feeds');
  const newFeedsNumber = newFeedsList.length - feedList.length;
  const newFeeds = newFeedsList.slice(0, newFeedsNumber);
  const renderedNewFeeds = renderListElement('feeds', newFeeds);

  renderedNewFeeds.forEach((item) => feedsListGroupElement.prepend(item));
};

export { renderPosts, renderFeeds };

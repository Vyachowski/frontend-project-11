import renderListElement from './renderListElement.js';

const renderPosts = (state, newPostsList, postsList) => {
  const { button: postButtonText } = state.translation.post;
  const postsListGroupElement = document.querySelector('.list-group-posts');
  const newPostsNumber = newPostsList.length - postsList.length;
  if (newPostsNumber) {
    const newPosts = newPostsList.slice(0, newPostsNumber);
    const view = renderListElement(state, 'posts', newPosts, postButtonText);

    view.forEach((item) => postsListGroupElement.prepend(item));
  }
};

const renderFeeds = (state, newFeedsList, feedList) => {
  const feedsListGroupElement = document.querySelector('.list-group-feeds');
  const newFeedsNumber = newFeedsList.length - feedList.length;
  if (newFeedsNumber) {
    const newFeeds = newFeedsList.slice(0, newFeedsNumber);
    const view = renderListElement(state, 'feeds', newFeeds);

    view.forEach((item) => feedsListGroupElement.prepend(item));
  }
};

export { renderPosts, renderFeeds };

const closeButtonController = (e, watchedState) => {
  const dataIdValue = e.target.getAttribute('data-id');
  watchedState.uiState.viewedPosts.unshift(dataIdValue);
};

export default closeButtonController;

const viewButtonController = (e, watchedState) => {
  const dataIdValue = e.target.getAttribute('data-id');
  watchedState.uiState.viewedPosts.unshift(dataIdValue);
};

export default viewButtonController;

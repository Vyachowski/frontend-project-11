const viewButtonController = (e, watchedState) => {
  const dataIdValue = e.target.getAttribute('data-id');
  if (!watchedState.uiState.viewedPosts.includes(dataIdValue)) {
    watchedState.uiState.viewedPosts.unshift(dataIdValue);
    console.log(watchedState.uiState.viewedPosts)
  }
};

export default viewButtonController;

const viewButtonController = (e, watchedState) => {
  const dataIdValue = e.target.getAttribute('data-id');

  if (!watchedState.uiState.viewedPosts.includes(dataIdValue)) {
    watchedState.uiState.viewedPosts.unshift(dataIdValue);
  }

  const { title, description, link } = watchedState.posts
    .filter(({id}) => dataIdValue === id)
    .at(0);

  watchedState.uiState.activePost = { title, description, link };
};

export default viewButtonController;

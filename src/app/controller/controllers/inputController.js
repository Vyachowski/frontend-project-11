const inputController = (e, watchedState) => {
  watchedState.rssFormProcessing.rssUrl = e.target.value;
};

export default inputController;

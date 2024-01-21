const setSentState = (sentState, {
  posts, feed, feedUrl,
}) => {
  const previousPosts = sentState.posts;
  const previousFeeds = sentState.feeds;

  sentState.feedsUrls.unshift(feedUrl);
  sentState.rssFormProcessing.rssUrl = '';
  sentState.rssFormProcessing.state = 'sent';
  sentState.posts = [...posts, ...previousPosts];
  sentState.feeds = [{ ...feed }, ...previousFeeds];
};

const setFormState = (currentState, stateName, params) => {
  const states = {
    error: (errorText) => {
      currentState.rssFormProcessing.errors = errorText;
      currentState.rssFormProcessing.state = 'errors';
    },
    filling: ({ url }) => {
      currentState.rssFormProcessing.rssUrl = url;
      currentState.rssFormProcessing.errors = '';
      currentState.rssFormProcessing.state = 'filling';
    },
    sending: () => {
      currentState.rssFormProcessing.state = 'sending';
    },
    sent: (sentOptions) => setSentState(currentState, sentOptions),
    rejected: (errorText) => {
      currentState.rssFormProcessing.errors = errorText;
      currentState.rssFormProcessing.state = 'rejected';
    },
  };

  return states[stateName](params);
};

export default setFormState;

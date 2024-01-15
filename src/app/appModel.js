import onChange from 'on-change';
import render from './render/index.js';

const initialState = {
  feed: {}, // { title, description}
  posts: [], // [{ id, title, description, link }]
  rssUrl: null,
  state: null,
  rssForm: {
    url: null,
  },
  errors: null,
};

const watchedState = onChange(initialState, (path, value) => {
  const { errors, feed, posts } = watchedState;
  const data = { errors, feed, posts };

  if (path === 'state') {
    render(value, data);
  }

  if (path === 'errors' && errors !== '') {
    render('error', data);
  }
});

const setState = (state, params = {}) => {
  const states = {
    error: ({ errorText }) => {
      watchedState.errors = errorText;
      watchedState.state = 'error';
    },
    filling: ({ url }) => {
      watchedState.rssUrl = url;
      watchedState.errors = '';
      watchedState.state = 'filling';
    },
    sending: () => {
      watchedState.state = 'sending';
    },
    sent: ({ posts, feedTitle, feedDescription }) => {
      watchedState.posts = posts;
      watchedState.feed.title = feedTitle;
      watchedState.feed.description = feedDescription;
      watchedState.state = 'sent';
    },
  };

  states[state](params);
};

export {
  watchedState,
  setState,
};

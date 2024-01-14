import onChange from 'on-change';
import {
  render,
} from './render/index.js';

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
  const { errors, feed,posts} = watchedState;
  const feedInfo = {feed, posts};
  if (path === 'state') {
    value === 'sent'
      ? render(value, feedInfo)
      : render(value, errors);
  }
  if (path === 'errors' && errors !== '') render('error', errors);
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
    sent: () => {
      watchedState.state = 'sent';
    },
  };

  states[state](params);
};

export {
  watchedState,
  setState,
};

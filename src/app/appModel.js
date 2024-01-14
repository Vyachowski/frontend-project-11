import onChange from 'on-change';
import {
  render,
} from './render.js';

const initialState = {
  rssDocument: null,
  rssUrl: null,
  state: null,
  rssForm: {
    url: null,
  },
  errors: null,
};

const watchedState = onChange(initialState, (path, value) => {
  const { errors } = watchedState;

  if (path === 'state') render(value, errors);
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

import onChange from 'on-change';
import {
  renderError, renderFilling, renderSending, renderSent,
} from './appView.js';

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
  const renderInterface = {
    error: (err) => renderError(err),
    filling: renderFilling,
    sending: renderSending,
    sent: renderSent,
  };

  if (path === 'state') renderInterface[value](errors);
  if (path === 'errors' && errors !== '') renderInterface.error(errors);
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

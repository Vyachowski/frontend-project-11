import onChange from 'on-change';
import changeElementText from './utilities/changeElementText.js';
import setElementStyle from './utilities/setElementStyle.js';

const feedbackMessageElement = document.querySelector('.feedback');
const rssFormElement = document.querySelector('.rss-form');
const [rssFormInputElement, rssFormButtonElement] = rssFormElement.elements;

const initialState = {
  // rssList:[],
  rssUrl: '',
  state: null,
  rssForm: {
    url: null,
  },
  errors: '',
};

const watchedState = onChange(initialState, (path, value) => {
  const renderInterface = {
    error: () => {
      changeElementText(feedbackMessageElement, watchedState.errors);
      setElementStyle(feedbackMessageElement, 'danger');
      setElementStyle(rssFormInputElement, 'invalid');
      rssFormButtonElement.disabled = true;
    },
    filling: () => {
      changeElementText(feedbackMessageElement, '');
      setElementStyle(rssFormInputElement, 'valid');
      rssFormButtonElement.disabled = false;
    },
    sending: () => {
      rssFormButtonElement.disabled = true;
    },
    sent: () => {
      setElementStyle(feedbackMessageElement, 'success');
      changeElementText(rssFormInputElement, '');
    },
  };

  if (path === 'state') renderInterface[value]();
  if (path === 'errors' && watchedState.errors !== '') renderInterface.error();
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
  rssFormInputElement,
  rssFormElement,
  watchedState,
  setState,
};

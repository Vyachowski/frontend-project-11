import onChange from 'on-change';

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
      feedbackMessageElement.classList.remove('text-success');
      feedbackMessageElement.classList.add('text-danger');
      rssFormInputElement.classList.add('is-invalid');
      rssFormButtonElement.disabled = true;
    },
    filling: () => {
      feedbackMessageElement.textContent = '';
      rssFormInputElement.classList.remove('is-invalid');
      rssFormButtonElement.disabled = false;
    },
    sending: () => {
      rssFormButtonElement.disabled = true;
    },
    sent: () => {
      feedbackMessageElement.classList.remove('text-danger');
      feedbackMessageElement.classList.add('text-success');
      rssFormInputElement.value = '';
    },
  };

  if (path === 'state') renderInterface[value]();
  if (path === 'errors') feedbackMessageElement.textContent = watchedState.errors;
});

const setState = (state, params = {}) => {
  const states = {
    error: ({ errorText }) => {
      watchedState.errors = errorText;
      watchedState.state = 'error';
    },
    filling: ({ url }) => {
      watchedState.rssUrl = url;
      watchedState.errors = [];
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

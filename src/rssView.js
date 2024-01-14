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

export {
  rssFormInputElement, rssFormElement, watchedState,
};

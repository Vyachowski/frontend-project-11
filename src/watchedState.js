import onChange from 'on-change';

const warningMessageElement = document.querySelector('.feedback');
const rssFormElement = document.querySelector('.rss-form');
const [rssFormInputElement, rssFormButtonElement] = rssFormElement.elements;

const state = {
  rssUrls: [],
  state: null,
  rssForm: {
    url: null,
  },
  errors: '',
};

const watchedState = onChange(state, (path, value) => {
  const render = {
    error: () => {
      warningMessageElement.textContent = watchedState.errors;
      rssFormInputElement.classList.add('is-invalid');
      rssFormButtonElement.disabled = true;
    },
    filling: () => {
      warningMessageElement.textContent = '';
      rssFormInputElement.classList.remove('is-invalid');
      rssFormButtonElement.disabled = false;
    },
    sending: () => {
      rssFormButtonElement.disabled = true;
    },
    sent: () => {
      rssFormInputElement.value = '';
    },
  };

  if (path === 'state') render[value]();
});

export {
  rssFormInputElement, rssFormButtonElement, state, watchedState,
};

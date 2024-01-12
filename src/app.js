import {
  object, string,
} from 'yup';
import onChange from 'on-change';

const app = () => {
  // Rss-form component
  const urlSchema = object({ url: string().url().nullable() });

  const rssFormElement = document.querySelector('.rss-form');
  const [rssFormInputElement, rssFormButtonElement] = rssFormElement.elements;

  const state = {
    rssUrls: [],
    state: null, // error, filling, sending, sent
    rssForm: {
      url: null,
    },
    errors: {},
  };

  const watchedState = onChange(state, (path, value) => {
    const render = {
      error: () => {
        rssFormInputElement.classList.add('is-invalid');
        rssFormButtonElement.disabled = true;

      },
      filling: () => {
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

    if (path === 'state') {
      render[value]();
    }
  });

  rssFormInputElement.addEventListener('input', (e) => {
    watchedState.rssForm.url = e.target.value;
    urlSchema.validate(watchedState.rssForm)
      .then((r) => {
        const lastIndex = watchedState.rssUrls.length;
        watchedState.rssUrls[lastIndex] = r.url;
        watchedState.state = 'filling';
      })
      .catch((err) => {
        watchedState.state = 'error';
        watchedState.errors = err;
      });
  });

  rssFormButtonElement.addEventListener('click', (e) => {
    e.preventDefault();
    watchedState.state = 'sending';
    watchedState.state = 'sent';
  });
};

export default app;

import {
  object, string,
} from 'yup';
import {
  rssFormInputElement, rssFormButtonElement, watchedState,
} from './watchedState.js';

const app = () => {
  // RSS Form component
  const urlSchema = object({ url: string().url().nullable() });

  rssFormInputElement.addEventListener('input', (e) => {
    watchedState.rssForm.url = e.target.value;
    urlSchema.validate(watchedState.rssForm)
      .then((r) => {
        const lastIndex = watchedState.rssUrls.length;
        watchedState.rssUrls[lastIndex] = r.url;
        watchedState.state = 'filling';
      })
      .catch((err) => {
        watchedState.errors = err;
        watchedState.state = 'error';
      });
  });

  rssFormButtonElement.addEventListener('click', (e) => {
    e.preventDefault();
    watchedState.state = 'sending';
    watchedState.state = 'sent';
  });
};

export default app;

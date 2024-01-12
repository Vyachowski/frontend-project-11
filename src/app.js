import { object, string } from 'yup';
import { rssFormButtonElement, rssFormInputElement, watchedState } from './watchedState.js';
import { changeLanguage } from './locales/index.js';

const app = (i18next) => {
  // RSS Form component
  const urlSchema = object(
    { url: string().url().required() },
  );

  rssFormInputElement.addEventListener('input', (e) => {
    watchedState.rssForm.url = e.target.value;
    urlSchema.validate(watchedState.rssForm)
      .then((r) => {
        const lastIndex = watchedState.rssUrls.length;
        watchedState.rssUrls[lastIndex] = r.url;
        watchedState.errors = '';
        watchedState.state = 'filling';
      })
      .catch((err) => {
        const errorMessageKey = `rssForm.errorMessages.${err.path}`;
        watchedState.errors = i18next.t(errorMessageKey);
        watchedState.state = 'error';
      });
  });

  rssFormButtonElement.addEventListener('click', (e) => {
    e.preventDefault();
    watchedState.state = 'sending';
    watchedState.state = 'sent';
  });

  // Change language by default
  changeLanguage(i18next, 'en');
};

export default app;

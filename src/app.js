import axios from 'axios';
import { rssFormButtonElement, rssFormInputElement, watchedState } from './rssView.js';
import createUrlSchema from './utilities/urlSchema.js';

const app = (i18next) => {
  // Load RSS Form component
  const urlSchema = createUrlSchema();

  rssFormInputElement.addEventListener('input', (e) => {
    watchedState.rssForm.url = e.target.value;

    urlSchema.validate(watchedState.rssForm)
      .then((r) => {
        watchedState.rssUrl = r.url;
        watchedState.errors = [];
        watchedState.state = 'filling';
      })
      .catch((err) => {
        const errorMessageKey = `rssForm.${err.errors}`;
        watchedState.errors = i18next.t(errorMessageKey);
        watchedState.state = 'error';
      });
  });

  rssFormButtonElement.addEventListener('click', (e) => {
    e.preventDefault();
    watchedState.state = 'sending';

    axios.get('https://allorigins.hexlet.app/get?disableCache=true&url=https://lorem-rss.hexlet.app/feed')
      .then(({ data }) => {
        if (data) {
          return new window.DOMParser().parseFromString(data.contents, 'text/xml');
        }
        throw Error('Something went wrong. Please, try again');
      })
      .then((rss) => console.log(rss))
      .then(() => {
        watchedState.state = 'sent';
      })
      .catch((err) => {
        watchedState.errors = err.message;
      });
  });
};

export default app;

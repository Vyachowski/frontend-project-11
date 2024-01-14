import axios from 'axios';
import createUrlSchema from './utilities/urlSchema.js';
import { watchedState } from './rssView.js';

const inputController = (e, i18next) => {
  watchedState.rssForm.url = e.target.value;
  const urlSchema = createUrlSchema();

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
};

const formController = (e) => {
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
};

export { inputController, formController };

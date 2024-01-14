import axios from 'axios';
import createUrlSchema from './utilities/urlSchema.js';
import { setState, watchedState } from './appView.js';

const inputController = (e, i18next) => {
  watchedState.rssForm.url = e.target.value;
  const urlSchema = createUrlSchema();
  const params = {};

  urlSchema.validate(watchedState.rssForm)
    .then((r) => {
      params.url = r.url;
      setState('filling', params);
    })
    .catch((err) => {
      const errorMessageKey = `rssForm.${err.errors}`;
      params.errorText = i18next.t(errorMessageKey);
      setState('error', params);
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

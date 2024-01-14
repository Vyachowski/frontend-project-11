import axios from 'axios';
import parseXmlDocument from './utilities/parseXmlDocument.js';
import createUrlSchema from './utilities/createUrlSchema.js';
import createRssLink from './utilities/createRssLink.js';
import { setState, watchedState } from './appView.js';

const inputController = (e, i18next) => {
  watchedState.rssForm.url = e.target.value;
  const urlSchema = createUrlSchema();

  urlSchema.validate(watchedState.rssForm)
    .then(({ url }) => {
      const params = { url };
      setState('filling', params);
    })
    .catch((err) => {
      const errorMessageKey = `rssForm.${err.errors}`;
      const params = { errorText: i18next.t(errorMessageKey) };
      setState('error', params);
    });
};

const formController = (e) => {
  e.preventDefault();
  setState('sending');
  const rssFeedLink = watchedState.rssUrl;
  const rssLink = createRssLink(rssFeedLink);

  axios.get(rssLink)
    .then(({ data }) => {
      if (data) {
        const { contents } = data;
        return parseXmlDocument(contents);
      }
      throw new Error('Something went wrong. Please, try again');
    })
    .then((rssDocument) => { watchedState.rssDocument = rssDocument; return true; })
    .then(() => {
      console.log(watchedState.rssDocument);
      setState('sent')
    })
    .catch((err) => {
      const params = { errorText: err.message };
      setState('error', params);
    });
};

export { inputController, formController };

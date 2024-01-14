import axios from 'axios';
import uniqueId from 'lodash.uniqueid';
import parseXmlDocument from '../utilities/parseXmlDocument.js';
import createUrlSchema from '../utilities/createUrlSchema.js';
import createRssLink from '../utilities/createRssLink.js';
import { setState, watchedState } from './appModel.js';
import getElementText from '../utilities/getElementText.js';

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
  const { href: rssLink } = createRssLink(rssFeedLink);

  axios.get(rssLink)
    .then(({ data }) => {
      if (!data) throw new Error('Something went wrong. Please, try again');
      const { contents } = data;
      return parseXmlDocument(contents);
    })
    .then((rssDocument) => {
      const itemElements = rssDocument.querySelectorAll('item');
      watchedState.feed.title = getElementText('title', rssDocument);
      watchedState.feed.description = getElementText('description', rssDocument);
      itemElements.forEach((item) => {
        const title = getElementText('title', item);
        const description = getElementText('description', item);
        const link = getElementText('link', item);
        const id = uniqueId();
        watchedState.posts.push({
          id, title, description, link,
        });
      });
      setState('sent');
    })
    .catch((err) => {
      const params = { errorText: err.message };
      setState('error', params);
    });
};

export { inputController, formController };

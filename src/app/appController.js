import parseXmlDocument from '../utilities/parseXmlDocument.js';
import createUrlSchema from '../utilities/createUrlSchema.js';
import createRssLink from '../utilities/createRssLink.js';
import getElementText from '../utilities/getElementText.js';
import createPostList from '../utilities/createPostList.js';
import fetchRssFeed from '../utilities/fetchRssFeed.js';
import { setState, watchedState } from './appModel.js';

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

const formController = (e, i18next) => {
  e.preventDefault();
  setState('sending');
  const rssFeedLink = watchedState.rssUrl;
  const { href: rssLink } = createRssLink(rssFeedLink);
  fetchRssFeed(rssLink, i18next)
    .then((xmlData) => parseXmlDocument(xmlData))
    .then((rssDocument) => {
      const itemElements = rssDocument.querySelectorAll('item');
      const params = {
        feedTitle: getElementText('title', rssDocument),
        feedDescription: getElementText('description', rssDocument),
        posts: createPostList(itemElements),
      };
      setState('sent', params);
    })
    .catch((err) => {
      const params = { errorText: err.message };
      setState('error', params);
    });
};

export { inputController, formController };

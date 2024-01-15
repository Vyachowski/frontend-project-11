import parseXmlDocument from '../other_utilities/parseXmlDocument.js';
import createUrlSchema from '../other_utilities/createUrlSchema.js';
import createRssLink from '../other_utilities/createRssLink.js';
import getElementText from '../element_utilities/getElementText.js';
import createPostList from '../other_utilities/createPostList.js';
import fetchRssFeed from '../other_utilities/fetchRssFeed.js';
import { setState, watchedState } from './appModel.js';
import uniqueId from "lodash.uniqueid";

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
  const feedLink = setState('sending');
  const { href: rssLink } = createRssLink(feedLink);

  fetchRssFeed(rssLink, i18next)
    .then((xmlData) => parseXmlDocument(xmlData))
    .then((rssDocument) => {
      const itemElements = rssDocument.querySelectorAll('item');
      const feedId = uniqueId('feed_');
      const params = {
        feedId: feedId,
        feedTitle: getElementText('title', rssDocument),
        feedDescription: getElementText('description', rssDocument),
        posts: createPostList(itemElements, feedId),
      };
      setState('sent', params);
    })
    .catch((err) => {
      const params = { errorText: err.message };
      setState('error', params);
    });
};

export { inputController, formController };

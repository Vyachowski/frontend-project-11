import { setLocale } from 'yup';
import * as yup from 'yup';
import parseXmlDocument from '../../../other_utilities/parseXmlDocument.js';
import fetchRssFeed from '../../../other_utilities/fetchRssFeed.js';
import getFeedAndPostsFromRssDocument from '../../../other_utilities/getFeedAndPostsFromRssDocument.js';
import createRssLinkWithProxy from '../../../other_utilities/createRssLinkWithProxy.js';

const urlSchema = (() => {
  setLocale({
    mixed: {
      required: 'urlRequired',
    },
    string: {
      url: 'urlInvalid',
    },
  });

  return yup.string().required().url();
})();

const formController = (e, watchedState, setFormState) => {
  e.preventDefault();
  const errorInfo = { errorMessage: watchedState.translation.errors.rssExist, isUrlValid: false };
  const feedLink = watchedState.rssFormProcessing.rssUrl;
  setFormState(watchedState, 'sending');

  if (watchedState.feedsUrls.includes(feedLink)) {
    setFormState(watchedState, 'rejected', errorInfo);
    return;
  }

  urlSchema.validate(feedLink)
    .then((url) => {
      const { href } = createRssLinkWithProxy(url);
      errorInfo.isUrlValid = true;
      return fetchRssFeed(href);
    })
    .then((xmlData) => parseXmlDocument(xmlData))
    .then((rssDocument) => {
      const params = getFeedAndPostsFromRssDocument(rssDocument, feedLink);
      setFormState(watchedState, 'sent', {...params, feedUrl: feedLink});
    })
    .catch(({ message }) => {
      errorInfo.errorMessage = message
        ? watchedState.translation.errors[message]
        : watchedState.translation.errors.defaultError;
      setFormState(watchedState, 'rejected', errorInfo);
    });
};

export default formController;

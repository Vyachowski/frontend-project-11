import parseXmlDocument from '../../../other_utilities/parseXmlDocument.js';
import fetchRssFeed from '../../../other_utilities/fetchRssFeed.js';
import getFeedAndPostsFromRssDocument from '../../../other_utilities/getFeedAndPostsFromRssDocument.js';
import createUrlSchema from '../../../other_utilities/createUrlSchema.js';
import createRssLinkWithProxy from '../../../other_utilities/createRssLinkWithProxy.js';

const formController = (e, watchedState, setFormState) => {
  e.preventDefault();
  setFormState(watchedState, 'sending');

  const errorInfo = { errorMessage: '', isUrlValid: false };
  const urlSchema = createUrlSchema();
  const feedLink = watchedState.rssFormProcessing.rssUrl;

  if (watchedState.feedsUrls.includes(feedLink)) {
    errorInfo.errorMessage = watchedState.translation.errors.rssExist;
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
      params.feedUrl = feedLink;
      setFormState(watchedState, 'sent', params);
    })
    .catch(({ message }) => {
      console.log(message);
      errorInfo.errorMessage = message
        ? watchedState.translation.errors[message]
        : watchedState.translation.errors.defaultError;
      setFormState(watchedState, 'rejected', errorInfo);
    });
};

export default formController;

import parseXmlDocument from '../../../other_utilities/parseXmlDocument.js';
import fetchRssFeed from '../../../other_utilities/fetchRssFeed.js';
import getFeedAndPostsFromRssDocument from '../../../other_utilities/getFeedAndPostsFromRssDocument.js';
import createUrlSchema from '../../../other_utilities/createUrlSchema.js';
import createRssLinkWithProxy from '../../../other_utilities/createRssLinkWithProxy.js';

const formController = (e, watchedState, setFormState) => {
  e.preventDefault();
  setFormState(watchedState, 'sending');

  const urlSchema = createUrlSchema();
  const feedLink = watchedState.rssFormProcessing.rssUrl;
  const rssExistErrorMessage = watchedState.translation.errors.rssExist;

  if (watchedState.feedsUrls.includes(feedLink)) {
    setFormState(watchedState, 'rejected', rssExistErrorMessage);
    return;
  }

  urlSchema.validate(feedLink)
    .then((url) => {
      const { href } = createRssLinkWithProxy(url);
      return fetchRssFeed(href);
    })
    .then((xmlData) => parseXmlDocument(xmlData))
    .then((rssDocument) => {
      const params = getFeedAndPostsFromRssDocument(rssDocument, feedLink);
      params.feedUrl = feedLink;
      setFormState(watchedState, 'sent', params);
    })
    .catch(({ message }) => {
      const errorMessage = message
        ? watchedState.translation.errors[message]
        : watchedState.translation.errors.defaultError;
      setFormState(watchedState, 'rejected', errorMessage);
    });
};

export default formController;

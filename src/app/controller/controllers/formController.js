import createRssLink from '../../../other_utilities/createRssLink.js';
import parseXmlDocument from '../../../other_utilities/parseXmlDocument.js';
import fetchRssFeed from '../../../other_utilities/fetchRssFeed.js';
import getFeedAndPostsFromRssDocument from '../../../other_utilities/getFeedAndPostsFromRssDocument.js';

const formController = (e, watchedState, setFormState) => {
  e.preventDefault();
  const feedLink = watchedState.rssFormProcessing.rssUrl;
  const rssExistErrorMessage = watchedState.translation.errors.rssExist;
  const { href: rssLink } = createRssLink(feedLink);
  setFormState(watchedState, 'sending');

  if (watchedState.feedsUrls.includes(feedLink)) {
    setFormState(watchedState, 'rejected', rssExistErrorMessage);
    return;
  }

  fetchRssFeed(rssLink)
    .then((xmlData) => parseXmlDocument(xmlData))
    .then((rssDocument) => {
      const params = getFeedAndPostsFromRssDocument(rssDocument, feedLink);
      params.feedUrl = feedLink;
      setFormState(watchedState, 'sent', params);
    })
    .catch(({ message }) => {
      const params = message
        ? watchedState.translation.errors[message]
        : watchedState.translation.errors.defaultError;
      setFormState(watchedState, 'rejected', params);
    });
};

export default formController;

import axios from 'axios';
import isXMLDocument from './isXMLDocument.js';

const fetchRssFeed = (rssLink) => axios
  .get(rssLink)
  .then((response) => {
    const xmlData = response.data.contents;
    if (!isXMLDocument(xmlData)) {
      throw new Error('xmlError');
    }
    return xmlData;
  })
  .catch((error) => {
    if (error.message === 'xmlError') throw error;

    throw (error.request
      ? new Error('networkError')
      : new Error('defaultError'));
  });

export default fetchRssFeed;

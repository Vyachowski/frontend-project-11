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
    if (error.message === 'xmlError') {
      throw error;
    }
    if (error.request) {
      throw new Error('networkError');
    } else {
      throw new Error('error');
    }
  });

export default fetchRssFeed;

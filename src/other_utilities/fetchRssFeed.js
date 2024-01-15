import axios from 'axios';
import isXMLDocument from "./isXMLDocument.js";

const fetchRssFeed = (rssLink, i18next) => axios
  .get(rssLink)
  .then((response) => {
    const xmlData = response.data.contents;
    if (!isXMLDocument(xmlData)) {
      throw new Error(i18next.t('rssForm.xmlError'));
    }
    return xmlData;
  })
  .catch((error) => {
    if (error.response) {
      throw new Error(`${i18next.t('rssForm.error')}${error.response.status}`);
    } else if (error.request) {
      throw new Error(i18next.t('rssForm.networkError'));
    } else {
      throw new Error(`${i18next.t('rssForm.error')}${error.message}`);
    }
  });

export default fetchRssFeed;

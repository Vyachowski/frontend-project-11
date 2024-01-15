import axios from 'axios';

const fetchRssFeed = (rssLink, i18next) => axios
  .get(rssLink)
  .then((response) => {
    const contentType = response.headers['content-headers'];
    if (!contentType || !contentType.includes('application/xml')) {
      throw new Error(i18next.t('rssForm.xmlError'));
    }
    return response.data;
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

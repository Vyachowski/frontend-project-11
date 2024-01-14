const createRssLink = (rssFeedLink) => {
  const baseUrl = 'https://allorigins.hexlet.app/get';
  const urlParameters = `?disableCache=true&url=${rssFeedLink}`;
  const { href } = new URL(urlParameters, baseUrl);
  return href;
};

export default createRssLink;

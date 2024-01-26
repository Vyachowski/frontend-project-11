const createRssLinkWithProxy = (rssFeedLink) => {
  const baseUrl = 'https://allorigins.hexlet.app/get';
  const urlParameters = `?disableCache=true&url=${rssFeedLink}`;
  return new URL(urlParameters, baseUrl);
};

export default createRssLinkWithProxy;

const parseXmlDocument = (content) => new DOMParser()
  .parseFromString(content, 'text/xml');

export default parseXmlDocument;

const parseXmlDocument = (content) => new window
  .DOMParser()
  .parseFromString(content, 'text/xml');

export default parseXmlDocument;

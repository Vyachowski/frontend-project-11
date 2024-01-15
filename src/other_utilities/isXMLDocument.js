const isXMLDocument = (xmlString) => {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'application/xml');
    return xmlDoc.documentElement.nodeName !== 'parsererror';
  } catch (error) {
    return false;
  }
}

export default isXMLDocument;

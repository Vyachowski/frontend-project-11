const isXMLDocument = (xmlString) => {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'application/xml');
    const rootElement = xmlDoc.documentElement.nodeName;
    const errorNode = xmlDoc.querySelector("parsererror");
    return  !errorNode && rootElement !== 'html';
  } catch (error) {
    return false;
  }
}

export default isXMLDocument;

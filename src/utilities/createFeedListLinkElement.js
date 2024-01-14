import createElementWithClasses from './createElements.js';
import setAttributesToElement from './setAttributesToElement.js';

const createFeedListLinkElement = (link, id, text) => {
  const linkClasses = ['fw-bold'];
  const linkAttributes = {
    href: link,
    'data-id': id,
    target: '_blank',
    rel: ['noopener', 'noreferrer'],
  };

  const linkElement = createElementWithClasses('a', linkClasses);
  linkElement.textContent = text;
  return setAttributesToElement(linkElement, linkAttributes);
};

export default createFeedListLinkElement;

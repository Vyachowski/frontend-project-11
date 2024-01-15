import createFeedItemElement from './createFeedItemElement.js';
import createFeedListLinkElement from './createFeedListLinkElement.js';
import createFeedListButtonElement from './createFeedListButtonElement.js';

const createFeedListElement = (posts) => posts.map(({ id, title, link }) => {
  const postUniqueId = id;
  const itemElement = createFeedItemElement();
  const linkElement = createFeedListLinkElement(link, postUniqueId, title);
  const listButtonElement = createFeedListButtonElement(postUniqueId);

  itemElement.appendChild(linkElement);
  itemElement.appendChild(listButtonElement);

  return itemElement;
});

export default createFeedListElement;

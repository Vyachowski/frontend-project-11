import createElement from '../../../element_utilities/createElement.js';
import setElementAttributes from '../../../element_utilities/setElementAttributes.js';
import { viewButtonController } from '../../controller/index.js';

const linkAttributesTemplate = {
  href: null,
  'data-id': null,
  target: '_blank',
  rel: 'noopener noreferrer',
};

const buttonAttributesTemplate = {
  type: 'button',
  'data-id': null,
  'data-bs-toggle': 'modal',
  'data-bs-target': '#modal',
};

const createListElement = (state, type, data, buttonName = '') => {
  if (type === 'posts') {
    return data.map(({ id: postUniqueId, title, link: href }) => {
      const itemElement = createElement('li', ['list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0']);
      const linkElement = createElement('a', ['fw-bold'], title);
      const linkAttributes = { ...linkAttributesTemplate, ...{ href }, ...{ 'data-id': postUniqueId } };
      const buttonElement = createElement('button', ['btn', 'btn-outline-primary', 'btn-sm'], buttonName);
      const buttonElementAttributes = { ...buttonAttributesTemplate, ...{ 'data-id': postUniqueId } };

      setElementAttributes(linkElement, linkAttributes);
      setElementAttributes(buttonElement, buttonElementAttributes);
      itemElement.appendChild(linkElement);
      itemElement.appendChild(buttonElement);
      buttonElement.addEventListener('click', (e) => viewButtonController(e, state));

      return itemElement;
    });
  }
  return data.map(({ feedTitle, feedDescription }) => {
    const itemElement = createElement('li', ['list-group-item', 'border-0', 'border-end-0']);
    const titleElement = createElement('h3', ['h6', 'm-0'], feedTitle);
    const descriptionElement = createElement('p', ['feed-description', 'm-0', 'small', 'text-black-50'], feedDescription);
    itemElement.appendChild(titleElement);
    itemElement.appendChild(descriptionElement);
    return itemElement;
  });
};

const renderPosts = (state, newPostsList, postsList) => {
  const { button: postButtonText } = state.translation.post;
  const postsListGroupElement = document.querySelector('.list-group-posts');
  const newPostsNumber = newPostsList.length - postsList.length;
  if (newPostsNumber) {
    const newPosts = newPostsList.slice(0, newPostsNumber);
    createListElement(state, 'posts', newPosts, postButtonText)
      .forEach((item) => postsListGroupElement.prepend(item));
  }
};

const renderFeeds = (state, newFeedsList, feedList) => {
  const feedsListGroupElement = document.querySelector('.list-group-feeds');
  const newFeedsNumber = newFeedsList.length - feedList.length;
  if (newFeedsNumber) {
    const newFeeds = newFeedsList.slice(0, newFeedsNumber);
    createListElement(state, 'feeds', newFeeds)
      .forEach((item) => feedsListGroupElement.prepend(item));
  }
};

export { renderPosts, renderFeeds };

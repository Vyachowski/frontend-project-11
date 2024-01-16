import setElementStyle from '../../../element_utilities/setElementStyle.js';
import setElementText from '../../../element_utilities/setElementText.js';
import createElement from '../../../element_utilities/createElement.js';
import setElementAttributes from '../../../element_utilities/setElementAttributes.js';

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

const renderListElement = (type, data, buttonName = '') => {
  if (type === 'posts') {
    return data.map(({ postUniqueId, title, href }) => {
      const itemElement = createElement('li', ['list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0']);
      const linkElement = createElement('a', ['fw-bold'], title);
      const linkAttributes = { linkAttributesTemplate, ...{ href }, ...{ 'data-id': postUniqueId } };
      const buttonElement = createElement('button', ['btn', 'btn-outline-primary', 'btn-sm'], buttonName);
      const buttonElementAttributes = { buttonAttributesTemplate, ...{ 'data-id': postUniqueId } };

      setElementAttributes(linkElement, linkAttributes);
      setElementAttributes(buttonElement, buttonElementAttributes);
      itemElement.appendChild(linkElement);
      itemElement.appendChild(buttonElement);

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

const renderSectionsTitles = (postSectionTitle, feedSectionTitle) => {
  const postCardBody = document.querySelector('.posts-card-body');
  const feedCardBody = document.querySelector('.feeds-card-body');
  const postsHeader = createElement('h2', ['card-title', 'h4'], postSectionTitle);
  const feedHeader = createElement('h2', ['card-title', 'h4'], feedSectionTitle);

  postCardBody.appendChild(postsHeader);
  feedCardBody.appendChild(feedHeader);
};

const renderPosts = (posts, postButtonText) => {
  const postsListGroupElement = document.querySelector('.list-group-posts');
  const postsList = renderListElement('posts', posts, postButtonText);

  postsList.forEach((item) => postsListGroupElement.prepend(item));
};

const renderFeeds = (feeds) => {
  const feedsListGroupElement = document.querySelector('.list-group-feeds');
  const feedsList = renderListElement('feeds', feeds);

  feedsList.forEach((item) => feedsListGroupElement.prepend(item));
};

const renderSent = (elements, watchedState) => {
  const { messageElement, inputElement } = elements;
  const { posts, feeds, translation } = watchedState;
  const feedTitleText = translation.feed.title;
  const { title, button: buttonText } = translation.post;
  const updatedState = watchedState;

  setElementStyle(messageElement, 'success');
  setElementText(messageElement, translation.rssForm.downloadMessage);
  setElementText(inputElement, '');

  if (!watchedState.uiState.isInterfaceRendered) {
    renderSectionsTitles(title, feedTitleText);
  }

  renderPosts(posts, buttonText);
  renderFeeds(feeds);
  updatedState.uiState.isInterfaceRendered = true;
};

export default renderSent;

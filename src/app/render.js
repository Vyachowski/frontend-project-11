import uniqueId from 'lodash.uniqueid';
import setElementText from '../utilities/setElementText.js';
import setElementStyle from '../utilities/setElementStyle.js';
import {
  createFeedListButtonElement,
  createFeedItemElement,
  createFeedListLinkElement,
} from '../utilities/createElements.js';

const messageElement = document.querySelector('.feedback');
const formElement = document.querySelector('.rss-form');
const [inputElement, buttonElement] = formElement.elements;

const renderFeedList = (parentElement, posts) => {
  const itemsList = posts.map((post) => {
    const postUniqueId = uniqueId();
    const itemElement = createFeedItemElement();
    const linkElement = createFeedListLinkElement(post.link, postUniqueId);
    const listButtonElement = createFeedListButtonElement(postUniqueId);

    itemElement.appendChild(linkElement);
    itemElement.appendChild(listButtonElement);

    return itemElement;
  });

  itemsList.forEach((item) => parentElement.appendChild(item));
};

const renderError = (errorText) => {
  setElementText(messageElement, errorText);
  setElementStyle(messageElement, 'danger');
  setElementStyle(inputElement, 'invalid');
  buttonElement.disabled = true;
};

const renderFilling = () => {
  setElementText(messageElement, '');
  setElementStyle(inputElement, 'valid');
  buttonElement.disabled = false;
};

const renderSending = () => {
  buttonElement.disabled = true;
};

const renderSent = (posts, title, description) => {
  console.log(title, description);
  const listGroup = document.querySelector('.list-group');
  setElementStyle(messageElement, 'success');
  setElementText(messageElement, 'RSS успешно загружен'); // TODO Change to dynamic message
  setElementText(inputElement, '');
  renderFeedList(listGroup, posts);
};

const render = (state, error) => {
  const mapping = {
    error: (err) => renderError(err),
    filling: renderFilling,
    sending: renderSending,
    sent: renderSent,
  };

  mapping[state](error);
};

export {
  render,
  messageElement,
  formElement,
  inputElement,
  buttonElement,
};

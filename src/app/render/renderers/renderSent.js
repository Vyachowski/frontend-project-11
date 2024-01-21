import setElementStyle from '../../../element_utilities/setElementStyle.js';
import setElementText from '../../../element_utilities/setElementText.js';
import createElement from '../../../element_utilities/createElement.js';

const renderSectionsTitles = (postSectionTitle, feedSectionTitle) => {
  const postCardBody = document.querySelector('.posts-card-body');
  const feedCardBody = document.querySelector('.feeds-card-body');
  const postsHeader = createElement('h2', ['card-title', 'h4'], postSectionTitle);
  const feedHeader = createElement('h2', ['card-title', 'h4'], feedSectionTitle);

  postCardBody.appendChild(postsHeader);
  feedCardBody.appendChild(feedHeader);
};

const renderSent = (elements, watchedState) => {
  const { messageElement, inputElement } = elements;
  const { translation } = watchedState;
  const { title: feedTitleText } = translation.feed;
  const { title } = translation.post;
  const isHeadersExist = document.querySelectorAll('h2.card-title').length === 2;

  setElementStyle(messageElement, 'success');
  setElementText(messageElement, translation.rssForm.downloadMessage);
  setElementText(inputElement, '');

  if (!isHeadersExist) renderSectionsTitles(title, feedTitleText);
};

export default renderSent;

import setElementText from '../../../element_utilities/setElementText.js';
import setElementAttributes from '../../../element_utilities/setElementAttributes.js';

const renderModalWindow = (watchedState, value) => {
  if (!value) {
    return;
  }
  const modalTitle = document.querySelector('.modal-title');
  const modalText = document.querySelector('.modal-body');
  const modalLink = document.querySelector('.full-article');
  const closeButton = document.querySelector('[data-i18n="modalWindow.secondaryButton"]');
  const { title, description, link } = watchedState.uiState.activePost;

  setElementText(modalTitle, title);
  setElementText(modalText, description);
  setElementText(modalLink, watchedState.translation.modalWindow.mainButton);
  setElementText(closeButton, watchedState.translation.modalWindow.secondaryButton);
  setElementAttributes(modalLink, { href: link });
};

export default renderModalWindow;

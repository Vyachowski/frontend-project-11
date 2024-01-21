import { inputController, formController, closeModalWindowButtonController } from './controller/index.js';
import createWatchedState from './model/index.js';

const app = (i18next) => {
  const { watchedState, setFormState } = createWatchedState(i18next);

  const formElement = document.querySelector('.rss-form');
  const [inputElement] = formElement.elements;
  const modalWindowCloseButtonElement = document.querySelector('button[data-bs-dismiss="modal"]');

  inputElement.addEventListener('input', (e) => inputController(e, watchedState, setFormState));
  formElement.addEventListener('submit', (e) => formController(e, watchedState, setFormState));
  modalWindowCloseButtonElement.addEventListener('click', () => closeModalWindowButtonController(watchedState));
};

export default app;

import { inputController, formController } from './controller/index.js';
import createWatchedState from './model/index.js';

const app = (i18next) => {
  const { watchedState, setState } = createWatchedState(i18next);

  const formElement = document.querySelector('.rss-form');
  const [inputElement] = formElement.elements;

  inputElement.addEventListener('input', (e) => inputController(e, watchedState, setState));
  formElement.addEventListener('submit', (e) => formController(e, watchedState, setState));
};

export default app;

import { inputController, formController } from './appController.js';
import createWatchedState from './appModel.js';

const app = (i18next) => {
  const formElement = document.querySelector('.rss-form');
  const [inputElement] = formElement.elements;
  const { watchedState, setState } = createWatchedState(i18next);

  inputElement.addEventListener('input', (e) => inputController(e, watchedState, setState));
  formElement.addEventListener('submit', (e) => formController(e, watchedState, setState));
};

export default app;

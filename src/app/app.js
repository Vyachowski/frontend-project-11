import { inputController, formController } from './appController.js';

const app = (i18next) => {
  const formElement = document.querySelector('.rss-form');
  const [inputElement] = formElement.elements;

  inputElement.addEventListener('input', (e) => inputController(e, i18next));
  formElement.addEventListener('submit', (e) => formController(e, i18next));
};

export default app;

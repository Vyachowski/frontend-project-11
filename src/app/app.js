import { inputElement, formElement } from './appView.js';
import { inputController, formController } from './appController.js';

const app = (i18next) => {
  inputElement.addEventListener('input', (e) => inputController(e, i18next));
  formElement.addEventListener('submit', (e) => formController(e));
};

export default app;

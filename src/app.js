import { rssFormElement, rssFormInputElement } from './appView.js';
import { inputController, formController } from './appController.js';

const app = (i18next) => {
  rssFormInputElement.addEventListener('input', (e) => inputController(e, i18next));
  rssFormElement.addEventListener('submit', (e) => formController(e));
};

export default app;

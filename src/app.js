import { rssFormElement, rssFormInputElement } from './rssView.js';
import { inputController, formController } from './rssController.js';

const app = (i18next) => {
  rssFormInputElement.addEventListener('input', (e) => inputController(e, i18next));
  rssFormElement.addEventListener('submit', (e) => formController(e));
};

export default app;

import * as i18n from 'i18next';
import { Modal } from 'bootstrap';
import resources from './app/locales/index.js';
import app from './app/app.js';
import './styles.scss';

const runApp = () => {
  document.querySelectorAll('[data-bs-toggle="modal"]')
    .forEach((modal) => {
      new Modal(modal);
    });

  const i18nextInstance = i18n.createInstance();
  i18nextInstance.init({
    lng: 'ru',
    debug: true,
    resources,
  }).then(() => app(i18nextInstance))
    .catch((err) => console.log(err));
};

runApp();

import * as i18n from 'i18next';
import resources from './app/locales/index.js';
import app from './app/app.js';
import './styles.scss';
import 'bootstrap';

const runApp = () => {
  const i18nextInstance = i18n.createInstance();
  i18nextInstance.init({
    lng: 'ru',
    debug: true,
    resources,
  }).then(() => app(i18nextInstance))
    .catch((err) => console.log(err));
};

runApp();

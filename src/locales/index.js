import en from './en.js';
import ru from './ru.js';

export function changeLanguage(i18instance, newLanguage) {
  i18instance.changeLanguage(newLanguage)
    .then(() => {
      document.querySelectorAll('[data-i18n]').forEach((element) => {
        const key = element.getAttribute('data-i18n');
        // eslint-disable-next-line
        element.textContent = i18instance.t(key);
      });
    }).catch((err) => console.log(err));
}

export default { en, ru };

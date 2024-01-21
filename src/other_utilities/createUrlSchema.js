import * as yup from 'yup';
import { setLocale } from 'yup';

const createUrlSchema = () => {
  setLocale({
    mixed: {
      required: 'urlRequired',
    },
    string: {
      url: 'urlInvalid',
    },
  });

  return yup.string().required().url();
};

export default createUrlSchema;

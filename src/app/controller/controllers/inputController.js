import createUrlSchema from '../../../other_utilities/createUrlSchema.js';

const inputController = (e, watchedState, setFormState) => {
  const feedLink = e.target.value;
  const urlSchema = createUrlSchema();

  urlSchema.validate(feedLink)
    .then((url) => {
      const params = { url };
      setFormState(watchedState, 'filling', params);
    })
    .catch(({ message }) => {
      const params = message
        ? watchedState.translation.errors[message]
        : watchedState.translation.errors.defaultError;
      setFormState(watchedState, 'error', params);
    });
};

export default inputController;

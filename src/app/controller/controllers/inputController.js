import createUrlSchema from '../../../other_utilities/createUrlSchema.js';

const inputController = (e, watchedState, setState) => {
  const feedLink = { url: e.target.value };
  const urlSchema = createUrlSchema();

  urlSchema.validate(feedLink)
    .then(({ url }) => {
      const params = { url };
      setState(watchedState, 'filling', params);
    })
    .catch(({ message }) => {
      const params = message
        ? watchedState.translation.errors[message]
        : watchedState.translation.errors.defaultError;
      setState(watchedState, 'error', params);
    });
};

export default inputController;

const setElementStyle = (element, style) => {
  const newElement = element;
  const SUCCESS_CLASS = 'text-success';
  const DANGER_CLASS = 'text-danger';
  const INVALID_CLASS = 'is-invalid';
  const mapping = {
    success: () => {
      newElement.classList.remove(SUCCESS_CLASS);
      newElement.classList.add(DANGER_CLASS);
    },
    danger: () => {
      newElement.classList.remove(SUCCESS_CLASS);
      newElement.classList.add(DANGER_CLASS);
    },
    invalid: () => {
      newElement.classList.add(INVALID_CLASS);
    },
    valid: () => {
      newElement.classList.remove(INVALID_CLASS);
    },
  };

  mapping[style]();
};

export default setElementStyle;

const renderModalWindow = (state, value) => {
  const modalWindow = document.getElementById('modal');

  if (!value) {
    modalWindow.classList.remove('show');
  } else {
    modalWindow.classList.add('show');
  }
};

export default renderModalWindow;

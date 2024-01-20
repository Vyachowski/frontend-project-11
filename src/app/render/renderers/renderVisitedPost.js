const renderVisitedPost = (id) => {
  const visitedLink = document.querySelector(`a[data-id="${id}"]`);

  visitedLink.classList.remove('fw-bold');
  visitedLink.classList.add('fw-normal');
  visitedLink.classList.add('link-secondary');
};

export default renderVisitedPost;

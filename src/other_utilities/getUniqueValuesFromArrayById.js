const getUniqueValuesFromArrayById = (newArray, previousArray) => {
  const idList = previousArray.map((el) => el.id);
  return newArray.filter(({ id: newPostId }) => !idList.includes(newPostId));
};

export default getUniqueValuesFromArrayById;

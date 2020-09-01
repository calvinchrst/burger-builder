export const updateObject = (oldObject, updatedProperties) => {
  return { ...oldObject, ...updatedProperties };
};

export const stringToSentenceCase = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

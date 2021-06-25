export const sortRadioTypes = obj => {
  const sortOrder = ['is2dot4GHz', 'is5GHz', 'is5GHzL', 'is5GHzU'];

  return obj.sort((a, b) => sortOrder.indexOf(a) - sortOrder.indexOf(b));
};

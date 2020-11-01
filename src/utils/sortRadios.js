export const sortRadios = obj => {
  const sortOrder = ['is2dot4GHz', 'is5GHz', 'is5GHzU', 'is5GHzL'];

  return obj.sort((a, b) => sortOrder.indexOf(a) - sortOrder.indexOf(b));
};

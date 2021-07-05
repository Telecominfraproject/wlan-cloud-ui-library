const RADIO_ORDER = ['is2dot4GHz', 'is5GHz', 'is5GHzL', 'is5GHzU'];

export const sortRadioTypes = obj => {
  return obj.sort((a, b) => RADIO_ORDER.indexOf(a) - RADIO_ORDER.indexOf(b));
};

import { useHistory } from 'react-router-dom';

const useHistoryCustom = () => {
  const history = useHistory();
  const pushWithSearch = route =>
    history.push({ pathname: route, search: history.location.search });
  const replaceWithSearch = route =>
    history.replace({ pathname: route, search: history.location.search });

  const preserveQueryParams = route => ({ pathname: route, search: history.location.search });
  return { history, pushWithSearch, replaceWithSearch, preserveQueryParams };
};

export { useHistoryCustom as useHistory };

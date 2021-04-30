import { useHistory } from 'react-router-dom';
import { useCallback, useState } from 'react';

const useHistoryCustom = () => {
  const history = useHistory();
  const pushWithSearch = route =>
    history.push({ pathname: route, search: history.location.search });
  const replaceWithSearch = route =>
    history.replace({ pathname: route, search: history.location.search });

  const preserveQueryParams = route => ({ pathname: route, search: history.location.search });
  return { history, pushWithSearch, replaceWithSearch, preserveQueryParams };
};

const useChartLegend = (data = []) => {
  const [hover, setHover] = useState(null);

  const [legendOptions, setLegendOptions] = useState(
    data.reduce((accumulator, currentValue) => {
      accumulator[currentValue] = true;
      return accumulator;
    }, {})
  );

  const handleLegendMouseEnter = useCallback(e => {
    setHover(e.value);
  }, []);

  const handleLegendMouseLeave = useCallback(() => {
    setHover(null);
  }, []);

  const selectItem = e => {
    setLegendOptions({
      ...legendOptions,
      [e.value]: !legendOptions[e.value],
    });
  };

  const allLegendsItemsHidden = Object.keys(legendOptions).every(i => !legendOptions[i]);

  return {
    hover,
    allLegendsItemsHidden,
    legendOptions,
    handleLegendMouseEnter,
    handleLegendMouseLeave,
    selectItem,
  };
};

const useChartHover = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const onMouseOver = useCallback((_, index) => {
    setActiveIndex(index);
  }, []);

  const onMouseLeave = useCallback(() => {
    setActiveIndex(null);
  }, []);

  return { activeIndex, onMouseOver, onMouseLeave };
};

export { useHistoryCustom as useHistory, useChartLegend, useChartHover };

/* eslint-disable default-case,no-loop-func,no-underscore-dangle,no-param-reassign */
import { each } from 'lodash';

import ChartFunctions from 'utils/ChartFunctions';

const DATA_INTERVAL_DEFAULT = 15000;
const TIMEZONE_OFFSET = new Date().getTimezoneOffset() * 60000;

const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return 0;

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  // eslint-disable-next-line no-restricted-properties
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
};

const processMetrics = (data, dataInterval, dates) => {
  const series = {};
  const startTimestamp = dates.fromDateMoment.valueOf() - TIMEZONE_OFFSET;
  const endTimestamp = dates.toDateMoment.valueOf() - TIMEZONE_OFFSET;

  const rssiData = { id: 'rssi', data: new Array(data.length) };
  const rxData = { id: 'rx', data: new Array(data.length) };
  const txData = { id: 'tx', data: new Array(data.length) };

  each([rssiData, rxData, txData], value => {
    let dataProperty;
    switch (value.id) {
      case 'rssi':
        dataProperty = 'rssi';
        value.min = -90;
        value.max = -40;
        break;
      case 'rx':
        dataProperty = 'rxBytes';
        value.min = 0;
        value.max = 5000;
        break;
      case 'tx':
        dataProperty = 'txBytes';
        value.min = 0;
        value.max = 5000;
        break;
    }

    const populateData = (sourceDataItemInInterval, index, sourceData) => {
      value.data[index] = [
        sourceData[index].createdTimestamp - TIMEZONE_OFFSET,
        sourceData[index][dataProperty],
      ];
      if (dataProperty === 'rx' || dataProperty === 'tx') {
        value.data[index] = [
          sourceData[index].createdTimestamp - TIMEZONE_OFFSET,
          formatBytes(sourceData[index][dataProperty], 1),
        ];
      }
    };

    series[dataProperty] = value;

    ChartFunctions.fillDataBySetInterval({
      sourceData: data,
      series: value,
      populateChartCallback: populateData,
      dataSourceTimestampProperty: 'createdTimestamp',
      timezoneOffset: TIMEZONE_OFFSET,
      dataInterval,
      seriesDataTimestampProperty: 0,
      chartMinTimestamp: startTimestamp,
      chartMaxTimestamp: endTimestamp,
    });
  });

  return series;
};

export const deviceHistoryChartModel = (history, dates) =>
  processMetrics(history || [], DATA_INTERVAL_DEFAULT, dates);

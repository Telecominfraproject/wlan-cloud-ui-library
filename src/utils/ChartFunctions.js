/* eslint-disable */

import _ from 'lodash';

class ChartFunctions {
  static colors = {
    idle: '#f4f6f5',
    excellent: '#0497D6',
    average: '#F08521',
    poor: '#D11D1D',
  };

  /**
   * Utility function to do an actual round to specific decimal places and still return a number (native Javascript returns a string)
   * @param theNumber
   * @param decimalPlaces
   * @returns {number}
   */
  static toDecimalPlaces(theNumber, decimalPlaces) {
    const decimalPlacesMultiplier = 10 ** decimalPlaces;

    return Math.round(theNumber * decimalPlacesMultiplier) / decimalPlacesMultiplier;
  }

  /**
   * Utility function to set the y axis min value of the chart (in cases where it's not always 0)
   * @param config
   * @param axis
   * @returns {Array}
   */
  static getLowestAxisValue(config, axis) {
    let lowestValue = [];
    axis = axis === 'x' ? 0 : 1;

    if (config.series && config.series.length) {
      for (let i = 0; i < config.series.length; i++) {
        let tempValue = false;
        for (let a = 0; a < config.series[i].data.length; a++) {
          if (tempValue === false || config.series[i].data[a][axis] <= tempValue) {
            tempValue = config.series[i].data[a][axis];
          }
        }
        if (tempValue !== false) {
          lowestValue.push(tempValue);
        }
      }
    }

    if (!lowestValue.length) {
      lowestValue = null;
    } else {
      if (lowestValue.length === 1) {
        lowestValue = lowestValue[0];
      } else {
        lowestValue.sort(function(a, b) {
          return a - b;
        });
        lowestValue = lowestValue[0];
      }
    }

    return lowestValue;
  }

  /**
   * in timestamp charts Highcharts by default zooms in to show the data set based on the x axis timestamp, this function fills in the space between min and max timestamps to force the chart to show the full time range visually
   * @param chartSeriesData
   * @param params; object params are {increment: <int> in milliseconds, startTimestamp: <int>, endTimestamp: <int>, excludeStartFill: <boolean>, excludeEndFill: <boolean>}
   * @returns {*}; chartSeriesData with the new filled in data points
   */
  static forceSeriesMinAndMaxTimestamps(chartSeriesData, params) {
    let i;
    let steps;
    let newTimestamp;
    let modifiedChartSeriesData = chartSeriesData;
    const filler = params.filler || null;

    if (chartSeriesData && chartSeriesData.length) {
      const isObject = _.isPlainObject(chartSeriesData[0]);
      let startFill = [];
      let endFill = [];

      // grab the first timestamp in the data set and fill in the gaps according to "increment" back to the startTimestamp
      if (!params.excludeStartFill) {
        const itemFirstTimestamp = isObject ? chartSeriesData[0].x : chartSeriesData[0][0];
        if (itemFirstTimestamp > params.startTimestamp) {
          steps = Math.floor((itemFirstTimestamp - params.startTimestamp) / params.increment) || 1;
          startFill = new Array(steps);
          for (i = 0; i < startFill.length; i++) {
            newTimestamp = params.startTimestamp + i * params.increment;
            if (newTimestamp > itemFirstTimestamp) {
              newTimestamp -= params.increment;
            }
            startFill[i] = isObject
              ? {
                  x: newTimestamp,
                  y: filler,
                  marker: {
                    enabled: false,
                    states: { hover: { enabled: false } },
                  },
                  a2wDisabled: true,
                }
              : [newTimestamp, filler];
          }
        }
      }
      if (!params.excludeEndFill) {
        // grab the last timestamp in the data set and fill in the gaps according to "increment" until endTimestamp
        const itemLastTimestamp = isObject
          ? chartSeriesData[chartSeriesData.length - 1].x
          : chartSeriesData[chartSeriesData.length - 1][0];
        if (itemLastTimestamp < params.endTimestamp) {
          steps = Math.ceil((params.endTimestamp - itemLastTimestamp) / params.increment) || 1;
          endFill = new Array(steps);
          for (i = 0; i < endFill.length; i++) {
            newTimestamp = itemLastTimestamp + i * params.increment;
            if (newTimestamp === itemLastTimestamp) {
              newTimestamp += params.increment;
            } else if (newTimestamp > params.endTimestamp) {
              newTimestamp = params.endTimestamp;
            }
            endFill[i] = isObject
              ? {
                  x: newTimestamp,
                  y: filler,
                  marker: {
                    enabled: false,
                    states: { hover: { enabled: false } },
                  },
                  a2wDisabled: true,
                }
              : [newTimestamp, filler];
          }
        }
      }
      if (startFill.length || endFill.length) {
        modifiedChartSeriesData = startFill.concat(chartSeriesData, endFill);
      }
    } else if (chartSeriesData && !chartSeriesData.length) {
      modifiedChartSeriesData = [
        [params.startTimestamp, null],
        [params.endTimestamp, null],
      ];
    }

    return modifiedChartSeriesData;
  }

  /**
   * Based on metricGaps array actually fill in the gaps in the highcharts series data array
   * @param metricGaps; array of gap start and end times, eg. [ [firstTimestampOfSeriesGapItem, lastTimestampOfSeriesGapItem], [...], ... ]
   * @param seriesToFill; series object with 'data' property
   * @param dataInterval; the millisecond interval that you expect the data to be between points
   * @param timestampProperty; name of the property (or index of array) on the sourceData item that contains the timestamp needed
   * @param objectTemplate; if data item is a highcharts data object, define the object here with predefined properties you want on a data item, else leave null/undefined
   */
  static fillArrayGapsInBetween(
    metricGaps,
    seriesToFill,
    dataInterval,
    timestampProperty,
    objectTemplate
  ) {
    const isObject = typeof objectTemplate === 'object';
    const modifiedTimestampProperty = timestampProperty || (isObject ? 'x' : 0);
    let valueProperty;
    if (isObject) {
      valueProperty = modifiedTimestampProperty === 'x' ? 'y' : 'x';
    } else {
      valueProperty = modifiedTimestampProperty === 0 ? 1 : 0;
    }

    for (let i = 0; i < metricGaps.length; i++) {
      const firstIndex = _.findIndex(seriesToFill.data, function(o) {
        return metricGaps[i][0] === (isObject ? o[timestampProperty] : o[0]);
      });
      const lastIndex = _.findIndex(seriesToFill.data, function(o) {
        return metricGaps[i][1] === (isObject ? o[timestampProperty] : o[0]);
      });
      if (firstIndex > -1 && lastIndex > -1) {
        const diff = metricGaps[i][1] - metricGaps[i][0];
        const increments = Math.ceil(diff / dataInterval);
        const fillerArray = [];
        for (let a = 0; a < increments; a++) {
          const newTimestamp = metricGaps[i][0] + dataInterval * (a + 1);
          if (newTimestamp < metricGaps[i][1]) {
            let object = isObject ? _.cloneDeep(objectTemplate) : [];
            if (typeof object === 'object') {
              object[timestampProperty] = newTimestamp;
              object[valueProperty] = null;
            } else {
              object = [newTimestamp, null];
            }
            fillerArray.push(object);
          }
        }

        const data = seriesToFill.data;
        seriesToFill.data = data
          .slice(0, firstIndex + 1)
          .concat(fillerArray)
          .concat(data.slice(lastIndex));
      }
    }
  }

  /**
   * This is an all-in-one function to use the other functions (forceSeriesMinAndMaxTimestamps and fillArrayGapsInBetween) to cause a chart series to explicitly show gaps in a timeline without highcharts "squeezing" out those gaps
   * @param params; {
     sourceData; array of data to populate the chart series data,
     series; series object with 'data' property,
     populateChartCallback; populateChartCallback(sourceDataItemInInterval, index, sourceData) function to set the chart series data from source data,
     dataSourceTimestampProperty; name of the property (or index of array or function(item, index, arrayOfItems)) on the sourceData item that contains the timestamp needed,
     timezoneOffset; (milliseconds) highcharts requires the timestamp offset from UTC, it does not automatically convert the format to local time,
     dataInterval; the millisecond interval that you expect the data to be between points,
     seriesDataTimestampProperty;,
     objectTemplate; if data item is a highcharts data object, define the object here with predefined properties you want on a data item, else leave null/undefined
     chartMinTimestamp;
     chartMaxTimestamp;
   * }
   */
  static fillDataBySetInterval(params) {
    const sourceData = params.sourceData;
    const series = params.series;
    const populateChartCallback = params.populateChartCallback;
    const dataSourceTimestampProperty = params.dataSourceTimestampProperty;
    const timezoneOffset = params.timezoneOffset;
    const dataInterval = params.dataInterval;
    const seriesDataTimestampProperty = params.seriesDataTimestampProperty;
    const objectTemplate = params.objectTemplate;
    const chartMinTimestamp = params.chartMinTimestamp;
    const chartMaxTimestamp = params.chartMaxTimestamp;
    const metricGaps = [];
    const parsedDataInterval = dataInterval + (dataInterval - 1); // large margin of error (dataInterval - 1)

    for (let i = 0; i < sourceData.length; i++) {
      populateChartCallback(sourceData[i], i, sourceData);

      if (i + 1 < sourceData.length - 1) {
        const timestamp =
          typeof dataSourceTimestampProperty === 'function'
            ? dataSourceTimestampProperty(sourceData[i], i, sourceData)
            : sourceData[i][dataSourceTimestampProperty];
        const nextTimestamp =
          typeof dataSourceTimestampProperty === 'function'
            ? dataSourceTimestampProperty(sourceData[i + 1], i + 1, sourceData)
            : sourceData[i + 1][dataSourceTimestampProperty];
        if (nextTimestamp - timestamp > parsedDataInterval) {
          metricGaps.push([timestamp - timezoneOffset, nextTimestamp - timezoneOffset]);
        }
      }
    }

    this.fillArrayGapsInBetween(
      metricGaps,
      series,
      dataInterval,
      seriesDataTimestampProperty,
      objectTemplate
    );

    series.data = this.forceSeriesMinAndMaxTimestamps(series.data, {
      increment: dataInterval,
      startTimestamp: chartMinTimestamp,
      endTimestamp: chartMaxTimestamp,
    });
  }
}

export default ChartFunctions;

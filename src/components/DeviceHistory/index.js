import React, { useMemo } from 'react';
import T from 'prop-types';
import moment from 'moment';
import Highcharts from 'highcharts/highstock';
import {
  HighchartsStockChart,
  Chart,
  withHighcharts,
  XAxis,
  YAxis,
  AreaSplineSeries,
  Tooltip,
  Loading,
} from 'react-jsx-highstock';
import addHighchartsMore from 'highcharts/highcharts-more';

import { deviceHistoryChartModel } from './models';

addHighchartsMore(Highcharts);

const TIMEZONE_OFFSET = new Date().getTimezoneOffset() * 60000;

const dateTimeLabelFormats = {
  millisecond: '%l:%M:%S%P',
  second: '%l:%M:%S%P',
  minute: '%l:%M:%S%P',
  hour: '%l:%M:%S%P',
  day: '%a. %l:%M:%S%P',
  week: '',
  month: '',
  year: '',
};

const metricsHeight = 25;
const metricsPadding = 8;

const metrics = {
  rssi: 'RSSI',
  rxBytes: 'RX Mbps',
  txBytes: 'TX Mbps',
};

const toDecimalPlaces = (theNumber, decimalPlaces) => {
  const decimalPlacesMultiplier = 10 ** decimalPlaces;

  return Math.round(theNumber * decimalPlacesMultiplier) / decimalPlacesMultiplier;
};

function tooltipFormatter() {
  const html = [];

  if (this.points && this.points.length) {
    html.push(moment.utc(this.points[0].x).format('MMM D, YYYY h:mm:ss A'));
    html.push('<br /><span style="color: transparent">.</span><br />');

    for (let i = 0; i < this.points.length; i += 1) {
      html.push(`<strong>${this.points[i].series.name}</strong>`);
      let unit = '';
      if (
        this.points[i].series.name === metrics.rxBytes ||
        this.points[i].series.name === metrics.txBytes
      ) {
        unit = ' Mbps';
      }

      html.push(toDecimalPlaces(this.points[i].point.y, 2) + unit);

      if (i < this.points.length - 1) {
        html.push('<br />');
      }
    }
  }
  return html.join('<br />');
}

const DeviceHistoryChart = ({ loading, data, historyDate }) => {
  const config = useMemo(
    () =>
      deviceHistoryChartModel(data, {
        fromDateMoment: historyDate.subtract(4, 'hours'),
        toDateMoment: historyDate.add(4, 'hours'),
      }),
    [data, historyDate]
  );

  const renderMetrics = (i, id, label, series, min, max) => {
    const top = i * metricsHeight + i * metricsPadding + 5; // the 5 is the top margin
    const color = i % 2 ? '#00A3CC' : '#265EAC';
    const fillColor =
      i % 2
        ? {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
              [0, 'rgba(0,163,204,1)'],
              [1, 'rgba(0,163,204,0.1)'],
            ],
          }
        : {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
              [0, 'rgba(38,94,172,1)'],
              [1, 'rgba(38,94,172,0.1)'],
            ],
          };
    return (
      <YAxis
        key={id}
        opposite
        id={id}
        gridLineWidth={0}
        offset={25}
        startOnTick={false}
        tickPixelInterval={10}
        height={`${metricsHeight}%`}
        top={`${top}%`}
        min={min}
        max={max}
      >
        <YAxis.Title>{label}</YAxis.Title>
        <AreaSplineSeries
          id={label}
          name={label}
          data={series}
          color={color}
          lineColor={color}
          showInLegend={false}
          threshold={null}
          fillColor={fillColor}
          lineWidth={1}
          states={{
            hover: {
              lineWidthPlus: 0,
              marker: {
                enabled: true,
                radius: 2,
              },
            },
          }}
        />
      </YAxis>
    );
  };

  return (
    <HighchartsStockChart>
      <Chart
        backgroundColor="transparent"
        plotBackgroundColor={null}
        plotBorderWidth={0}
        plotShadow={false}
        height={400}
        spacingTop={0}
        spacingBottom={0}
      />
      <Loading
        isLoading={loading}
        style={{
          opacity: 1,
          backgroundColor: 'transparent',
        }}
      >
        Loading...
      </Loading>

      <Tooltip shared xDateFormat="%b %e %Y %l:%M:%S%P" formatter={tooltipFormatter} />

      <XAxis
        tickPixelInterval={90}
        dateTimeLabelFormats={dateTimeLabelFormats}
        offset={20}
        type="datetime"
        showEmpty
        plotLines={[
          {
            id: 'event_line',
            color: '#BFBFBF',
            dashStyle: 'ShortDot',
            width: 1,
            value: historyDate.valueOf() - TIMEZONE_OFFSET,
          },
        ]}
      />

      {renderMetrics(0, 'rssi', metrics.rssi, config.rssi.data, -90, -40)}
      {renderMetrics(1, 'rxBytes', metrics.rxBytes, config.rxBytes.data, 0, 500)}
      {renderMetrics(2, 'txBytes', metrics.txBytes, config.txBytes.data, 0, 500)}
    </HighchartsStockChart>
  );
};

DeviceHistoryChart.propTypes = {
  data: T.instanceOf(Object),
  historyDate: T.instanceOf(Object),
  loading: T.bool,
};

DeviceHistoryChart.defaultProps = {
  data: {},
  historyDate: {},
  loading: false,
};

export default withHighcharts(DeviceHistoryChart, Highcharts);

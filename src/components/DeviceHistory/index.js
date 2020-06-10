import React from 'react';
import T from 'prop-types';
import moment from 'moment';
import Highcharts from 'highcharts/highstock';
import {
  HighchartsStockChart,
  Chart,
  withHighcharts,
  XAxis,
  YAxis,
  Legend,
  AreaSplineSeries,
  Tooltip,
  Loading,
} from 'react-jsx-highstock';
import addHighchartsMore from 'highcharts/highcharts-more';

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

const metricsHeight = 8.5;
const metricsPadding = 3;

const metrics = {
  rssi: 'RSSI',
  rxDataRateMbps: 'RX Mbps',
  txDataRateMbps: 'TX Mbps',
};

const toDecimalPlaces = (theNumber, decimalPlaces) => {
  const decimalPlacesMultiplier = 10 ** decimalPlaces;

  return Math.round(theNumber * decimalPlacesMultiplier) / decimalPlacesMultiplier;
};

const tooltipFormatter = () => {
  const html = [];

  if (this.points && this.points.length) {
    html.push(moment.utc(this.points[0].x).format('MMM D, YYYY h:mm:ss A'));
    html.push('<br /><span style="color: transparent">.</span><br />');

    for (let i = 0; i < this.points.length; i += 1) {
      html.push(`<strong>${this.points[i].series.name}</strong>`);
      let unit = '';
      if (
        this.points[i].series.name === metrics.rxDataRateMbps ||
        this.points[i].series.name === metrics.txDataRateMbps
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
};

const DeviceHistoryChart = ({ loading, data, historyDate }) => {
  let eventLine = null;

  let rssi = [];
  let rxDataRateMbps = [];
  let txDataRateMbps = [];

  if (historyDate) {
    eventLine = historyDate.valueOf() - TIMEZONE_OFFSET;
  }

  if ((!loading, data)) {
    rssi = data.rssi.data;
    rxDataRateMbps = data.rxDataRateMbps.data;
    txDataRateMbps = data.txDataRateMbps.data;
  }

  const renderMetrics = (i, id, label, series, min, max) => {
    const top = i * metricsHeight + i * metricsPadding + 15;
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
        height={750}
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
      <Legend verticalAlign="top" top={0} />

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
            value: eventLine,
          },
        ]}
      />

      {renderMetrics(1, 'rssi', metrics.rssi, rssi, -90, -40)}
      {renderMetrics(2, 'rxDataRateMbps', metrics.rxDataRateMbps, rxDataRateMbps, 0, 500)}
      {renderMetrics(3, 'txDataRateMbps', metrics.txDataRateMbps, txDataRateMbps, 0, 500)}
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

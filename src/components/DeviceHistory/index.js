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

addHighchartsMore(Highcharts);

const dateTimeLabelFormats = {
  millisecond: '%l:%M%P',
  second: '%l:%M%P',
  minute: '%l:%M%P',
  hour: '%l:%M%P',
  day: '%a. %l:%M%P',
  week: '',
  month: '',
  year: '',
};

const metricsHeight = 25;
const metricsPadding = 8;

const METRICS = {
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
    html.push(moment(this.points[0].x).format('MMM D, YYYY h:mm A'));
    html.push('<br /><span style="color: transparent">.</span><br />');

    for (let i = 0; i < this.points.length; i += 1) {
      html.push(`<strong>${this.points[i].series.name}</strong>`);
      let unit = '';
      if (
        this.points[i].series.name === METRICS.rxBytes ||
        this.points[i].series.name === METRICS.txBytes
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

const DeviceHistoryChart = ({ loading, data }) => {
  const config = useMemo(() => {
    const rssi = { id: 'rssi', data: [] };
    const rx = { id: 'rx', data: [] };
    const tx = { id: 'tx', data: [] };

    data.forEach(i => {
      const timestamp = parseInt(i.createdTimestamp, 10);
      rssi.data.push([timestamp, i.rssi]);
      rx.data.push([timestamp, i.detailsJSON.averageRxRate]);
      tx.data.push([timestamp, i.detailsJSON.averageTxRate]);
    });

    return { rssi, rx, tx };
  }, [data]);

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
          gapSize={120000}
          gapUnit="value"
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
    <HighchartsStockChart
      time={{
        useUTC: false,
      }}
    >
      <Chart
        backgroundColor="transparent"
        plotBackgroundColor={null}
        plotBorderWidth={0}
        plotShadow={false}
        height={350}
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

      <Tooltip shared formatter={tooltipFormatter} />

      <XAxis
        time={{
          useUTC: false,
        }}
        tickPixelInterval={90}
        dateTimeLabelFormats={dateTimeLabelFormats}
        type="datetime"
        showEmpty
      />

      {renderMetrics(0, 'rssi', METRICS.rssi, config.rssi.data, -100, -40)}
      {renderMetrics(1, 'rxBytes', METRICS.rxBytes, config.rx.data, 0, 1000)}
      {renderMetrics(2, 'txBytes', METRICS.txBytes, config.tx.data, 0, 1000)}
    </HighchartsStockChart>
  );
};

DeviceHistoryChart.propTypes = {
  data: T.instanceOf(Object),
  loading: T.bool,
};

DeviceHistoryChart.defaultProps = {
  data: {},
  loading: false,
};

export default withHighcharts(DeviceHistoryChart, Highcharts);

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts/highstock';
import {
  HighchartsStockChart,
  Chart,
  withHighcharts,
  XAxis,
  YAxis,
  Legend,
  SplineSeries,
  Tooltip,
} from 'react-jsx-highstock';
import { formatBytes, labelFormatter } from 'utils/bytes';

import Loading from 'components/Loading';

const formatName = (name, value) => {
  if (name.includes('Temperature')) {
    return `${name}: <b>${value}°C</b>`;
  }
  if (name.includes('Memory')) {
    return `${name}: <b>${formatBytes(value)}</b>`;
  }
  return `${name}: <b>${value}%</b>`;
};

function tooltipFormatter() {
  const { series, y } = this;
  return `<span style="color:${this.color}">●</span>
       ${formatName(series.name, y)}
      <br/>`;
}

const dateTimeLabelFormats = {
  minute: '%l:%M%P',
  hour: '%l:%M%P',
  day: '%a. %l:%M%P',
  week: '',
  month: '',
  year: '',
};

const HighChartGraph = ({ loading, cpuUsage, freeMemory, cpuTemp }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setVisible(i => !i);
    }, 100);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <HighchartsStockChart
      data-testid="highchartsGraph"
      time={{
        useUTC: false,
      }}
    >
      <Chart zoomType="x" backgroundColor="none" />
      <Tooltip
        split={false}
        shared
        useHTML
        xDateFormat="%b %e %Y %l:%M:%S%P"
        pointFormatter={tooltipFormatter || null}
      />
      <XAxis
        tickPixelInterval={90}
        dateTimeLabelFormats={dateTimeLabelFormats}
        offset={20}
        type="datetime"
        labels={{
          style: { color: '#fff' },
        }}
      >
        <XAxis.Title style={{ color: '#fff' }}>Time</XAxis.Title>
      </XAxis>

      <Legend itemStyle={{ color: '#fff' }}>
        <Legend.Title />
      </Legend>
      <YAxis
        id="usage"
        labels={{
          style: { color: '#7cb5ec' },
        }}
        visible={visible}
        showEmpty={false}
      >
        <YAxis.Title
          style={{
            color: '#7cb5ec',
          }}
        >
          CPU Utilization (%)
        </YAxis.Title>
        {Object.keys(cpuUsage).map(i => (
          <SplineSeries
            key={`cpuCore${i}`}
            id={`cpuCore${i}`}
            name="CPU Utilization"
            data={cpuUsage[i]}
            color="#7cb5ec"
          />
        ))}
      </YAxis>

      <YAxis
        id="free"
        labels={{
          style: { color: '#34AE29' },
          formatter: labelFormatter,
        }}
        opposite
        visible={visible}
        showEmpty={false}
      >
        <YAxis.Title
          style={{
            color: '#34AE29',
          }}
        >
          Free Memory
        </YAxis.Title>
        <SplineSeries id="freeMemory" name="Free Memory" data={freeMemory} color="#34AE29" />
      </YAxis>

      <YAxis
        id="temp"
        labels={{
          style: { color: '#f7a35c' },
        }}
        visible={visible}
        showEmpty={false}
      >
        <YAxis.Title
          style={{
            color: '#f7a35c',
          }}
        >
          CPU Temperature (°C)
        </YAxis.Title>
        <SplineSeries id="cpuTemp" name="CPU Temperature" data={cpuTemp} color="#f7a35c" />
      </YAxis>
    </HighchartsStockChart>
  );
};

HighChartGraph.propTypes = {
  loading: PropTypes.bool,
  cpuUsage: PropTypes.instanceOf(Object),
  freeMemory: PropTypes.instanceOf(Object),
  cpuTemp: PropTypes.instanceOf(Object),
};

HighChartGraph.defaultProps = {
  loading: false,
  cpuUsage: [],
  freeMemory: {},
  cpuTemp: {},
};

export default withHighcharts(HighChartGraph, Highcharts);

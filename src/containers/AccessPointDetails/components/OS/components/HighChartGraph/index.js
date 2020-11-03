import React, { useMemo } from 'react';
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

import Loading from 'components/Loading';

const processMetrics = data => {
  const cpuUtilCores = {};
  const freeMemory = [];
  const cpuTemperature = [];

  data.forEach(i => {
    if (i?.detailsJSON?.apPerformance) {
      freeMemory.push(i.detailsJSON.apPerformance.freeMemory);
      cpuTemperature.push(i.detailsJSON.apPerformance.cpuTemperature);
      i.detailsJSON.apPerformance.cpuUtilized.forEach((j, index) => {
        if (!(index in cpuUtilCores)) {
          cpuUtilCores[index] = [];
        }
        cpuUtilCores[index].push(j);
      });
    }
  });

  return { cpuUtilCores, freeMemory, cpuTemperature };
};

const HighChartGraph = ({ osData }) => {
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

  const { loading, data } = osData;

  if (loading || !data) {
    return <Loading />;
  }

  const metrics = useMemo(() => {
    return processMetrics(data);
  }, [osData]);

  return (
    <HighchartsStockChart data-testid="highchartsGraph">
      <Chart zoomType="x" backgroundColor="#141414" />

      <Tooltip split={false} shared useHTML />
      <XAxis
        tickPixelInterval={90}
        dateTimeLabelFormats={dateTimeLabelFormats}
        offset={20}
        type="datetime"
        showEmpty
      >
        <XAxis.Title>Time</XAxis.Title>
      </XAxis>

      <Legend>
        <Legend.Title />
      </Legend>
      <YAxis
        labels={{
          style: { color: '#7cb5ec' },
        }}
      >
        <YAxis.Title
          style={{
            color: '#7cb5ec',
          }}
        >
          CPU Usage (%)
        </YAxis.Title>
        {Object.keys(metrics.cpuUtilCores).map(i => (
          <SplineSeries id={`cpuCore${i}`} name={`CPU Core ${i}`} data={metrics.cpuUtilCores[i]} />
        ))}
      </YAxis>

      <YAxis
        labels={{
          style: { color: '#34AE29' },
        }}
        opposite
      >
        <YAxis.Title
          style={{
            color: '#34AE29',
          }}
        >
          Free Memory (MB)
        </YAxis.Title>
        <SplineSeries id="freeMemory" name="Free Memory" data={metrics.freeMemory} />
      </YAxis>

      <YAxis
        labels={{
          style: { color: '#f7a35c' },
        }}
      >
        <YAxis.Title
          style={{
            color: '#f7a35c',
          }}
        >
          CPU Temperature (°C)
        </YAxis.Title>
        <SplineSeries id="cpuTemp" name="CPU Temperature" data={metrics.cpuTemperature} />
      </YAxis>
    </HighchartsStockChart>
  );
};

HighChartGraph.propTypes = {
  osData: PropTypes.instanceOf(Object),
};

HighChartGraph.defaultProps = {
  osData: {},
};

export default withHighcharts(HighChartGraph, Highcharts);

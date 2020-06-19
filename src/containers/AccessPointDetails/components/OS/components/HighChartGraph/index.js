import React from 'react';
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
  RangeSelector,
  Tooltip,
} from 'react-jsx-highstock';

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

  return (
    <div style={{ marginTop: '10px' }}>
      <HighchartsStockChart>
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
          <SplineSeries id="cpuCore1" name="CPU Core 1" data={osData.CpuUtilCore2} />
          <SplineSeries id="cpuCore0" name="CPU Core 0" data={osData.CpuUtilCore1} />
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
          <SplineSeries id="freeMemory" name="Free Memory" data={osData.FreeMemory} />
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
          <SplineSeries id="cpuTemp" name="CPU Temperature" data={osData.CpuTemperature} />
        </YAxis>

        <RangeSelector
          selected={1}
          buttonSpacing={10}
          inputBoxBorderColor="gray"
          inputBoxWidth={120}
          inputBoxHeight={18}
          inputStyle={{ color: '#039', fontWeight: 'bold' }}
          labelStyle={{ colod: 'silver', fontWeight: 'bold' }}
          buttonTheme={{
            fill: 'none',
            r: '8',
            states: { select: { fill: '#039', style: { color: 'white' } } },
          }}
        >
          <RangeSelector.Button count={5} type="minute">
            5 Min
          </RangeSelector.Button>
          <RangeSelector.Button count={7} type="hour">
            1 Hr
          </RangeSelector.Button>
          <RangeSelector.Button count={1} type="day">
            1 Day
          </RangeSelector.Button>
          <RangeSelector.Input inputEnabled={false} />
        </RangeSelector>
      </HighchartsStockChart>
    </div>
  );
};

HighChartGraph.propTypes = {
  osData: PropTypes.instanceOf(Array),
};

HighChartGraph.defaultProps = {
  osData: [],
};

export default withHighcharts(HighChartGraph, Highcharts);

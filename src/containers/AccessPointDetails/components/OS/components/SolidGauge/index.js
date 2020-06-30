import React from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import highchartsMore from 'highcharts/highcharts-more';
import solidGauge from 'highcharts/modules/solid-gauge';
import {
  HighchartsChart,
  withHighcharts,
  XAxis,
  YAxis,
  Pane,
  SolidGaugeSeries,
  Chart,
} from 'react-jsx-highcharts';

import styles from './index.module.scss';

highchartsMore(Highcharts);
solidGauge(Highcharts);

const plotOptions = {
  solidgauge: {
    dataLabels: {
      y: 5,
      borderWidth: 0,
      useHTML: true,
    },
  },
};

const dataLabels = {
  format:
    '<div style="text-align:center"><span style="font-size:18px;color:white">{y}%</span><br/></div>',
  y: -50,
};

const tooltip = {
  valueSuffix: ' %',
};

const SolidGauge = ({ data, title }) => {
  return (
    <div className={styles.container}>
      <HighchartsChart gauge plotOptions={plotOptions}>
        <Chart type="solidgauge" zoomType="x" backgroundColor="#141414" />

        <Pane
          center={['50%', '55%']}
          size="80%"
          startAngle={-90}
          endAngle={90}
          background={{
            innerRadius: '60%',
            outerRadius: '100%',
            shape: 'arc',
            backgroundColor: '#434343',
          }}
        />
        <XAxis type="datetime" />
        <YAxis
          stops={[
            [0.1, '#55BF3B'],
            [0.5, '#DDDF0D'],
            [0.9, '#DF5353'],
          ]}
          lineWidth={0}
          minorTickInterval={null}
          tickPixelInterval={400}
          tickWidth={0}
          labels={{
            y: 16,
          }}
          min={0}
          max={100}
        >
          <YAxis.Title y={-110} style={{ fontSize: '18px' }}>
            {title}
          </YAxis.Title>
          <SolidGaugeSeries name={title} data={[data]} dataLabels={dataLabels} tooltip={tooltip} />
        </YAxis>
      </HighchartsChart>
    </div>
  );
};

SolidGauge.propTypes = {
  data: PropTypes.number,
  title: PropTypes.string,
};

SolidGauge.defaultProps = {
  data: 0,
  title: '',
};

export default withHighcharts(SolidGauge, Highcharts);

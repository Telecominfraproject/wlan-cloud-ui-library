import {
  Chart,
  HighchartsChart,
  Legend,
  SplineSeries,
  Tooltip,
  XAxis,
  YAxis,
  withHighcharts,
} from 'react-jsx-highcharts';
import { Card } from 'antd';
import Highcharts from 'highcharts/highstock';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './index.module.scss';

const LineChart = ({ lineChartData, title }) => {
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
    <div className={styles.container}>
      <Card title={title} className={styles.LineChart}>
        <HighchartsChart
          time={{
            useUTC: false,
          }}
        >
          <Chart type="spline" zoomType="x" backgroundColor="#141414" />
          <XAxis tickPixelInterval={90} dateTimeLabelFormats={dateTimeLabelFormats} type="datetime">
            <XAxis.Title>Time</XAxis.Title>
          </XAxis>

          <Tooltip split={false} shared useHTML />
          <Legend>
            <Legend.Title />
          </Legend>
          <YAxis minorGridLineWidth={0} gridLineWidth={0} alternateGridColor={null}>
            {Array.isArray(lineChartData?.value) ? (
              <SplineSeries name={lineChartData.name} data={lineChartData.value} />
            ) : (
              Object.keys(lineChartData).map(key => (
                <SplineSeries name={lineChartData[key].name} data={lineChartData[key].value} />
              ))
            )}
          </YAxis>
        </HighchartsChart>
      </Card>
    </div>
  );
};

LineChart.propTypes = {
  lineChartData: PropTypes.instanceOf(Object),
  title: PropTypes.string,
};

LineChart.defaultProps = {
  lineChartData: {},
  title: '',
};
export default withHighcharts(LineChart, Highcharts);

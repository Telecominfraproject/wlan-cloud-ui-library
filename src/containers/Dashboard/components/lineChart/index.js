import React from 'react';
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
import styles from './index.module.scss';

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

const LineChart = ({ lineChartData, title }) => {
  return (
    <div className={styles.container}>
      <Card title={title} className={styles.LineChart}>
        <HighchartsChart
          time={{
            useUTC: false,
          }}
        >
          <Chart type="spline" zoomType="x" backgroundColor="#141414" />
          <XAxis
            tickPixelInterval={90}
            dateTimeLabelFormats={dateTimeLabelFormats}
            type="datetime"
          />

          <Tooltip split={false} shared useHTML />
          <Legend>
            <Legend.Title />
          </Legend>
          <YAxis minorGridLineWidth={0} gridLineWidth={0} alternateGridColor={null}>
            {Array.isArray(lineChartData?.value) ? (
              <SplineSeries name={lineChartData.key} data={lineChartData.value} />
            ) : (
              Object.keys(lineChartData).map(key => {
                return (
                  <SplineSeries name={lineChartData[key].key} data={lineChartData[key].value} />
                );
              })
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

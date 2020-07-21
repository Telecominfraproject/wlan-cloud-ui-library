import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import {
  HighchartsChart,
  Chart,
  withHighcharts,
  XAxis,
  YAxis,
  Legend,
  SplineSeries,
  Tooltip,
} from 'react-jsx-highcharts';
import Highcharts from 'highcharts/highstock';
import styles from './index.module.scss';

const LineChart = ({ lineChartXAxis, lineChartYAxis, title }) => {
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
        <HighchartsChart>
          <Chart type="spline" zoomType="x" backgroundColor="#141414" />

          <XAxis
            tickPixelInterval={90}
            dateTimeLabelFormats={dateTimeLabelFormats}
            offset={20}
            type="datetime"
            categories={lineChartXAxis}
          >
            <XAxis.Title>Time</XAxis.Title>
          </XAxis>

          <Tooltip split={false} shared useHTML />
          <Legend>
            <Legend.Title />
          </Legend>
          <YAxis minorGridLineWidth={0} gridLineWidth={0} alternateGridColor={null}>
            {/* <YAxis.Title>Values</YAxis.Title> */}
            {Array.isArray(lineChartYAxis?.value) ? (
              <SplineSeries name={lineChartYAxis.name} data={lineChartYAxis.value} />
            ) : (
              Object.keys(lineChartYAxis).map(key => (
                <SplineSeries name={lineChartYAxis[key].name} data={lineChartYAxis[key].value} />
              ))
            )}
          </YAxis>
        </HighchartsChart>
      </Card>
    </div>
  );
};

LineChart.propTypes = {
  lineChartXAxis: PropTypes.instanceOf(Array),
  lineChartYAxis: PropTypes.instanceOf(Object),
  title: PropTypes.string,
};

LineChart.defaultProps = {
  lineChartXAxis: [],
  lineChartYAxis: {},
  title: '',
};
export default withHighcharts(LineChart, Highcharts);

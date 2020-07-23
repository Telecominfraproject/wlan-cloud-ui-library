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
  minute: '%l:%M%P',
  hour: '%l:%M%P',
  day: '%a. %l:%M%P',
  week: '',
  month: '',
  year: '',
};

const LineChart = ({ title, data, options }) => {
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

          <Tooltip
            split={false}
            shared
            useHTML
            xDateFormat="%b %e %Y %l:%M%P"
            pointFormatter={options.tooltipFormatter ? options.tooltipFormatter : null}
          />
          <Legend>
            <Legend.Title />
          </Legend>
          <YAxis
            minorGridLineWidth={0}
            gridLineWidth={0}
            alternateGridColor={null}
            labels={{
              formatter: options.formatter ? options.formatter : null,
            }}
          >
            {Array.isArray(data?.value) ? (
              <SplineSeries name={data.key} data={data.value} />
            ) : (
              Object.keys(data).map(key => {
                return <SplineSeries name={data[key].key} data={data[key].value} />;
              })
            )}
          </YAxis>
        </HighchartsChart>
      </Card>
    </div>
  );
};

LineChart.propTypes = {
  title: PropTypes.string,
  data: PropTypes.instanceOf(Object),
  options: PropTypes.instanceOf(Object),
};

LineChart.defaultProps = {
  title: '',
  data: {},
  options: {},
};
export default withHighcharts(LineChart, Highcharts);

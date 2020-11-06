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
import React from 'react';

import { COLORS } from 'utils/charts';
import { Card } from 'antd';
import Highcharts from 'highcharts/highstock';
import PropTypes from 'prop-types';
import Timer from 'components/Timer';
import styles from './index.module.scss';

const dateTimeLabelFormats = {
  minute: '%l:%M%P',
  hour: '%l:%M%P',
  day: '%a. %l:%M%P',
  week: '',
  month: '',
  year: '',
};

const headerStyle = {
  textAlign: 'left',
};

const LineChart = ({ title, data, options }) => {
  return (
    <div className={styles.container}>
      <Card
        title={title}
        headStyle={headerStyle}
        className={styles.LineChart}
        extra={<Timer refreshAfter={300} />}
      >
        <HighchartsChart
          time={{
            useUTC: false,
          }}
          colors={COLORS}
        >
          <Chart type="spline" zoomType="x" backgroundColor="#141414" className={styles.noSelect} />
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
              <SplineSeries key={data.key} name={data.key} data={data.value} />
            ) : (
              data &&
              Object.keys(data).map(key => (
                <SplineSeries key={key} name={data[key].key} data={data[key].value} />
              ))
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

import React, { useState, useEffect } from 'react';
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

import Timer from 'components/Timer';
import { COLORS } from 'utils/charts';
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
  const [chartData, setChartData] = useState();

  useEffect(() => {
    if (Array.isArray(data?.value)) {
      if (!chartData?.length) {
        setChartData(data.value);
        return;
      }
      const shllowData = chartData?.slice(0);
      shllowData.push(...data.more);
      setChartData(shllowData);
      return;
    }
    if (!chartData) {
      setChartData(data);
      return;
    }
    const result = {};
    Object.keys(chartData).forEach(key => {
      const shallowData = chartData[key].value.slice(0);
      shallowData.push(...data[key].more);
      result[key] = {
        ...data[key],
        value: shallowData,
      };
      setChartData(result);
    });
  }, [data]);

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
              <SplineSeries name={data.key} data={chartData} />
            ) : (
              chartData &&
              Object.keys(chartData).map(key => (
                <SplineSeries name={chartData[key].key} data={chartData[key].value} />
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

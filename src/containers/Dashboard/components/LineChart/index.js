import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import moment from 'moment';

import Timer from 'components/Timer';
import { COLORS } from 'utils/charts';
import styles from './index.module.scss';

import Card from '../Card';

const CustomTooltip = ({ active, payload, label, formatter }) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles.customTooltip}>
        <p className={styles.label}>{moment(label).format('MMM D, YYYY h:mm a')}</p>
        {payload.map(series => {
          return (
            <p key={series.name} className={styles.point}>
              <span style={{ color: series.color, marginRight: 8 }}>●</span>
              {`${series.name}:  ${formatter ? formatter(series.value) : series.value}`}
            </p>
          );
        })}
      </div>
    );
  }

  return null;
};

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.instanceOf(Object),
  label: PropTypes.number,
  formatter: PropTypes.func,
};

CustomTooltip.defaultProps = {
  active: false,
  payload: [],
  label: 0,
  formatter: null,
};

const MyLineChart = ({ title, data, options }) => {
  const lineData = useMemo(() => {
    let result = [];
    Object.keys(data).forEach(key => {
      result = [...result, data[key]];
    });

    return result;
  }, [data]);

  return (
    <Card title={title} extra={<Timer refreshAfter={300} />}>
      <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart>
            <XAxis
              dataKey="timestamp"
              type="number"
              allowDuplicatedCategory={false}
              domain={['dataMin', 'dataMax']}
              tickFormatter={timestamp => moment(timestamp).format('h:mm a')}
            />
            <YAxis
              dataKey="value"
              tickFormatter={tick => (options.formatter ? options.formatter(tick) : tick)}
            />
            <Tooltip content={<CustomTooltip formatter={options.formatter} />} />
            <Legend />
            {lineData.map((s, i) => (
              <Line
                dataKey="value"
                data={s.value}
                name={s.key}
                key={s.key}
                dot={false}
                stroke={COLORS[i]}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

MyLineChart.propTypes = {
  title: PropTypes.string,
  data: PropTypes.instanceOf(Object),
  options: PropTypes.instanceOf(Object),
};

MyLineChart.defaultProps = {
  title: '',
  data: {},
  options: {},
};
export default MyLineChart;

import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import moment from 'moment';

import Timer from 'components/Timer';
import LineGraphTooltip from 'components/LineGraphTooltip';
import { COLORS } from 'utils/charts';

import Card from '../Card';

const MyLineChart = ({ title, data, options, refreshAfter }) => {
  const lineData = useMemo(() => {
    let result = [];
    Object.keys(data).forEach(key => {
      result = [...result, data[key]];
    });
    return result;
  }, [data]);

  return (
    <Card title={title} extra={<Timer refreshAfter={refreshAfter} />}>
      <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <XAxis
              dataKey="timestamp"
              type="number"
              domain={['dataMin', 'dataMax']}
              tickFormatter={timestamp => moment(timestamp).format('h:mm a')}
              stroke="white"
              tick={{ style: { fontSize: 12 } }}
              scale="time"
            />
            <YAxis
              dataKey="value"
              tickFormatter={tick => (options.formatter ? options.formatter(tick) : tick)}
              stroke="white"
              allowDecimals={false}
              domain={[0, 'auto']}
              tick={{ style: { fontSize: 12 } }}
            />
            <Tooltip content={<LineGraphTooltip formatter={options.formatter} />} />
            <Legend />
            {lineData.map((s, i) => (
              <Line
                dataKey="value"
                data={s.value}
                name={s.key}
                key={s.key}
                dot={false}
                stroke={COLORS[i]}
                strokeWidth={2}
                formatter={options.formatter}
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
  refreshAfter: PropTypes.number,
};

MyLineChart.defaultProps = {
  title: '',
  data: {},
  options: {},
  refreshAfter: 300,
};
export default MyLineChart;

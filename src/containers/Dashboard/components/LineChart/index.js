import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import moment from 'moment';

import Timer from 'components/Timer';
import LineGraphTooltip from 'components/LineGraphTooltip';
import { COLORS } from 'utils/charts';

import Card from '../Card';

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
};

MyLineChart.defaultProps = {
  title: '',
  data: {},
  options: {},
};
export default MyLineChart;

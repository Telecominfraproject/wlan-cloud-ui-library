import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import moment from 'moment';

import Timer from 'components/Timer';
import LineGraphTooltip from 'components/GraphTooltips/LineGraphTooltip';
import { COLORS } from 'utils/charts';
import { useChartLegend } from 'hooks';
import Card from '../Card';
import styles from './index.module.scss';

const MyLineChart = ({ title, data, options, refreshAfter }) => {
  const lineData = useMemo(() => {
    let result = [];
    Object.keys(data).forEach(key => {
      result = [...result, data[key]];
    });
    return result;
  }, [data]);

  const {
    hover,
    allLegendsItemsHidden,
    legendOptions,
    handleLegendMouseEnter,
    handleLegendMouseLeave,
    selectItem,
  } = useChartLegend(lineData.map(s => s.key));

  return (
    <Card title={title} extra={<Timer refreshAfter={refreshAfter} />}>
      <div className={styles.Container}>
        {allLegendsItemsHidden && <span className={styles.Message}>No Data Available</span>}
        <ResponsiveContainer width="100%" height={400}>
          <LineChart margin={{ top: 20, right: 0, bottom: 0, left: 0 }}>
            <XAxis
              dataKey="timestamp"
              type="number"
              domain={['dataMin', 'dataMax']}
              tickFormatter={timestamp => moment(timestamp).format('h:mm a')}
              stroke="white"
              tick={{ style: { fontSize: 11 } }}
              scale="time"
              hide={allLegendsItemsHidden}
            />
            <YAxis
              dataKey="value"
              tickFormatter={tick => (options.formatter ? options.formatter(tick, 0) : tick)}
              stroke="white"
              allowDecimals={false}
              domain={[0, 'auto']}
              tick={{ style: { fontSize: 11 } }}
              axisLine={false}
              hide={allLegendsItemsHidden}
              tickLine={false}
            />
            <Tooltip content={<LineGraphTooltip formatter={options.formatter} />} cursor={false} />
            <Legend
              onClick={selectItem}
              onMouseOver={handleLegendMouseEnter}
              onMouseOut={handleLegendMouseLeave}
            />
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
                hide={!legendOptions[s.key]}
                strokeOpacity={hover === s.key || !hover ? 1 : 0.2}
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

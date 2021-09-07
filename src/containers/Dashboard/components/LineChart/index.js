import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'components/Skeleton';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import moment from 'moment';

import Timer from 'components/Timer';
import LineGraphTooltip from 'components/GraphTooltips/LineGraphTooltip';
import { COLORS } from 'utils/charts';
import { useChartLegend } from 'hooks';
import { formatTicks } from 'utils/formatFunctions';

import Card from '../Card';
import styles from './index.module.scss';

const MyLineChart = ({ title, data, options, refreshAfter, loading, lines, chartTextColor }) => {
  const names = useMemo(() => lines.map(l => l.key), []);

  const {
    hover,
    allLegendItemsHidden,
    legendOptions,
    handleLegendMouseEnter,
    handleLegendMouseLeave,
    selectItem,
  } = useChartLegend(names);

  const formattedGraphTicks = useMemo(() => {
    const firstTs = data[0]?.timestamp || 0;
    const lastTs = data[data.length - 1]?.timestamp;

    if (firstTs && lastTs) {
      return formatTicks(firstTs, lastTs, 4);
    }
    return [];
  }, [data]);

  return (
    <Card title={title} extra={<Timer refreshAfter={refreshAfter} />}>
      <Skeleton loading={loading} type="card">
        <div className={styles.Container}>
          {allLegendItemsHidden && <span className={styles.Message}>No Data Available</span>}
          <ResponsiveContainer width="100%" height={400}>
            <LineChart margin={{ top: 20, right: 20, bottom: 0, left: 0 }} data={data}>
              <XAxis
                dataKey="timestamp"
                type="number"
                domain={['dataMin', 'dataMax']}
                tickFormatter={timestamp => moment(timestamp).format('h:mm a')}
                stroke={chartTextColor}
                tick={{ style: { fontSize: 11 } }}
                scale="time"
                hide={allLegendItemsHidden}
                ticks={formattedGraphTicks}
                interval="preserveStartEnd"
              />
              <YAxis
                tickFormatter={tick => (options.formatter ? options.formatter(tick, 0) : tick)}
                stroke={chartTextColor}
                allowDecimals={false}
                domain={[0, 'auto']}
                tick={{ style: { fontSize: 11 } }}
                axisLine={false}
                hide={allLegendItemsHidden}
                tickLine={false}
              />
              <Tooltip
                content={<LineGraphTooltip formatter={options.formatter} />}
                cursor={false}
              />
              <Legend
                onClick={e => selectItem({ value: e.dataKey })}
                onMouseOver={handleLegendMouseEnter}
                onMouseOut={handleLegendMouseLeave}
              />
              {lines.map((line, i) => (
                <Line
                  dataKey={line.key}
                  key={line.key}
                  name={line.name}
                  dot={false}
                  stroke={COLORS[i]}
                  strokeWidth={2}
                  formatter={options.formatter}
                  hide={!legendOptions[line.key]}
                  strokeOpacity={hover === line.name || !hover ? 1 : 0.2}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Skeleton>
    </Card>
  );
};

MyLineChart.propTypes = {
  title: PropTypes.string,
  data: PropTypes.instanceOf(Object),
  options: PropTypes.instanceOf(Object),
  refreshAfter: PropTypes.number,
  loading: PropTypes.bool,
  lines: PropTypes.instanceOf(Array),
  chartTextColor: PropTypes.string,
};

MyLineChart.defaultProps = {
  title: '',
  data: {},
  options: {},
  refreshAfter: 300,
  loading: false,
  lines: [],
  chartTextColor: 'white',
};
export default MyLineChart;

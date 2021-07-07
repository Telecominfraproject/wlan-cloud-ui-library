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

const TEN_MINUTE_UNIX = 600000;

const MyLineChart = ({ title, data, options, refreshAfter, loading }) => {
  const lineData = useMemo(() => {
    const result = [];
    let prevTimestamp = 0;
    Object.keys(data).forEach(key => {
      const arr = [];
      (data[key].value ?? []).forEach(({ timestamp, value }, index) => {
        if (prevTimestamp - timestamp > TEN_MINUTE_UNIX && index !== 0) {
          arr.push({ timestamp: prevTimestamp - TEN_MINUTE_UNIX, value: null });
        }
        arr.push({ timestamp, value });
        prevTimestamp = timestamp;
      });
      result.push({ key: data[key].key, value: arr.sort((a, b) => a.timestamp - b.timestamp) });
    });
    return result;
  }, [data]);

  const names = useMemo(() => lineData.map(s => s.key), []);

  const {
    hover,
    allLegendItemsHidden,
    legendOptions,
    handleLegendMouseEnter,
    handleLegendMouseLeave,
    selectItem,
  } = useChartLegend(names);

  const formattedGraphTicks = useMemo(() => {
    let firstTs = Number.MAX_SAFE_INTEGER;
    let lastTs = 0;

    lineData.forEach(type => {
      firstTs = Math.min(type?.value?.[0]?.timestamp, firstTs);
      lastTs = Math.max(type.value?.[type.value.length - 1]?.timestamp, lastTs);
    });

    if (firstTs && lastTs) {
      return formatTicks(firstTs, lastTs, 4);
    }
    return [];
  }, [lineData]);

  return (
    <Card title={title} extra={<Timer refreshAfter={refreshAfter} />}>
      <Skeleton loading={loading} type="card">
        <div className={styles.Container}>
          {allLegendItemsHidden && <span className={styles.Message}>No Data Available</span>}
          <ResponsiveContainer width="100%" height={400}>
            <LineChart margin={{ top: 20, right: 20, bottom: 0, left: 0 }}>
              <XAxis
                dataKey="timestamp"
                type="number"
                domain={['dataMin', 'dataMax']}
                tickFormatter={timestamp => moment(timestamp).format('h:mm a')}
                stroke="white"
                tick={{ style: { fontSize: 11 } }}
                scale="time"
                hide={allLegendItemsHidden}
                ticks={formattedGraphTicks}
                interval="preserveStartEnd"
              />
              <YAxis
                dataKey="value"
                tickFormatter={tick => (options.formatter ? options.formatter(tick, 0) : tick)}
                stroke="white"
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
};

MyLineChart.defaultProps = {
  title: '',
  data: {},
  options: {},
  refreshAfter: 300,
  loading: false,
};
export default MyLineChart;

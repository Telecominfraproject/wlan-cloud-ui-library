import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { formatBytes } from 'utils/formatFunctions';
import { useChartLegend } from 'hooks';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

import Loading from 'components/Loading';
import LineGraphTooltip from 'components/GraphTooltips/LineGraphTooltip';
import styles from './index.module.scss';

const COLORS = ['#7cb5ec', '#34AE29', '#f7a35c'];
const CombinedGraph = ({ loading, cpuUsage, freeMemory, cpuTemp, maxFreeMemory }) => {
  const lineData = useMemo(() => {
    let result = [];

    Object.keys(cpuUsage).forEach(core => {
      result = [
        ...result,
        {
          key: `CPU Utilization`,
          data: cpuUsage[core],
          yAxisFormatter: tick => `${tick}%`,
          min: 0,
          max: 100,
        },
      ];
    });

    result = [
      ...result,
      {
        key: 'Free Memory',
        data: freeMemory,
        yAxisFormatter: bytes => formatBytes(bytes, 0),
        min: 0,
        max: maxFreeMemory,
      },
      { key: 'CPU Temp', data: cpuTemp, yAxisFormatter: tick => `${tick} °C`, min: 0, max: 100 },
    ];

    return result;
  }, [cpuUsage, freeMemory, cpuTemp]);

  const {
    hover,
    allLegendsItemsHidden,
    legendOptions,
    handleLegendMouseEnter,
    handleLegendMouseLeave,
    selectItem,
  } = useChartLegend(lineData.map(s => s.key));

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles.Container}>
      {allLegendsItemsHidden && <span className={styles.Message}>No Data Available</span>}
      <ResponsiveContainer width="100%" height={400}>
        <LineChart margin={{ top: 15 }}>
          <XAxis
            dataKey="timestamp"
            type="number"
            allowDuplicatedCategory={false}
            domain={['dataMin', 'dataMax']}
            tickFormatter={timestamp => moment(timestamp).format('h:mm a')}
            stroke="white"
            tick={{ style: { fontSize: 11 } }}
            scale="time"
            hide={allLegendsItemsHidden}
          />
          {!allLegendsItemsHidden && <CartesianGrid vertical={false} />}
          {lineData.map((s, i) => (
            <YAxis
              key={`axis-${s.key}`}
              dataKey="value"
              yAxisId={s.key}
              orientation={i % 2 === 0 ? 'left' : 'right'}
              domain={[s.min, s.max]}
              stroke={COLORS[i]}
              tickFormatter={s.yAxisFormatter}
              tick={{ style: { fontSize: 11 } }}
              scale="linear"
              hide={!legendOptions[s.key] || !s.data.length}
              label={{
                style: { fontSize: 11, fontWeight: 300 },
                value: s.key,
                angle: i % 2 === 0 ? -90 : 90,
                stroke: COLORS[i],
                dx: i % 2 === 0 ? -10 : 20,
              }}
              width={90}
              axisLine={false}
              tickLine={false}
            />
          ))}

          <Tooltip content={<LineGraphTooltip />} cursor={false} />
          <Legend
            onClick={selectItem}
            onMouseOver={handleLegendMouseEnter}
            onMouseOut={handleLegendMouseLeave}
          />

          {lineData.map((s, i) => (
            <Line
              dataKey="value"
              data={s.data}
              name={s.key}
              key={s.key}
              dot={false}
              stroke={COLORS[i]}
              strokeWidth={2}
              yAxisId={s.key}
              formatter={s.yAxisFormatter}
              type="monotone"
              tickLine={false}
              hide={!legendOptions[s.key]}
              strokeOpacity={hover === s.key || !hover ? 1 : 0.2}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

CombinedGraph.propTypes = {
  loading: PropTypes.bool,
  cpuUsage: PropTypes.instanceOf(Object),
  freeMemory: PropTypes.instanceOf(Object),
  cpuTemp: PropTypes.instanceOf(Object),
  maxFreeMemory: PropTypes.number,
};

CombinedGraph.defaultProps = {
  loading: false,
  cpuUsage: {},
  freeMemory: {},
  cpuTemp: {},
  maxFreeMemory: 0,
};

export default CombinedGraph;

import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { formatBytes } from 'utils/formatFunctions';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import Loading from 'components/Loading';
import LineGraphTooltip from 'components/LineGraphTooltip';
import { COLORS } from 'utils/charts';

const CombinedGraph = ({ loading, cpuUsage, freeMemory, cpuTemp, maxFreeMemory }) => {
  const lineData = useMemo(() => {
    let result = [];

    Object.keys(cpuUsage).forEach(core => {
      result = [
        ...result,
        {
          name: `CPU Core ${core + 1}`,
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
        name: 'Free Memory',
        data: freeMemory,
        yAxisFormatter: formatBytes,
        min: 0,
        max: maxFreeMemory,
      },
      { name: 'CPU Temp', data: cpuTemp, yAxisFormatter: tick => `${tick} °C`, min: 0, max: 100 },
    ];

    return result;
  }, [cpuUsage, freeMemory, cpuTemp]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart margin={{ top: 15 }}>
          <XAxis
            dataKey="timestamp"
            type="number"
            allowDuplicatedCategory={false}
            domain={['dataMin', 'dataMax']}
            tickFormatter={timestamp => moment(timestamp).format('h:mm a')}
            stroke="white"
          />
          {lineData.map((s, i) => (
            <YAxis
              key={`axis-${s.name}`}
              dataKey="value"
              yAxisId={s.name}
              orientation={i % 2 === 0 ? 'left' : 'right'}
              domain={[s.min, s.max]}
              stroke={COLORS[i]}
              strokeWidth={2}
              tickFormatter={s.yAxisFormatter}
            />
          ))}

          <Tooltip content={<LineGraphTooltip />} />
          <Legend />

          {lineData.map((s, i) => (
            <Line
              dataKey="value"
              data={s.data}
              name={s.name}
              key={s.name}
              dot={false}
              stroke={COLORS[i]}
              strokeWidth={2}
              yAxisId={s.name}
              formatter={s.yAxisFormatter}
              type="monotone"
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

import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Sector } from 'recharts';
import { COLORS } from 'utils/charts';
import { useChartHover } from 'hooks';
import PieGraphTooltip from 'components/GraphTooltips/PieGraphTooltip';
import Card from '../Card';

const MyPieChart = ({ chartData, title }) => {
  const { activeIndex, onMouseOver, onMouseLeave } = useChartHover();
  const pieData = useMemo(() => {
    return Object.keys(chartData).map(key => ({
      name: key,
      value: chartData[key],
    }));
  }, [chartData]);

  const renderActiveShape = ({ cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill }) => (
    <Sector
      cx={cx}
      cy={cy}
      innerRadius={innerRadius}
      outerRadius={outerRadius + 5}
      startAngle={startAngle}
      endAngle={endAngle}
      fill={fill}
      stroke="#fff"
      strokeWidth={1}
    />
  );

  const renderLabel = ({ name, x, y, cx }) => (
    <text
      x={x}
      y={y}
      fill="#fff"
      dominantBaseline="central"
      textAnchor={x > cx ? 'start' : 'end'}
      style={{ fontSize: '12px' }}
    >
      {name}
    </text>
  );

  return (
    <Card title={title}>
      {pieData.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              dataKey="value"
              data={pieData}
              label={renderLabel}
              activeIndex={activeIndex}
              onMouseOver={onMouseOver}
              onMouseLeave={onMouseLeave}
              activeShape={renderActiveShape}
              isAnimationActive={false}
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${entry.name}`}
                  fill={COLORS[index % COLORS.length]}
                  fillOpacity={index === activeIndex || activeIndex === null ? 1 : 0.6}
                />
              ))}
            </Pie>
            <Tooltip content={<PieGraphTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <h4>No Data</h4>
      )}
    </Card>
  );
};

MyPieChart.propTypes = {
  chartData: PropTypes.instanceOf(Object),
  title: PropTypes.string,
};

MyPieChart.defaultProps = {
  chartData: {},
  title: '',
};
export default MyPieChart;

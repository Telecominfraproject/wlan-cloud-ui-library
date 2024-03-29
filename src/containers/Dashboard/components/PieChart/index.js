import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'components/Skeleton';

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Sector } from 'recharts';
import { COLORS } from 'utils/charts';
import { useChartHover } from 'hooks';
import PieGraphTooltip from 'components/GraphTooltips/PieGraphTooltip';
import Card from '../Card';

const MyPieChart = ({ chartData, title, loading, chartTextColor }) => {
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
      stroke={pieData.length > 1 ? '#fff' : ''}
      strokeWidth={1}
    />
  );

  const renderLabel = ({ name, x, y, cx, index, percent }) => {
    const label = (
      <text
        x={x}
        y={y}
        fill={chartTextColor}
        dominantBaseline="central"
        textAnchor={x > cx ? 'start' : 'end'}
        style={{ fontSize: '14px' }}
      >
        {name}
      </text>
    );
    if (activeIndex) {
      return activeIndex === index ? label : null;
    }
    return percent > 0.05 ? label : null;
  };

  return (
    <Card title={title}>
      <Skeleton loading={loading} type="card">
        {pieData.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                dataKey="value"
                data={pieData}
                label={renderLabel}
                labelLine={false}
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
                    stroke={pieData.length > 1 ? '#fff' : COLORS[index % COLORS.length]}
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
      </Skeleton>
    </Card>
  );
};

MyPieChart.propTypes = {
  chartData: PropTypes.instanceOf(Object),
  title: PropTypes.string,
  loading: PropTypes.bool,
  chartTextColor: PropTypes.string,
};

MyPieChart.defaultProps = {
  chartData: {},
  title: '',
  loading: false,
  chartTextColor: '#fff',
};
export default MyPieChart;

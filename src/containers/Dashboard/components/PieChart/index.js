import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

import { COLORS } from 'utils/charts';
import Card from '../Card';

const MyPieChart = ({ chartData, title }) => {
  const pieData = useMemo(() => {
    return Object.keys(chartData).map(key => ({
      name: key,
      value: chartData[key],
    }));
  }, [chartData]);

  return (
    <Card title={title}>
      {pieData.length > 0 ? (
        <div style={{ width: '100%', height: 400 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie dataKey="value" data={pieData} label={entry => entry.name} stroke={false}>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
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

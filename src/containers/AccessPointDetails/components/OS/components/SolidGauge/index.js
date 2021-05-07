import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';
import styles from './index.module.scss';

const colors = {
  green: '#55BF3B',
  yellow: '#FFFF00',
  red: '#DF5353',
  empty: '#434343',
};

const SolidGauge = ({ data, title, label }) => {
  const pieData = useMemo(() => {
    return [
      { name: title, value: data },
      { name: 'rest', value: 100 - data },
    ];
  }, [data, title]);

  const fillColor = useMemo(() => {
    if (title === 'Current Free Memory') {
      if (data < 10) return colors.red;
      if (data < 25) return colors.yellow;
      return colors.green;
    }

    if (data < 10) return colors.green;
    if (data < 90) return colors.yellow;
    return colors.red;
  }, [data, title]);

  return (
    <div className={styles.container}>
      <span className={styles.title}>{title}</span>

      <ResponsiveContainer height={400}>
        <PieChart>
          <Pie
            dataKey="value"
            data={pieData}
            startAngle={180}
            endAngle={0}
            innerRadius={80}
            fill="#8884d8"
            cy="50%"
          >
            <Label
              value={`${data} ${label}`}
              position="center"
              fill="white"
              style={{ fontSize: 22 }}
            />
            {pieData.map((entry, i) => (
              <Cell key={`cell-${entry.name}`} fill={i === 0 ? fillColor : colors.empty} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

SolidGauge.propTypes = {
  data: PropTypes.number,
  title: PropTypes.string,
  label: PropTypes.string,
};

SolidGauge.defaultProps = {
  data: 0,
  title: '',
  label: '%',
};

export default SolidGauge;

import React from 'react';
import PropTypes from 'prop-types';
import styles from '../index.module.scss';

const PieChartTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className={styles.customTooltip}
        style={{ border: `1px solid ${payload[0].payload?.fill}` }}
      >
        <p className={styles.label}>
          {payload[0].name.replace(/([A-Z][a-z]|[0-9][A-Z])/g, ' $1').trim()}
        </p>
        <p key={payload[0].name} className={styles.point}>
          <span style={{ color: payload[0].payload?.fill, marginRight: 8 }}>●</span>
          {`Count: ${payload[0].value}`}
        </p>
      </div>
    );
  }

  return null;
};

PieChartTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.instanceOf(Object),
};

PieChartTooltip.defaultProps = {
  active: false,
  payload: [],
};

export default PieChartTooltip;

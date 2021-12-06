import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styles from '../index.module.scss';

const LineGraphTooltip = ({ active, payload, label, decimals }) => {
  const extraTooltipData = payload?.[0]?.payload?.extraData ?? {};
  const extraTooltipDataKeys = Object.keys(extraTooltipData);

  if (active && payload && payload.length) {
    return (
      <div className={styles.customTooltip} style={{ border: `1px solid ${payload[0].stroke}` }}>
        <p className={styles.label}>{moment(label).format('MMM D, YYYY h:mm a')}</p>
        {payload.map(series => {
          return (
            <p key={series.name} className={styles.point}>
              <span style={{ color: series.color, marginRight: 8 }}>●</span>
              {`${series.name}:  ${
                series.formatter ? series.formatter(series.value) : series.value.toFixed(decimals)
              }`}
            </p>
          );
        })}
        {extraTooltipDataKeys.length > 0 && (
          <>
            <br />
            {extraTooltipDataKeys.sort().map(key => {
              return (
                extraTooltipData[key] && (
                  <p className={styles.point}>{`${key}: ${extraTooltipData[key]}`}</p>
                )
              );
            })}
          </>
        )}
      </div>
    );
  }

  return null;
};

LineGraphTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.instanceOf(Object),
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  decimals: PropTypes.number,
};

LineGraphTooltip.defaultProps = {
  active: false,
  payload: [],
  label: 0,
  decimals: 0,
};

export default LineGraphTooltip;

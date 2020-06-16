import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

const DeviceStatsCard = ({ title, cardData }) => {
  return (
    <div className={styles.individualCard}>
      <h2>{title}</h2>
      {Object.keys(cardData).map(d => (
        <div key={d} className={styles.row}>
          <div>{d}</div>
          <div>{cardData[d]}</div>
        </div>
      ))}
    </div>
  );
};

DeviceStatsCard.propTypes = {
  cardData: PropTypes.instanceOf(Object),
  title: PropTypes.string,
};
DeviceStatsCard.defaultProps = {
  cardData: {},
  title: '',
};
export default DeviceStatsCard;

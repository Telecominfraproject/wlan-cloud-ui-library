import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'components/Skeleton';

import styles from './index.module.scss';

const DeviceStatsCard = ({ title, cardData, loading }) => {
  return (
    <Card title={title} className={styles.individualCard} loading={loading}>
      {Object.keys(cardData).map(d => (
        <div key={d} className={styles.row}>
          <div>{d}</div>
          <div>{cardData[d]}</div>
        </div>
      ))}
    </Card>
  );
};

DeviceStatsCard.propTypes = {
  cardData: PropTypes.instanceOf(Object),
  title: PropTypes.string,
  loading: PropTypes.bool,
};
DeviceStatsCard.defaultProps = {
  cardData: {},
  title: '',
  loading: false,
};
export default DeviceStatsCard;

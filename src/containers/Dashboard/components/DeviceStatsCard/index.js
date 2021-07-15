import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'components/Skeleton';

import Card from '../Card';
import styles from './index.module.scss';

const DeviceStatsCard = ({ title, cardData, loading }) => {
  return (
    <Card title={title}>
      <Skeleton type="smallCard" loading={loading} list="small">
        {Object.keys(cardData).map(d => {
          return (
            <div key={d} className={styles.row}>
              <div>{d}</div>
              <div>: {cardData[d]}</div>
            </div>
          );
        })}
      </Skeleton>
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

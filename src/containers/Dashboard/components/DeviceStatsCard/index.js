import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import styles from './index.module.scss';

const DeviceStatsCard = ({ title, cardData }) => {
  const headerStyle = {
    textAlign: 'center',
    marginBottom: 10,
  };

  const bodyStyle = { height: 'calc(100% - 67px)' };
  return (
    <Card
      title={title}
      headStyle={headerStyle}
      bodyStyle={bodyStyle}
      className={styles.individualCard}
    >
      {Object.keys(cardData).map(d => {
        if (d === '5GHz') {
          return (
            <div key={d} className={styles.row}>
              <div>{d}</div>
              <div>: {parseInt((cardData['5GHz (L)'] || 0) + (cardData['5GHz (U)'] || 0), 10)}</div>
            </div>
          );
        }

        if (d === '5GHz (L)' || d === '5GHz (U)') {
          return '';
        }

        return (
          <div key={d} className={styles.row}>
            <div>{d}</div>
            <div>: {cardData[d]}</div>
          </div>
        );
      })}
    </Card>
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

import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import styles from './index.module.scss';

const DeviceStatsCard = ({ title, cardData }) => {
  const headerStyle = {
    backgroundColor: '#35a648',
    textAlign: 'center',
    marginBottom: 10,
  };
  const bodyStyle = { backgroundColor: '#35a648', height: 'calc(100% - 67px)' };
  return (
    <Card
      title={title}
      headStyle={headerStyle}
      bodyStyle={bodyStyle}
      className={styles.individualCard}
    >
      {Object.keys(cardData).map(d => (
        <div key={d} className={styles.row}>
          <div>{d}</div>
          <div>: {cardData[d]}</div>
        </div>
      ))}
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

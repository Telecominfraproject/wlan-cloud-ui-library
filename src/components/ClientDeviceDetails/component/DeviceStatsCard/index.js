import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

const DeviceStatsCard = ({ title, cardData }) => {
  return (
    <div className={styles.individualCard}>
      <h2>{title}</h2>
      {cardData.map(obj => {
        return Object.keys(obj).map(d => {
          return (
            <ul>
              <li>{d}</li>
              <li>{obj[d]}</li>
            </ul>
          );
        });
      })}
    </div>
  );
};

DeviceStatsCard.propTypes = {
  cardData: PropTypes.instanceOf(Array),
  title: PropTypes.string,
};
DeviceStatsCard.defaultProps = {
  cardData: [],
  title: '',
};
export default DeviceStatsCard;

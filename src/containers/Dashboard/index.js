import React from 'react';
import PropTypes from 'prop-types';
import DeviceStatsCard from './components/DeviceStatsCard';
import styles from './index.module.scss';

const Dashboard = ({ titleList, statsArr }) => {
  return (
    <div className={styles.mainInfoWrap}>
      <div className={styles.rightInfoWrap}>
        <div className={styles.infoWrapper}>
          {statsArr &&
            statsArr.map((data, index) => {
              return <DeviceStatsCard title={titleList[index]} cardData={data} />;
            })}
        </div>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  titleList: PropTypes.instanceOf(Array).isRequired,
  statsArr: PropTypes.instanceOf(Array).isRequired,
};

export default Dashboard;

import React from 'react';
import PropTypes from 'prop-types';
import DeviceStatsCard from './components/DeviceStatsCard';
import PieChart from './components/PieChart';
import styles from './index.module.scss';

const Dashboard = ({ titleList, statsArr, pieChartData }) => {
  const titles = ['AP Vendors', 'Client Vendors'];
  return (
    <div className={styles.mainInfoWrap}>
      <div className={styles.rightInfoWrap}>
        <div className={styles.infoWrapper}>
          {statsArr &&
            statsArr.map((data, index) => {
              return <DeviceStatsCard title={titleList[index]} cardData={data} />;
            })}
        </div>
        <div className={styles.pieChartWrap}>
          {pieChartData.map((data, index) => {
            return <PieChart chartData={data} title={titles[index]} />;
          })}
        </div>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  titleList: PropTypes.instanceOf(Array).isRequired,
  statsArr: PropTypes.instanceOf(Array).isRequired,
  pieChartData: PropTypes.instanceOf(Array).isRequired,
};

export default Dashboard;

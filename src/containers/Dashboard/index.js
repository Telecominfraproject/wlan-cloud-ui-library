import React from 'react';
import PropTypes from 'prop-types';

import Loading from 'components/Loading';
import DeviceStatsCard from './components/DeviceStatsCard';
import LineChart from './components/LineChart/index';
import PieChart from './components/PieChart';
import styles from './index.module.scss';

const Dashboard = ({ statsCardDetails, pieChartDetails, lineChartDetails, lineChartLoading }) => {
  return (
    <div className={styles.mainInfoWrap}>
      <div className={styles.rightInfoWrap}>
        <div className={styles.infoWrapper}>
          {statsCardDetails?.map(({ title, ...data }) => {
            return <DeviceStatsCard key={title} title={title} cardData={data} />;
          })}
        </div>
        <div className={lineChartLoading ? styles.loadingWrap : styles.chartWrap}>
          {lineChartLoading ? (
            <Loading />
          ) : (
            Object.keys(lineChartDetails).map(key => {
              const { title, data, ...options } = lineChartDetails[key];
              return <LineChart data={data} title={title} options={options} />;
            })
          )}
        </div>
        <div className={styles.chartWrap}>
          {pieChartDetails?.map(({ title, ...data }) => {
            return <PieChart key={title} chartData={data} title={title} />;
          })}
        </div>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  statsCardDetails: PropTypes.instanceOf(Object),
  pieChartDetails: PropTypes.instanceOf(Object),
  lineChartDetails: PropTypes.instanceOf(Object),
  lineChartLoading: PropTypes.bool,
};

Dashboard.defaultProps = {
  statsCardDetails: {},
  pieChartDetails: {},
  lineChartDetails: {},
  lineChartLoading: true,
};
export default Dashboard;

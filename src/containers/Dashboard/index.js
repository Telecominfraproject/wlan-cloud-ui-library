import React from 'react';
import PropTypes from 'prop-types';

import Loading from 'components/Loading';
import DeviceStatsCard from './components/DeviceStatsCard';
import LineChart from './components/LineChart/index';
import PieChart from './components/PieChart';
import styles from './index.module.scss';

const Dashboard = ({
  statsCardDetails,
  pieChartDetails,
  lineChartConfig,
  lineChartData,
  lineChartLoading,
  refreshAfter,
}) => {
  return (
    <div className={styles.mainInfoWrap}>
      <div className={styles.cardWrapper}>
        {statsCardDetails?.map(({ title, ...data }) => {
          return <DeviceStatsCard key={title} title={title} cardData={data} />;
        })}
      </div>
      <div className={lineChartLoading ? styles.loadingWrap : styles.cardWrapper}>
        {lineChartLoading ? (
          <Loading />
        ) : (
          lineChartConfig.map(i => {
            const { key, title, options } = i;
            return (
              <LineChart
                key={key}
                data={lineChartData[key]}
                title={title}
                options={options}
                refreshAfter={refreshAfter}
              />
            );
          })
        )}
      </div>
      <div className={styles.cardWrapper}>
        {pieChartDetails?.map(({ title, ...data }) => {
          return <PieChart key={title} chartData={data} title={title} />;
        })}
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  statsCardDetails: PropTypes.instanceOf(Object),
  pieChartDetails: PropTypes.instanceOf(Object),
  lineChartConfig: PropTypes.instanceOf(Object),
  lineChartData: PropTypes.instanceOf(Object),
  lineChartLoading: PropTypes.bool,
  refreshAfter: PropTypes.number,
};

Dashboard.defaultProps = {
  statsCardDetails: null,
  pieChartDetails: null,
  lineChartConfig: null,
  lineChartData: null,
  lineChartLoading: true,
  refreshAfter: 300,
};
export default Dashboard;

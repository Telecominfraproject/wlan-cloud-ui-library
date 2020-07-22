import React from 'react';
import PropTypes from 'prop-types';
import Loading from 'components/Loading';
import DeviceStatsCard from './components/DeviceStatsCard';
import LineChart from './components/lineChart';
import PieChart from './components/PieChart';
import styles from './index.module.scss';

const Dashboard = ({
  statsCardDetails: { statsArr, statsCardTitle },
  pieChartDetails: { pieChartsData, pieChartTitle },
  lineChartDetails: { lineChartsData, lineChartTitle },
  lineChartLoading,
}) => {
  return (
    <div className={styles.mainInfoWrap}>
      <div className={styles.rightInfoWrap}>
        <div className={styles.infoWrapper}>
          {statsArr?.map((data, index) => {
            return (
              <DeviceStatsCard
                key={statsCardTitle[index]}
                title={statsCardTitle[index]}
                cardData={data}
              />
            );
          })}
        </div>
        <div className={lineChartLoading ? styles.loadingWrap : styles.chartWrap}>
          {lineChartLoading ? (
            <Loading />
          ) : (
            Object.keys(lineChartsData).map((key, index) => {
              return (
                <LineChart lineChartData={lineChartsData[key]} title={lineChartTitle[index]} />
              );
            })
          )}
        </div>
        <div className={styles.chartWrap}>
          {pieChartsData?.map((data, index) => {
            return (
              <PieChart key={pieChartTitle[index]} chartData={data} title={pieChartTitle[index]} />
            );
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

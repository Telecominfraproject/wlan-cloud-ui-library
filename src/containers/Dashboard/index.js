import React from 'react';
import PropTypes from 'prop-types';
import Loading from 'components/Loading';
import DeviceStatsCard from './components/DeviceStatsCard';
import LineChart from './components/lineChart';
import PieChart from './components/PieChart';
import styles from './index.module.scss';

const Dashboard = ({
  statsArr,
  pieChartDetails: { pieChartsData, pieChartTitle },
  lineChartDetails: { lineChartsData, lineChartTitle },
  lineChartLoading,
}) => {
  const titles = ['AP Vendors', 'Client Vendors'];
  return (
    <div className={styles.mainInfoWrap}>
      <div className={styles.rightInfoWrap}>
        <div className={styles.infoWrapper}>
          {statsArr?.map((data, index) => {
            return (
              <DeviceStatsCard
                key={pieChartTitle[index]}
                title={pieChartTitle[index]}
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
          {pieChartsData.map((data, index) => {
            return <PieChart key={titles[index]} chartData={data} title={titles[index]} />;
          })}
        </div>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  pieChartDetails: PropTypes.instanceOf(Object),
  statsArr: PropTypes.instanceOf(Array),
  lineChartDetails: PropTypes.instanceOf(Object),
  lineChartLoading: PropTypes.bool,
};

Dashboard.defaultProps = {
  pieChartDetails: {},
  statsArr: [],
  lineChartDetails: {},
  lineChartLoading: true,
};
export default Dashboard;

import React from 'react';
import PropTypes from 'prop-types';
import DeviceStatsCard from './components/DeviceStatsCard';
import LineChart from './components/lineChart';
import PieChart from './components/PieChart';
import styles from './index.module.scss';

const Dashboard = ({
  pieChartTitle,
  statsArr,
  pieChartData,
  lineChartYAxis,
  lineChartXAxis,
  lineChartTitle,
}) => {
  const titles = ['AP Vendors', 'Client Vendors'];
  return (
    <div className={styles.mainInfoWrap}>
      <div className={styles.rightInfoWrap}>
        <div className={styles.infoWrapper}>
          {statsArr &&
            statsArr.map((data, index) => {
              return (
                <DeviceStatsCard
                  key={pieChartTitle[index]}
                  title={pieChartTitle[index]}
                  cardData={data}
                />
              );
            })}
        </div>
        <div className={styles.lineChartWrap}>
          {Object.keys(lineChartYAxis).map((key, index) => {
            return (
              <LineChart
                lineChartXAxis={lineChartXAxis}
                lineChartYAxis={lineChartYAxis[key]}
                title={lineChartTitle[index]}
              />
            );
          })}
        </div>
        <div className={styles.pieChartWrap}>
          {pieChartData.map((data, index) => {
            return <PieChart key={titles[index]} chartData={data} title={titles[index]} />;
          })}
        </div>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  pieChartTitle: PropTypes.instanceOf(Array).isRequired,
  statsArr: PropTypes.instanceOf(Array).isRequired,
  pieChartData: PropTypes.instanceOf(Array).isRequired,
  lineChartYAxis: PropTypes.instanceOf(Array).isRequired,
  lineChartXAxis: PropTypes.instanceOf(Array).isRequired,
  lineChartTitle: PropTypes.instanceOf(Array).isRequired,
};

export default Dashboard;

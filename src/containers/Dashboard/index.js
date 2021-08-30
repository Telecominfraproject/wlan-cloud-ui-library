import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import DeviceStatsCard from './components/DeviceStatsCard';
import LineChart from './components/LineChart/index';
import PieChart from './components/PieChart';
import styles from './index.module.scss';

const TEN_MINUTE_UNIX = 600000;

const Dashboard = ({
  statsCardDetails,
  pieChartDetails,
  lineChartConfig,
  lineChartData,
  lineChartLoading,
  refreshAfter,
  loading,
  chartTextColor,
}) => {
  const lineData = useMemo(() => {
    const result = [];
    const sortedData = lineChartData.sort((a, b) => a.timestamp - b.timestamp);

    let prevTimestamp = 0;
    sortedData.forEach((dataPoint, i) => {
      const { timestamp } = dataPoint;

      if (timestamp - prevTimestamp > TEN_MINUTE_UNIX && i !== 0) {
        result.push({ timestamp: (prevTimestamp + timestamp) / 2 });
      }
      prevTimestamp = timestamp;
      result.push(dataPoint);
    });
    return result;
  }, [lineChartData]);

  return (
    <div className={styles.mainInfoWrap}>
      <div className={styles.cardWrapper}>
        {statsCardDetails?.map(({ title, ...data }) => {
          return <DeviceStatsCard key={title} title={title} cardData={data} loading={loading} />;
        })}
      </div>
      <div className={lineChartLoading ? styles.loadingWrap : styles.cardWrapper}>
        {lineChartConfig.map(i => {
          const { key, title, options, lines } = i;
          return (
            <LineChart
              key={key}
              data={lineData}
              lines={lines}
              title={title}
              options={options}
              refreshAfter={refreshAfter}
              loading={lineChartLoading}
              chartTextColor={chartTextColor}
            />
          );
        })}
      </div>
      <div className={styles.cardWrapper}>
        {pieChartDetails?.map(({ title, ...data }) => {
          return (
            <PieChart
              key={title}
              chartData={data}
              title={title}
              loading={loading}
              chartTextColor={chartTextColor}
            />
          );
        })}
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  statsCardDetails: PropTypes.instanceOf(Object),
  pieChartDetails: PropTypes.instanceOf(Object),
  lineChartConfig: PropTypes.instanceOf(Object),
  lineChartData: PropTypes.instanceOf(Array),
  lineChartLoading: PropTypes.bool,
  refreshAfter: PropTypes.number,
  loading: PropTypes.bool,
  chartTextColor: PropTypes.string,
};

Dashboard.defaultProps = {
  statsCardDetails: null,
  pieChartDetails: null,
  lineChartConfig: {},
  lineChartData: [],
  lineChartLoading: true,
  refreshAfter: 300,
  loading: false,
  chartTextColor: 'white',
};
export default Dashboard;

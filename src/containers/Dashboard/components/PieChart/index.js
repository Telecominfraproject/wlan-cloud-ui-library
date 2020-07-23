import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import { HighchartsChart, withHighcharts, PieSeries, Tooltip } from 'react-jsx-highcharts';
import Highcharts from 'highcharts/highstock';

import styles from './index.module.scss';

const headerStyle = {
  textAlign: 'center',
  border: 0,
};

const PieChart = ({ chartData, title }) => {
  const pieData = useMemo(() => {
    return Object.keys(chartData).map(key => ({
      name: key,
      y: chartData[key],
    }));
  }, [chartData]);

  return (
    <div className={styles.container}>
      <Card title={title} headStyle={headerStyle} className={styles.pieChart}>
        {pieData.length > 0 ? (
          <HighchartsChart>
            <PieSeries
              name="Count"
              data={pieData}
              size="100%"
              showInLegend
              dataLabels={{ color: '#fff' }}
            />

            <Tooltip
              borderWidth={0}
              backgroundColor="#141414"
              shadow
              style={{ color: '#fff', fontSize: '12px' }}
            />
          </HighchartsChart>
        ) : (
          <h4>No Data</h4>
        )}
      </Card>
    </div>
  );
};

PieChart.propTypes = {
  chartData: PropTypes.instanceOf(Object),
  title: PropTypes.string,
};

PieChart.defaultProps = {
  chartData: {},
  title: '',
};
export default withHighcharts(PieChart, Highcharts);

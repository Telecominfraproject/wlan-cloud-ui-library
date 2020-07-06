import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import { HighchartsChart, withHighcharts, PieSeries, Tooltip } from 'react-jsx-highcharts';
import Highcharts from 'highcharts/highstock';
import styles from './index.module.scss';

const PieChart = ({ chartData, title }) => {
  const headerStyle = {
    textAlign: 'center',
    border: 0,
  };

  const pieData = useMemo(() => {
    const values = Object.values(chartData);
    const pieDataArr = [];

    Object.keys(chartData).map((key, keyIndex) => {
      const pieDataObj = {
        name: key,
        y: values[keyIndex],
      };
      return pieDataArr.push(pieDataObj);
    });
    return pieDataArr;
  });

  return (
    <Card title={title} headStyle={headerStyle} className={styles.pieChart}>
      <HighchartsChart>
        <PieSeries
          name="Count"
          data={pieData}
          size={300}
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
    </Card>
  );
};

PieChart.propTypes = {
  chartData: PropTypes.instanceOf(Object).isRequired,
  title: PropTypes.string,
};

PieChart.defaultProps = {
  title: '',
};
export default withHighcharts(PieChart, Highcharts);

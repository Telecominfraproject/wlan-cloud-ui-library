import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import styles from './index.module.scss';
import { HighchartsChart, withHighcharts, PieSeries, Tooltip } from 'react-jsx-highcharts';
import Highcharts from 'highcharts/highstock';

const PieChartOne = ({ chartData, title }) => {
  const [pieData, setPieData] = useState([]);
  const headerStyle = {
    textAlign: 'center',
    border: 0,
  };

  useEffect(() => {
    const values = Object.values(chartData);
    let pieDataArr = [];
    Object.keys(chartData).map((key, keyIndex) => {
      const pieDataObj = {
        name: key,
        y: values[keyIndex],
      };
      pieDataArr.push(pieDataObj);
    });
    setPieData(pieDataArr);
  }, [chartData]);

  return (
    <Card title={title} headStyle={headerStyle} className={styles.pieChart}>
      <HighchartsChart>
        <PieSeries
          name="Count"
          data={pieData}
          size={300}
          showInLegend={true}
          dataLabels={{ color: '#fff' }}
        />

        <Tooltip
          borderWidth={0}
          backgroundColor="#141414"
          shadow={true}
          style={{ color: '#fff', fontSize: '12px' }}
        />
      </HighchartsChart>
    </Card>
  );
};

PieChartOne.propTypes = {
  chartData: PropTypes.instanceOf(Object).isRequired,
  title: PropTypes.string,
};

PieChartOne.defaultProps = {
  title: '',
};
export default withHighcharts(PieChartOne, Highcharts);

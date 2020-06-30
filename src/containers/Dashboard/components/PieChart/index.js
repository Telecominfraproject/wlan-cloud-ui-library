import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import Highcharts from 'highcharts';

import styles from './index.module.scss';

const PieChart = ({ chartData, title }) => {
  const [pieData, setPieData] = useState([]);
  const headerStyle = {
    textAlign: 'center',
    border: 0,
  };
  const bodyStyle = {};
  const chartId = title.replace(/\s/g, '');
  const highChartsRender = () => {
    Highcharts.chart({
      chart: {
        type: 'pie',
        renderTo: chartId,
      },
      title: {
        verticalAlign: 'middle',
        floating: true,
        text: '',
        style: {
          fontSize: '10px',
        },
      },
      plotOptions: {
        pie: {
          dataLabels: {
            color: '#fff',
            textShadow: 'none',
            enabled: true,
            format: '{point.name}: {point.percentage:.1f} %',
          },
          innerSize: '0%',
        },
      },
      credits: {
        enabled: false,
      },
      series: pieData,
    });
  };

  useEffect(() => {
    highChartsRender();
  }, [pieData]);

  useEffect(() => {
    const values = Object.values(chartData);
    const pieDataArr = [
      {
        name: 'Count',
        data: [],
      },
    ];

    Object.keys(chartData).map((key, keyIndex) => {
      const pieDataObj = {
        name: key,
        y: values[keyIndex],
      };
      return pieDataArr[0].data.push(pieDataObj);
    });
    setPieData(pieDataArr);
  }, []);

  return (
    <Card title={title} headStyle={headerStyle} bodyStyle={bodyStyle} className={styles.pieChart}>
      <div id={chartId} />
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

export default PieChart;

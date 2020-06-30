import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import styles from './index.module.scss';

const headerStyle = {
  textAlign: 'center',
  border: 0,
};

const PieChart = ({ chartData, title }) => {
  const pieData = useMemo(() => {
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
    return pieDataArr;
  });

  const options = {
    chart: {
      type: 'pie',
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
  };

  return (
    <Card title={title} headStyle={headerStyle} className={styles.pieChart}>
      <HighchartsReact highcharts={Highcharts} options={options} />
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

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Alert, Progress, Tooltip } from 'antd';
import { InfoCircleOutlined, PoweroffOutlined, LineChartOutlined } from '@ant-design/icons';
import Highcharts from 'highcharts/highstock';
import {
  HighchartsStockChart,
  Chart,
  withHighcharts,
  XAxis,
  YAxis,
  Title,
  Legend,
  AreaSplineSeries,
  SplineSeries,
  Navigator,
  RangeSelector,
} from 'react-jsx-highstock';

import styles from '../index.module.scss';

const OS = ({ osData }) => {
  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 10 },
  };

  const [date, setDate] = useState(new Date().toLocaleString());
  const [percent, setPercent] = useState(new Date().getSeconds());

  useEffect(() => {
    const secTimer = setInterval(() => {
      setDate(new Date().toLocaleString());
      setPercent(new Date().getSeconds());
    }, 1000);

    return () => {
      clearInterval(secTimer);
    };
  }, []);

  return (
    <Form {...layout}>
      <Card
        title="Operating System Statistics"
        extra={
          <div className={styles.InLineDiv}>
            <Tooltip title={`Time refreshes in approx: ${60 - percent} seconds...`}>
              <Progress type="circle" width={25} percent={percent} showInfo={false} />
            </Tooltip>
            {date}
          </div>
        }
      >
        <div className={styles.InlineBetweenDiv}>
          <Alert icon={<LineChartOutlined />} message="Up-time:" type="info" showIcon />
          <Alert
            icon={<InfoCircleOutlined />}
            message="CAMI crashes since boot:"
            type="info"
            showIcon
          />
          <Alert
            icon={<PoweroffOutlined />}
            message="Reboots in last 7 days:"
            type="info"
            showIcon
          />
        </div>
        <HighchartsStockChart>
          <Chart zoomType="x" />

          <Title>Highstocks Example</Title>

          <Legend>
            <Legend.Title>Key</Legend.Title>
          </Legend>

          <Tooltip />

          <XAxis>
            <XAxis.Title>Time</XAxis.Title>
          </XAxis>

          <YAxis>
            <YAxis.Title>Price</YAxis.Title>
            <AreaSplineSeries id="profit" name="Profit" />
          </YAxis>

          <YAxis opposite>
            <YAxis.Title>Social Buzz</YAxis.Title>
            <SplineSeries id="twitter" name="Twitter mentions" />
          </YAxis>

          <RangeSelector selected={1}>
            <RangeSelector.Button count={1} type="day">
              1d
            </RangeSelector.Button>
            <RangeSelector.Button count={7} type="day">
              7d
            </RangeSelector.Button>
            <RangeSelector.Button count={1} type="month">
              1m
            </RangeSelector.Button>
            <RangeSelector.Button type="all">All</RangeSelector.Button>
            <RangeSelector.Input boxBorderColor="#7cb5ec" />
          </RangeSelector>

          <Navigator>
            <Navigator.Series seriesId="profit" />
            <Navigator.Series seriesId="twitter" />
          </Navigator>
        </HighchartsStockChart>
      </Card>
    </Form>
  );
};

OS.propTypes = {
  data: PropTypes.instanceOf(Array),
  osData: PropTypes.instanceOf(Array),
};

OS.defaultProps = {
  data: [],
  osData: [],
};
export default withHighcharts(OS, Highcharts);

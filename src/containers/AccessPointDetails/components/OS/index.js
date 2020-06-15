import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Alert, Progress, Tooltip as AntdTooltip } from 'antd';
import { InfoCircleOutlined, PoweroffOutlined, LineChartOutlined } from '@ant-design/icons';
import Highcharts from 'highcharts/highstock';
import {
  HighchartsStockChart,
  Chart,
  withHighcharts,
  XAxis,
  YAxis,
  Legend,
  SplineSeries,
  RangeSelector,
  Tooltip,
} from 'react-jsx-highstock';
import SolidGauge from './components/SolidGauge';
import styles from '../index.module.scss';

const OS = ({ data, osData, handleRefetch }) => {
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

  if (percent === 0) {
    handleRefetch();
  }

  const convertDate = time => {
    const hour = Math.floor(time / 3600);
    const min = Math.floor((time % 3600) / 60);
    const sec = Math.floor((time % 3600) % 60);

    const hDisplay = hour > 0 ? hour + (hour === 1 ? ' hour, ' : ' hours, ') : '';
    const mDisplay = min > 0 ? min + (min === 1 ? ' minute, ' : ' minutes, ') : '';
    const sDisplay = sec > 0 ? sec + (sec === 1 ? ' second' : ' seconds') : '';
    return hDisplay + mDisplay + sDisplay;
  };

  const dateTimeLabelFormats = {
    millisecond: '%l:%M:%S%P',
    second: '%l:%M:%S%P',
    minute: '%l:%M:%S%P',
    hour: '%l:%M:%S%P',
    day: '%a. %l:%M:%S%P',
    week: '',
    month: '',
    year: '',
  };

  const memory = parseFloat(
    (data.status.osPerformance.detailsJSON.avgFreeMemory / 256000).toFixed(2),
    10
  );
  const cpu = parseFloat(data.status.osPerformance.detailsJSON.avgCpuUtilization.toFixed(2), 10);
  const temperature = parseFloat(
    data.status.osPerformance.detailsJSON.avgCpuTemperature.toFixed(2),
    10
  );

  return (
    <Form {...layout}>
      <Card
        title="Operating System Statistics"
        extra={
          <div className={styles.InLineDiv}>
            <AntdTooltip title={`Refreshes in approx: ${60 - percent} seconds...`}>
              <Progress type="circle" width={25} percent={percent * 1.67} showInfo={false} />
            </AntdTooltip>
            {date}
          </div>
        }
      >
        <div className={styles.InlineBetweenDiv}>
          <Alert
            icon={<LineChartOutlined />}
            message={`Up-time: ${convertDate(
              data.status.osPerformance.detailsJSON.uptimeInSeconds
            )}`}
            type="info"
            showIcon
          />
          <Alert
            icon={<InfoCircleOutlined />}
            message={`CAMI crashes since boot: ${data.status.osPerformance.detailsJSON.numCamiCrashes}`}
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

        <div className={styles.InlineDiv} style={{ marginTop: '15px' }}>
          <SolidGauge data={cpu} title="Current CPU" />
          <SolidGauge data={memory} title="Current Free Memory" />
          <SolidGauge data={temperature} title="Current CPU Temp (°C)" />
        </div>

        <div style={{ marginTop: '10px' }}>
          <HighchartsStockChart>
            <Chart zoomType="x" backgroundColor="#141414" />
            <Legend>
              <Legend.Title style={{ color: '#FFFFFF' }}>Key</Legend.Title>
            </Legend>
            <Tooltip split={false} shared useHTML />
            <XAxis
              tickPixelInterval={90}
              dateTimeLabelFormats={dateTimeLabelFormats}
              offset={20}
              type="datetime"
              showEmpty
            >
              <XAxis.Title>Time</XAxis.Title>
            </XAxis>

            <YAxis
              labels={{
                style: { color: '#7cb5ec' },
              }}
            >
              <YAxis.Title
                style={{
                  color: '#7cb5ec',
                }}
              >
                CPU Usage (%)
              </YAxis.Title>
              <SplineSeries id="cpuCore1" name="CPU Core 1" data={osData[0].values.CpuUtilCore2} />
              <SplineSeries id="cpuCore0" name="CPU Core 0" data={osData[0].values.CpuUtilCore1} />
            </YAxis>

            <YAxis
              labels={{
                style: { color: '#34AE29' },
              }}
              opposite
            >
              <YAxis.Title
                style={{
                  color: '#34AE29',
                }}
              >
                Free Memory (MB)
              </YAxis.Title>
              <SplineSeries id="freeMemory" name="Free Memory" data={osData[0].values.FreeMemory} />
            </YAxis>

            <YAxis
              labels={{
                style: { color: '#f7a35c' },
              }}
            >
              <YAxis.Title
                style={{
                  color: '#f7a35c',
                }}
              >
                CPU Temperature (°C)
              </YAxis.Title>
              <SplineSeries
                id="cpuTemp"
                name="CPU Temperature"
                data={osData[0].values.CpuTemperature}
              />
            </YAxis>

            <RangeSelector
              selected={1}
              buttonSpacing={10}
              inputBoxBorderColor="gray"
              inputBoxWidth={120}
              inputBoxHeight={18}
              inputStyle={{ color: '#039', fontWeight: 'bold' }}
              labelStyle={{ colod: 'silver', fontWeight: 'bold' }}
              buttonTheme={{
                fill: 'none',
                r: '8',
                states: { select: { fill: '#039', style: { color: 'white' } } },
              }}
            >
              <RangeSelector.Button count={5} type="minute">
                5 Min
              </RangeSelector.Button>
              <RangeSelector.Button count={7} type="hour">
                1 Hr
              </RangeSelector.Button>
              <RangeSelector.Button count={1} type="day">
                1 Day
              </RangeSelector.Button>
              <RangeSelector.Input inputEnabled={false} />
            </RangeSelector>
          </HighchartsStockChart>
        </div>
      </Card>
    </Form>
  );
};

OS.propTypes = {
  osData: PropTypes.instanceOf(Array),
  data: PropTypes.instanceOf(Array),
  handleRefetch: PropTypes.func.isRequired,
};

OS.defaultProps = {
  osData: [],
  data: [],
};
export default withHighcharts(OS, Highcharts);

import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Card, Alert } from 'antd';
import { InfoCircleOutlined, LineChartOutlined } from '@ant-design/icons';

import SolidGauge from './components/SolidGauge';
import HighChartGraph from './components/HighChartGraph';
import Timer from './components/Timer';

import styles from '../../index.module.scss';

const OS = ({ data, osData, handleRefresh }) => {
  const osPerformance =
    (data && data.status && data.status.osPerformance && data.status.osPerformance.detailsJSON) ||
    {};
  const convertDate = time => {
    const hour = Math.floor(time / 3600);
    const min = Math.floor((time % 3600) / 60);
    const sec = Math.floor((time % 3600) % 60);

    const hDisplay = hour > 0 ? hour + (hour === 1 ? ' hour, ' : ' hours, ') : '';
    const mDisplay = min > 0 ? min + (min === 1 ? ' minute, ' : ' minutes, ') : '';
    const sDisplay = sec > 0 ? sec + (sec === 1 ? ' second' : ' seconds') : '';
    return hDisplay + mDisplay + sDisplay;
  };

  const memory = useMemo(() => {
    if (!osPerformance.avgFreeMemoryKb || !osPerformance.totalAvailableMemoryKb) {
      return 0;
    }

    return parseFloat(
      ((osPerformance.avgFreeMemoryKb / osPerformance.totalAvailableMemoryKb) * 100).toFixed(2),
      10
    );
  }, [data]);

  const cpu = useMemo(() => {
    if (!osPerformance.avgCpuUtilization) {
      return 0;
    }

    return parseFloat(osPerformance.avgCpuUtilization.toFixed(2), 10);
  }, [data]);

  const temperature = useMemo(() => {
    if (!osPerformance.avgCpuTemperature) {
      return 0;
    }

    return parseFloat(osPerformance.avgCpuTemperature.toFixed(2), 10);
  }, [data]);

  return (
    <Card title="Operating System Statistics" extra={<Timer handleRefresh={handleRefresh} />}>
      <div className={styles.InlineBetweenDiv}>
        <Alert
          icon={<LineChartOutlined />}
          message={`Up-time: ${convertDate(osPerformance.uptimeInSeconds)}`}
          type="info"
          showIcon
        />
        <Alert
          icon={<InfoCircleOutlined />}
          message={`CAMI crashes since boot: ${osPerformance.numCamiCrashes}`}
          type="info"
          showIcon
        />
      </div>

      <div className={styles.InlineDiv} style={{ marginTop: '15px' }}>
        <SolidGauge data={cpu} title="Current CPU" />
        <SolidGauge data={memory} title="Current Free Memory" />
        <SolidGauge data={temperature} title="Current CPU Temp (°C)" />
      </div>
      <HighChartGraph osData={osData} />
    </Card>
  );
};

OS.propTypes = {
  osData: PropTypes.instanceOf(Object),
  data: PropTypes.instanceOf(Object),
  handleRefresh: PropTypes.func.isRequired,
};

OS.defaultProps = {
  osData: {},
  data: {},
};

export default OS;

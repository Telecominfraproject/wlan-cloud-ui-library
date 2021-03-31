import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Card, Alert } from 'antd';
import { LineChartOutlined } from '@ant-design/icons';

import Timer from 'components/Timer';
import SolidGauge from './components/SolidGauge';
import HighChartGraph from './components/HighChartGraph';

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

  const processMetrics = (metrics = []) => {
    const cpuUtilCores = {};
    const freeMemory = [];
    const cpuTemperature = [];

    metrics.forEach(i => {
      if (i?.detailsJSON?.apPerformance) {
        const timestamp = parseInt(i.createdTimestamp, 10);
        freeMemory.push({ timestamp, value: i.detailsJSON.apPerformance.freeMemory });
        cpuTemperature.push({ timestamp, value: i.detailsJSON.apPerformance.cpuTemperature });
        i.detailsJSON.apPerformance.cpuUtilized.forEach((j, index) => {
          if (!(index in cpuUtilCores)) {
            cpuUtilCores[index] = [];
          }
          cpuUtilCores[index].push({ timestamp, value: j });
        });
      }
    });

    return { cpuUtilCores, freeMemory, cpuTemperature };
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

  const metrics = useMemo(() => {
    return processMetrics(osData?.data);
  }, [osData?.data]);

  return (
    <Card title="Operating System Statistics" extra={<Timer handleRefresh={handleRefresh} />}>
      <Alert
        icon={<LineChartOutlined />}
        message={`Up-time: ${convertDate(osPerformance.uptimeInSeconds)}`}
        type="info"
        showIcon
      />
      <div className={styles.InlineDiv} style={{ marginTop: '15px' }}>
        <SolidGauge data={cpu} title="Current CPU Utilization" />
        <SolidGauge data={memory} title="Current Free Memory" />
        <SolidGauge data={temperature} title="Current CPU Temp" label="°C" />
      </div>
      <HighChartGraph
        loading={osData?.loading}
        cpuUsage={metrics.cpuUtilCores}
        freeMemory={metrics.freeMemory}
        cpuTemp={metrics.cpuTemperature}
      />
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

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Alert } from 'antd';
import { LeftOutlined, ReloadOutlined } from '@ant-design/icons';
import moment from 'moment';

import { formatBytes, formatBitsPerSecond } from 'utils/bytes';
import Button from 'components/Button';
import DeviceHistory from 'components/DeviceHistory';

import DeviceDetailCard from './components/DeviceDetailCard';
import DeviceStatsCard from './components/DeviceStatsCard';
import styles from './index.module.scss';

const ClientDeviceDetails = ({
  data,
  onRefresh,
  metricsLoading,
  metricsError,
  metricsData,
  historyDate,
}) => {
  const {
    macAddress,
    ipAddress,
    hostname,
    ssid,
    radioType,
    signal,
    manufacturer,
    equipment,
    details,
  } = data;
  const {
    dhcpServerIp,
    primaryDns,
    secondaryDns,
    gatewayIp,
    subnetMask,
    leaseTimeInSeconds,
    leaseStartTimestamp,
  } = details?.dhcpDetails || {};
  const {
    rxBytes,
    txBytes,
    rxMbps,
    txMbps,
    rxRateKbps,
    txRateKbps,
    totalRxPackets,
    totalTxPackets,
  } = details?.metricDetails || {};

  const getStatusState = () => {
    if (!details.associationState) {
      return null;
    }
    if (details.associationState === 'Active_Data') {
      return 'Connected';
    }
    if (details.associationState === 'Disconnected') {
      return 'Disconnected';
    }
    return null;
  };

  const getGeneralStats = () => ({
    Status: getStatusState(),
    'Associated On': moment(details?.assocTimestamp).format('llll'),
    'Access Point': equipment?.name,
    SSID: ssid,
    'Radio Band': radioType,
    'Signal Strength': `${signal} dBm`,
    'Tx Rate': `${formatBitsPerSecond(txRateKbps * 1000)}`,
    'Rx Rate': `${formatBitsPerSecond(rxRateKbps * 1000)}`,
  });

  const getTrafficStats = () => ({
    'Data Transferred': formatBytes(txBytes + rxBytes),
    'Tx Throughput': `${formatBitsPerSecond(txMbps * 1000000)}`,
    'Rx Throughput': `${formatBitsPerSecond(rxMbps * 1000000)}`,
    'Total Tx Packets': totalTxPackets,
    'Total Rx Packets': totalRxPackets,
  });

  const getIpStats = () => ({
    'IPv4 Address': ipAddress,
    'DHCP Server': dhcpServerIp,
    'Primary DNS': primaryDns,
    'Secondary DNS': secondaryDns,
    'Gateway ': gatewayIp,
    'Subnet Mask': subnetMask,
    'IP Lease Time': leaseTimeInSeconds && `${leaseTimeInSeconds} seconds`,
    'IP Lease Start': moment(leaseStartTimestamp).format('llll'),
  });

  return (
    <>
      <div className={styles.topBtns}>
        <Link to="/network/client-devices">
          <Button icon={<LeftOutlined />}>Back</Button>
        </Link>
        <Button icon={<ReloadOutlined />} onClick={onRefresh} />
      </div>
      <DeviceDetailCard
        name={hostname}
        manufacturer={manufacturer}
        macAddress={macAddress}
        ipAddress={ipAddress}
        radioType={radioType}
        signal={signal}
        dataTransferred={txBytes + rxBytes}
        dataThroughput={txMbps + rxMbps}
        status={getStatusState()}
      />
      <div className={styles.infoWrapper}>
        <DeviceStatsCard title="General" cardData={getGeneralStats()} />
        <DeviceStatsCard title="Traffic" cardData={getTrafficStats()} />
        <DeviceStatsCard title="IP LAN" cardData={getIpStats()} />
      </div>
      <Card title="History (4 hours)">
        {metricsError ? (
          <Alert message="Error" description="Failed to load History." type="error" showIcon />
        ) : (
          <DeviceHistory loading={metricsLoading} historyDate={historyDate} data={metricsData} />
        )}
      </Card>
    </>
  );
};

ClientDeviceDetails.propTypes = {
  data: PropTypes.instanceOf(Object),
  onRefresh: PropTypes.func,
  metricsLoading: PropTypes.bool,
  metricsData: PropTypes.instanceOf(Array),
  metricsError: PropTypes.instanceOf(Object),
  historyDate: PropTypes.instanceOf(Object),
};

ClientDeviceDetails.defaultProps = {
  data: {},
  onRefresh: () => {},
  metricsLoading: true,
  metricsError: null,
  metricsData: [],
  historyDate: {
    toTime: moment(),
    fromTime: moment(),
  },
};

export default ClientDeviceDetails;

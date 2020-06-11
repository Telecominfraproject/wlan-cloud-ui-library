import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { LeftOutlined, ReloadOutlined } from '@ant-design/icons';
import Button from 'components/Button';
import GeneralCard from './component/GeneralCard';
import TrafficCard from './component/TrafficCard';
import IpLanCard from './component/IpLanCard';
import DeviceDetailCard from './component/DeviceDetailCard';
import styles from './index.module.scss';

const ClientDeviceDetails = ({
  macAddress,
  ipAddress,
  hostname,
  ssid,
  radioType,
  signal,
  name,
  assocTimestamp,
  rxMbps,
  txMbps,
  totalRxPackets,
  totalTxPackets,
  dhcpDetails,
  rxBytes,
  txBytes,
}) => {
  const history = useHistory();
  const onBack = () => {
    history.goBack();
  };
  return (
    <>
      <div className={styles.topBtns}>
        <Button icon={<LeftOutlined />} onClick={onBack}>
          Back
        </Button>
        <Button icon={<ReloadOutlined />} />
      </div>
      <DeviceDetailCard
        macAddress={macAddress}
        ipAddress={ipAddress}
        hostname={hostname}
        radioType={radioType}
        signal={signal}
        name={name}
      />
      <div className={styles.info_wrapper}>
        <GeneralCard
          associatedOn={assocTimestamp}
          accessPoint={name}
          radioBand={radioType}
          signalStrength={signal}
          rxRate={rxMbps}
          txRate={txMbps}
          ssid={ssid}
        />
        <TrafficCard
          rxThroughput={rxBytes}
          txThroughput={txBytes}
          totalRxPackets={totalRxPackets}
          totalTxPackets={totalTxPackets}
        />
        <IpLanCard dhcpDetails={dhcpDetails} />
      </div>
    </>
  );
};

ClientDeviceDetails.propTypes = {
  macAddress: PropTypes.string,
  ipAddress: PropTypes.string,
  hostname: PropTypes.string,
  ssid: PropTypes.string,
  radioType: PropTypes.string,
  signal: PropTypes.string,
  name: PropTypes.string,
  assocTimestamp: PropTypes.number,
  rxMbps: PropTypes.number,
  txMbps: PropTypes.number,
  totalRxPackets: PropTypes.number,
  totalTxPackets: PropTypes.number,
  dhcpDetails: PropTypes.shape({
    dhcpServerIp: PropTypes.string,
    primaryDns: PropTypes.string,
    secondaryDns: PropTypes.string,
    gatewayIp: PropTypes.string,
    leaseTimeInSeconds: PropTypes.number,
    leaseStartTimestamp: PropTypes.number,
  }),
  rxBytes: PropTypes.number,
  txBytes: PropTypes.number,
};

ClientDeviceDetails.defaultProps = {
  macAddress: '',
  ipAddress: '',
  hostname: '',
  ssid: '',
  radioType: '',
  signal: '',
  name: '',
  assocTimestamp: 0,
  rxMbps: 0,
  txMbps: 0,
  totalRxPackets: 0,
  totalTxPackets: 0,
  dhcpDetails: {
    dhcpServerIp: '',
    primaryDns: '',
    secondaryDns: '',
    gatewayIp: '',
    leaseTimeInSeconds: 0,
    leaseStartTimestamp: 0,
  },
  rxBytes: 0,
  txBytes: 0,
};

export default ClientDeviceDetails;

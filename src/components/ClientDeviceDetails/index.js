import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { LeftOutlined, ReloadOutlined } from '@ant-design/icons';
import Button from 'components/Button';
import styles from './index.module.scss';
import DeviceDetailCard from './components/DeviceDetailCard';
import DeviceStatsCard from './components/DeviceStatsCard';

const ClientDeviceDetails = ({
  macAddress,
  ipAddress,
  hostname,
  radioType,
  signal,
  name,
  generalCardState,
  trafficCardState,
  ipLanCardState,
}) => {
  const history = useHistory();
  const onBack = () => {
    history.push('/network/client-devices');
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
      <div className={styles.infoWrapper}>
        <DeviceStatsCard title="GENERAL" cardData={generalCardState} />
        <DeviceStatsCard title="TRAFFIC" cardData={trafficCardState} />
        <DeviceStatsCard title="IP LAN" cardData={ipLanCardState} />
      </div>
    </>
  );
};

ClientDeviceDetails.propTypes = {
  macAddress: PropTypes.string,
  ipAddress: PropTypes.string,
  hostname: PropTypes.string,
  radioType: PropTypes.string,
  signal: PropTypes.string,
  name: PropTypes.string,
  generalCardState: PropTypes.instanceOf(Array),
  trafficCardState: PropTypes.instanceOf(Array),
  ipLanCardState: PropTypes.instanceOf(Array),
};

ClientDeviceDetails.defaultProps = {
  macAddress: '',
  ipAddress: '',
  hostname: '',
  radioType: '',
  signal: '',
  name: '',
  generalCardState: [],
  trafficCardState: [],
  ipLanCardState: [],
};

export default ClientDeviceDetails;

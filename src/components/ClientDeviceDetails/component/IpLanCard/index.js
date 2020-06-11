import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

const IpLAnCard = ({
  dhcpServerIp,
  primaryDns,
  secondaryDns,
  gatewayIp,
  subnetMask,
  leaseTimeInSeconds,
  leaseStartTimestamp,
}) => {
  return (
    <div className={styles.individual_card}>
      <h2>IP LAN</h2>
      <ul>
        <li>IPv4 Address</li>
        <li />
        <li>DHCP Server</li>
        <li>{dhcpServerIp}</li>
        <li>Primary DNS</li>
        <li>{primaryDns}</li>
        <li>Secondary DNS</li>
        <li>{secondaryDns}</li>
        <li>Gateway</li>
        <li>{gatewayIp}</li>
        <li>Subnet Mask</li>
        <li>{subnetMask}</li>
        <li>IP Lease Time</li>
        <li>{leaseTimeInSeconds}</li>
        <li>IP Lease Start</li>
        <li>{leaseStartTimestamp}</li>
      </ul>
    </div>
  );
};

IpLAnCard.propTypes = {
  dhcpServerIp: PropTypes.number,
  primaryDns: PropTypes.number,
  secondaryDns: PropTypes.number,
  gatewayIp: PropTypes.number,
  subnetMask: PropTypes.number,
  leaseTimeInSeconds: PropTypes.number,
  leaseStartTimestamp: PropTypes.number,
};
IpLAnCard.defaultProps = {
  dhcpServerIp: 0,
  primaryDns: 0,
  secondaryDns: 0,
  gatewayIp: 0,
  subnetMask: 0,
  leaseTimeInSeconds: 0,
  leaseStartTimestamp: 0,
};
export default IpLAnCard;

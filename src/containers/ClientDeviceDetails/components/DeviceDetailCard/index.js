import React from 'react';
import { WifiOutlined, SwapOutlined, SignalFilled } from '@ant-design/icons';
import PropTypes from 'prop-types';

import { formatBytes } from 'utils/bytes';
import styles from './index.module.scss';

const DeviceDetailCard = ({
  macAddress,
  manufacturer,
  name,
  hostName,
  ipAddress,
  radioType,
  signal,
  dataTransferred,
  dataThroughput,
}) => {
  return (
    <div className={styles.mainHeadWrap}>
      <div className={styles.leftWrapContent}>
        <p>{name}</p>
        <p>{hostName}</p>
        <p>{manufacturer}</p>
      </div>

      <div className={styles.middleWrapContent}>
        <p>{radioType}</p>
        <p>{ipAddress}</p>
        <p>{macAddress}</p>
      </div>
      <div className={styles.rightWrapContent}>
        <p>
          Connected for 16 minutes
          <WifiOutlined />
        </p>
        <p>
          {formatBytes(dataTransferred, 1)}
          <span>({Math.round(dataThroughput)} bps)</span>
          <SwapOutlined />
        </p>
        <p>
          {signal} dBm
          <SignalFilled />
        </p>
      </div>
    </div>
  );
};

DeviceDetailCard.propTypes = {
  macAddress: PropTypes.string,
  name: PropTypes.string,
  manufacturer: PropTypes.string,
  hostName: PropTypes.string,
  ipAddress: PropTypes.string,
  radioType: PropTypes.string,
  signal: PropTypes.string,
  dataTransferred: PropTypes.number,
  dataThroughput: PropTypes.number,
};

DeviceDetailCard.defaultProps = {
  macAddress: '',
  name: '',
  manufacturer: '',
  hostName: '',
  ipAddress: '',
  radioType: '',
  signal: '',
  dataTransferred: 0,
  dataThroughput: 0,
};

export default DeviceDetailCard;

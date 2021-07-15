import React from 'react';
import { WifiOutlined, SwapOutlined, SignalFilled } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { Card } from 'components/Skeleton';

import { formatBytes } from 'utils/formatFunctions';
import styles from './index.module.scss';

const DeviceDetailCard = ({
  macAddress,
  manufacturer,
  name,
  ipAddress,
  radioType,
  signal,
  dataTransferred,
  dataThroughput,
  status,
  loading,
}) => {
  return (
    <Card className={styles.DeviceDetailCard} loading={loading}>
      <div className={styles.mainHeadWrap}>
        <div className={styles.leftWrapContent}>
          <p>{name}</p>
          <p>{manufacturer}</p>
        </div>
        <div className={styles.middleWrapContent}>
          <p>{radioType}</p>
          <p>{ipAddress}</p>
          <p>{macAddress}</p>
        </div>
        <div className={styles.rightWrapContent}>
          <p>
            {status} <WifiOutlined />
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
    </Card>
  );
};

DeviceDetailCard.propTypes = {
  macAddress: PropTypes.string,
  name: PropTypes.string,
  manufacturer: PropTypes.string,
  ipAddress: PropTypes.string,
  radioType: PropTypes.string,
  signal: PropTypes.string,
  status: PropTypes.string,
  dataTransferred: PropTypes.number,
  dataThroughput: PropTypes.number,
  loading: PropTypes.bool,
};

DeviceDetailCard.defaultProps = {
  macAddress: '',
  name: '',
  manufacturer: '',
  ipAddress: '',
  radioType: '',
  signal: '',
  status: '',
  dataTransferred: 0,
  dataThroughput: 0,
  loading: false,
};

export default DeviceDetailCard;

import React from 'react';
import { PrinterOutlined, WifiOutlined, SwapOutlined, SignalFilled } from '@ant-design/icons';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

const DeviceDetailCard = ({ macAddress, name, radioType, leaseStartTimestamp, signal }) => {
  return (
    <>
      <div className={styles.mainHeadWrap}>
        <div className={styles.leftWrap}>
          <div className={styles.svgWrap}>
            <PrinterOutlined
              style={{
                fontSize: '40px',
                color: '#35A649',
              }}
            />
          </div>
          <div className={styles.leftWrapContent}>
            <p>{name}</p>
            <p>Nokia</p>
            <p>{macAddress}</p>
          </div>
        </div>

        <div className={styles.middleWrapContent}>
          <p>{radioType}</p>
          <p>is5GHzU</p>
        </div>
        <div className={styles.rightWrapContent}>
          <p>
            {' '}
            Connected for 16 minutes
            {leaseStartTimestamp}
            <span>
              <WifiOutlined />
            </span>
          </p>
          <p>
            328.9 temp
            <span>
              <SwapOutlined />
            </span>
          </p>
          <p>
            {signal} dBm
            <span>
              <SignalFilled />
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

DeviceDetailCard.propTypes = {
  macAddress: PropTypes.string,
  name: PropTypes.string,
  radioType: PropTypes.string,
  leaseStartTimestamp: PropTypes.number,
  signal: PropTypes.string,
};

DeviceDetailCard.defaultProps = {
  macAddress: '',
  name: '',
  radioType: '',
  leaseStartTimestamp: 0,
  signal: '',
};

export default DeviceDetailCard;

import React from 'react';
import { PrinterOutlined, WifiOutlined, SwapOutlined, SignalFilled } from '@ant-design/icons';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

const DeviceDetailCard = ({ macAddress, name, radioType, leaseStartTimestamp, signal }) => {
  return (
    <>
      <div className={styles.main_head_wrap}>
        <div className={styles.left_wrap}>
          <div className={styles.svg_wrap}>
            <PrinterOutlined
              style={{
                fontSize: '40px',
                color: '#35A649',
              }}
            />
          </div>
          <div className={styles.left_wrap_content}>
            <p>{name}</p>
            <p>Nokia</p>
            <p>{macAddress}</p>
          </div>
        </div>

        <div className={styles.middle_wrap_content}>
          <p>{radioType}</p>
          <p>is5GHzU</p>
        </div>
        <div className={styles.right_wrap_content}>
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
  macAddress: PropTypes.number,
  name: PropTypes.string,
  radioType: PropTypes.number,
  leaseStartTimestamp: PropTypes.number,
  signal: PropTypes.number,
};

DeviceDetailCard.defaultProps = {
  macAddress: 0,
  name: '',
  radioType: '',
  leaseStartTimestamp: 0,
  signal: 0,
};

export default DeviceDetailCard;

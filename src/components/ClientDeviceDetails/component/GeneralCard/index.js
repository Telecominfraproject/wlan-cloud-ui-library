import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

const GeneralCard = ({
  associatedOn,
  accessPoint,
  radioBand,
  signalStrength,
  rxRate,
  txRate,
  ssid,
}) => {
  return (
    <div className={styles.individual_card}>
      <h2>GENERAL</h2>
      <ul>
        <li>Status</li>
        <li>Connected for 16 minutes</li>
        <li>Associated On</li>
        <li>{associatedOn}</li>
        <li>Access Point</li>
        <li>{accessPoint}</li>
        <li>SSID</li>
        <li>{ssid}</li>
        <li>Radio Band</li>
        <li>{radioBand}</li>
        <li>Signal Strength</li>
        <li>{signalStrength}</li>
        <li>Tx Rate</li>
        <li>{txRate}</li>
        <li>Rx Rate</li>
        <li>{rxRate}</li>
      </ul>
    </div>
  );
};

GeneralCard.propTypes = {
  associatedOn: PropTypes.number,
  accessPoint: PropTypes.string,
  radioBand: PropTypes.string,
  signalStrength: PropTypes.number,
  ssid: PropTypes.string,
  rxRate: PropTypes.number,
  txRate: PropTypes.number,
};
GeneralCard.defaultProps = {
  associatedOn: 0,
  accessPoint: '',
  radioBand: '',
  signalStrength: 0,
  ssid: '',
  rxRate: 0,
  txRate: 0,
};
export default GeneralCard;

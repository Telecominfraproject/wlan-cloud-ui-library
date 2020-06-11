import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

const TrafficCard = ({ rxThroughput, txThroughput, totalRxPackets, totalTxPackets }) => {
  return (
    <div className={styles.individual_card}>
      <h2>TRAFFIC</h2>
      <ul>
        <li>Data Transferred</li>
        <li />
        <li>Tx Throughput</li>
        <li>{txThroughput}</li>
        <li>Rx Throughput</li>
        <li>{rxThroughput}</li>
        <li>Total Tx Packets</li>
        <li>{totalTxPackets}</li>
        <li>Total Rx Packets</li>
        <li>{totalRxPackets}</li>
      </ul>
    </div>
  );
};

TrafficCard.propTypes = {
  rxThroughput: PropTypes.number,
  txThroughput: PropTypes.number,
  totalRxPackets: PropTypes.number,
  totalTxPackets: PropTypes.number,
};

TrafficCard.defaultProps = {
  rxThroughput: 0,
  txThroughput: 0,
  totalRxPackets: 0,
  totalTxPackets: 0,
};

export default TrafficCard;

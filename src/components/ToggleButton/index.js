import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './index.module.scss';

const ToggleButton = ({ activeTab }) => {
  return (
    <div className={styles.navBtnWrapper}>
      <Link
        role="button"
        to="/network/access-points"
        className={activeTab === '/network/access-points' ? styles.activeBtn : ''}
      >
        Access Points
      </Link>
      <Link
        role="button"
        to="/network/client-devices"
        className={activeTab === '/network/client-devices' ? styles.activeBtn : ''}
      >
        Client Devices
      </Link>
    </div>
  );
};

ToggleButton.propTypes = {
  activeTab: PropTypes.string,
};

ToggleButton.defaultProps = {
  activeTab: '/network/access-points',
};

export default ToggleButton;

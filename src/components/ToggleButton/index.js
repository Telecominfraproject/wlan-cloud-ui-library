import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './index.module.scss';

const ToggleButton = ({ activeTab }) => {
  return (
    <div className={styles.navBtnWrapper}>
      <div className={styles.navBtn} role="button" tabIndex={0} onKeyPress={() => {}}>
        <Link
          role="button"
          to="/network/access-points"
          data-testid="accessPoints"
          className={activeTab === '/network/access-points' ? styles.activeBtn : ''}
        >
          Access Points
        </Link>
      </div>
      <div className={styles.navBtn} role="button" tabIndex={0} onKeyPress={() => {}}>
        <Link
          role="button"
          to="/network/client-devices"
          data-testid="clientDevices"
          className={activeTab === '/network/client-devices' ? styles.activeBtn : ''}
        >
          Client Devices
        </Link>
      </div>
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

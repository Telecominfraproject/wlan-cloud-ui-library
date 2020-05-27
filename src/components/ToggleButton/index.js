import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './index.module.scss';
import { Button } from 'antd';

const ToggleButton = ({ activeTab }) => {
  const currentlyActive = activeTab === '/network/access-points' ? true : false;

  return (
    <div className={styles.navBtnWrapper}>
      <div className={styles.navBtn} role="button" tabIndex={0} onKeyPress={() => {}}>
        <a
          role="button"
          href="/network/access-points"
          data-testid="accessPoints"
          // jestflag={currentActive && true}
          className={activeTab === '/network/access-points' ? styles.activeBtn : ''}
        >
          Access Points
        </a>
      </div>
      <div className={styles.navBtn} role="button" tabIndex={0} onKeyPress={() => {}}>
        <a
          role="button"
          href="/network/client-devices"
          data-testid="clientDevices"
          className={activeTab === '/network/client-devices' ? styles.activeBtn : ''}
        >
          Client Devices
        </a>
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

import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ThemeContext from 'contexts/ThemeContext';
import styles from './index.module.scss';

const ToggleButton = ({ activeTab }) => {
  const { routes } = useContext(ThemeContext);

  return (
    <div className={styles.navBtnWrapper}>
      <Link
        role="button"
        to={routes.accessPoints}
        className={activeTab.startsWith(routes.accessPoints) ? styles.activeBtn : ''}
      >
        Access Points
      </Link>
      <Link
        role="button"
        to={routes.clientDevices}
        className={activeTab.startsWith(routes.clientDevices) ? styles.activeBtn : ''}
      >
        Client Devices
      </Link>
    </div>
  );
};

ToggleButton.propTypes = {
  activeTab: PropTypes.string.isRequired,
};

export default ToggleButton;

import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

const ToggleButton = ({ onToggle, activeTab }) => {
  return (
    <div className={styles.navBtnWrapper}>
      <div
        className={styles.navBtn}
        role="button"
        tabIndex={0}
        onKeyPress={() => {}}
        onClick={onToggle}
      >
        <a href="#" id="ap" className={activeTab === 'ap' ? styles.activeBtn : ''}>
          Access Points
        </a>
      </div>
      <div
        className={styles.navBtn}
        role="button"
        tabIndex={0}
        onKeyPress={() => {}}
        onClick={onToggle}
      >
        <a href="#" id="cd" className={activeTab === 'cd' ? styles.activeBtn : ''}>
          Client Devices
        </a>
      </div>
    </div>
  );
};

ToggleButton.propTypes = {
  onToggle: PropTypes.func.isRequired,
  activeTab: PropTypes.string.isRequired,
};

export default ToggleButton;

import React from 'react';
import PropTypes from 'prop-types';
import { ReloadOutlined } from '@ant-design/icons';
import styles from './index.module.scss';

const ReloadButton = ({ onReload }) => {
  return (
    <div className={styles.reloadBtn}>
      <span className={styles.reloadIcon} onClick={onReload}>
        <ReloadOutlined />
      </span>
    </div>
  );
};

ReloadButton.propTypes = {
  onReload: PropTypes.func.isRequired,
};

export default ReloadButton;

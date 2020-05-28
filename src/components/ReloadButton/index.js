import React from 'react';
import PropTypes from 'prop-types';
import { ReloadOutlined } from '@ant-design/icons';
import styles from './index.module.scss';

const ReloadButton = ({ onReload }) => {
  return (
    <div>
      <span
        role="button"
        tabIndex={0}
        className={styles.reloadIcon}
        onKeyPress={() => {}}
        onClick={onReload}
        data-testid="reloadButton"
      >
        <ReloadOutlined />
      </span>
    </div>
  );
};

ReloadButton.propTypes = {
  onReload: PropTypes.func.isRequired,
};

export default ReloadButton;

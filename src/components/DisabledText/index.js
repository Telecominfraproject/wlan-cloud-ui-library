import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from 'components/Tooltip';
import styles from './index.module.scss';

const DisabledText = ({ text, addOnText, title }) => (
  <div className={styles.Text}>
    <span className={styles.DisplayText}>{text}</span>
    {title && (
      <span className={styles.AddOnText}>
        <Tooltip title={title} text={addOnText} />
      </span>
    )}
  </div>
);

export default DisabledText;

DisabledText.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.string,
  addOnText: PropTypes.string,
};

DisabledText.defaultProps = {
  text: 'N/A',
  title: null,
  addOnText: null,
};

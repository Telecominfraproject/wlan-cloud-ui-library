import React from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';
import Tooltip from 'components/Tooltip';
import styles from './index.module.scss';

const DisabledText = ({ value, title, text, showTooltip }) => (
  <Input
    className={styles.Input}
    value={value}
    disabled
    addonAfter={showTooltip ? <Tooltip title={title} text={text} /> : null}
  />
);

export default DisabledText;

DisabledText.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.string,
  text: PropTypes.string,
  showTooltip: PropTypes.bool,
};

DisabledText.defaultProps = {
  value: 'N/A',
  title: null,
  text: null,
  showTooltip: true,
};

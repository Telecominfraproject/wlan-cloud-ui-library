import React from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';
import Tooltip from 'components/Tooltip';
import styles from './index.module.scss';

const DisabledText = ({ text, value, title }) => (
  <Input
    className={styles.Input}
    value={value}
    disabled
    addonAfter={<Tooltip title={title} text={text} />}
  />
);

export default DisabledText;

DisabledText.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.string,
  text: PropTypes.string,
};

DisabledText.defaultProps = {
  value: 'N/A',
  title: null,
  text: null,
};

import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip as AntdTooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import styles from './index.module.scss';

const Tooltip = ({ children, className, text, ...restProps }) => (
  <AntdTooltip className={`${styles.Tooltip} ${className}`} {...restProps}>
    <InfoCircleOutlined />
    {text}
    {children}
  </AntdTooltip>
);

Tooltip.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  text: PropTypes.string,
};

Tooltip.defaultProps = {
  children: null,
  className: '',
  text: '',
};

export default Tooltip;

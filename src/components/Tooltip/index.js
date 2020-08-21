import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip as AntdTooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

const Tooltip = ({ children, className, text, ...restProps }) => (
  <AntdTooltip className={`${className}`} {...restProps}>
    <InfoCircleOutlined />
    &nbsp; {text}
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

import React from 'react';
import PropTypes from 'prop-types';
import { Button as AntdButton } from 'antd';
import styles from './index.module.scss';

const Button = ({ children, className, ...restProps }) => (
  <AntdButton className={`${styles.Button} ${className}`} {...restProps}>
    {children}
  </AntdButton>
);

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

Button.defaultProps = {
  children: null,
  className: '',
};

export default Button;

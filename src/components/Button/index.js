import React from 'react';
import PropTypes from 'prop-types';
import { Button as AntdButton } from 'antd';
import styles from './index.module.scss';

const Button = ({ onClick, title, buttonType, ...restProps }) => (
  <AntdButton className={styles.Button} type={buttonType} onClick={onClick} {...restProps}>
    {title}
  </AntdButton>
);

Button.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string,
  buttonType: PropTypes.string,
};

Button.defaultProps = {
  onClick: () => {},
  title: null,
  buttonType: 'default',
};

export default Button;

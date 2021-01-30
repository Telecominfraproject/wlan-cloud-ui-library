import React from 'react';
import PropTypes from 'prop-types';
import { Card as AntdCard } from 'antd';
import styles from './index.module.scss';

const Card = ({ className, children, ...rest }) => {
  return (
    <AntdCard bordered={false} className={`${styles.Card} ${className}`} {...rest}>
      {children}
    </AntdCard>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Card.defaultProps = {
  className: '',
};

export default Card;

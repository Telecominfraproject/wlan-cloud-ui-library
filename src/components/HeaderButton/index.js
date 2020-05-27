import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import styles from './index.module.scss';

const HeaderButton = ({ onClick, title, buttonType }) => {
  return (
    <Button className={styles.headerButton} type={buttonType} onClick={onClick}>
      {title}
    </Button>
  );
};

HeaderButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string,
  buttonType: PropTypes.string,
};

HeaderButton.defaultProps = {
  title: null,
  buttonType: 'primary',
};

export default HeaderButton;

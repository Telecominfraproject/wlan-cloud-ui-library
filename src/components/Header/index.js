import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

const Header = ({ children }) => {
  return <div className={styles.headerDiv}>{children}</div>;
};

Header.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Header;

import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

const HeaderDiv = ({ children }) => {
  return <div className={styles.headerDiv}>{children}</div>;
};

HeaderDiv.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HeaderDiv;

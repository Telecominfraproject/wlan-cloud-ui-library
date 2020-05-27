import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

const ContainerDiv = ({ children }) => {
  return <div className={styles.Container}>{children}</div>;
};

ContainerDiv.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContainerDiv;

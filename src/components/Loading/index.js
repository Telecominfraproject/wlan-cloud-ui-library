import React from 'react';
import { Spin } from 'antd';

import styles from './index.module.scss';

const Loading = ({ ...restProps }) => (
  <Spin size="large" className={styles.spinner} {...restProps} />
);

export default Loading;

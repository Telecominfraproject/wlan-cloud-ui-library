import React from 'react';
import { Spin } from 'antd';

import styles from './index.module.scss';

const Loading = () => <Spin size="large" className={styles.spinner} />;

export default Loading;

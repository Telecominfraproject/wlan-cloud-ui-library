import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { Badge } from 'antd';
import { BellFilled, BellOutlined } from '@ant-design/icons';

import styles from '../../index.module.scss';

const Alarm = ({ totalAlarms, routes }) => {
  const location = useLocation();
  return (
    <Link to={routes.alarms}>
      <Badge count={totalAlarms} showZero>
        {location.pathname === routes.alarms ? (
          <BellFilled className={styles.BellIconActive} />
        ) : (
          <BellOutlined className={styles.BellIcon} />
        )}
      </Badge>
    </Link>
  );
};

Alarm.propTypes = {
  totalAlarms: PropTypes.number,
  routes: PropTypes.instanceOf(Object),
};

Alarm.defaultProps = {
  totalAlarms: null,
  routes: null,
};

export default Alarm;

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Progress, Tooltip } from 'antd';
import moment from 'moment';

import styles from './index.scss';

const DATE_FORMAT = 'MMMM DD YYYY, hh:mm A';

const Timer = ({ handleRefresh, refreshAfter }) => {
  const [date, setDate] = useState(moment().format(DATE_FORMAT));
  const [percent, setPercent] = useState(refreshAfter);

  useEffect(() => {
    let unMounted = false;
    setTimeout(() => {
      if (!unMounted) {
        if (percent === 1) {
          setPercent(refreshAfter);
          setDate(moment().format(DATE_FORMAT));
          if (handleRefresh) handleRefresh();
        } else {
          setPercent(percent - 1);
        }
      }
    }, 1000);

    return () => {
      unMounted = true;
    };
  }, [percent]);

  return (
    <>
      <Tooltip className={styles.Timer} title={`Refreshes in approx: ${percent} seconds...`}>
        <Progress
          type="circle"
          width={25}
          percent={(1 - percent / refreshAfter) * 100}
          showInfo={false}
        />
        {date}
      </Tooltip>
    </>
  );
};

Timer.propTypes = {
  handleRefresh: PropTypes.func,
  refreshAfter: PropTypes.number,
};

Timer.defaultProps = {
  handleRefresh: () => {},
  refreshAfter: 60,
};

export default Timer;

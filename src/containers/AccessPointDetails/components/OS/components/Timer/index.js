import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Progress, Tooltip } from 'antd';
import moment from 'moment';

const Timer = ({ handleRefresh }) => {
  const [date, setDate] = useState(moment().format('DD MMMM YYYY, hh:mm:ss A'));
  const [percent, setPercent] = useState(60);

  useEffect(() => {
    let unMounted = false;
    setTimeout(() => {
      if (!unMounted) {
        if (percent === 1) {
          setPercent(60);
          setDate(moment().format('DD MMMM YYYY, hh:mm:ss A'));
          handleRefresh();
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
    <div>
      <Tooltip title={`Refreshes in approx: ${percent} seconds...`}>
        <Progress type="circle" width={25} percent={(1 - percent / 60) * 100} showInfo={false} />
        {date}
      </Tooltip>
    </div>
  );
};

Timer.propTypes = {
  handleRefresh: PropTypes.func.isRequired,
};

export default Timer;

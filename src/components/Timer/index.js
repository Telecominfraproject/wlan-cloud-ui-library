import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Progress, Tooltip } from 'antd';
import moment from 'moment';

const Timer = ({ handleRefresh, refreshAfter }) => {
  const [date, setDate] = useState(moment().format('DD MMMM YYYY, hh:mm:ss A'));
  const [percent, setPercent] = useState(refreshAfter);

  useEffect(() => {
    let unMounted = false;
    setTimeout(() => {
      if (!unMounted) {
        if (percent === 1) {
          setPercent(refreshAfter);
          setDate(moment().format('DD MMMM YYYY, hh:mm:ss A'));
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
      <Tooltip title={`Refreshes in approx: ${percent} seconds...`}>
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
  handleRefresh: PropTypes.func.isRequired,
  refreshAfter: PropTypes.number,
};

Timer.defaultProps = {
  refreshAfter: 60,
};

export default Timer;

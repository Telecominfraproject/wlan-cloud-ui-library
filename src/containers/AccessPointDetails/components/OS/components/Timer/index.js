import { useEffect, useState } from 'react';
import moment from 'moment';

const Timer = () => {
  const [date, setDate] = useState(new Date().toLocaleString());

  useEffect(() => {
    const secTimer = setInterval(() => {
      setDate(new Date().toLocaleString());
    }, 1000);

    return () => {
      clearInterval(secTimer);
    };
  }, []);

  return moment(date).format('DD MMMM YYYY, hh:mm:ss A');
};

export default Timer;

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Alert, Progress, Tooltip } from 'antd';
import { InfoCircleOutlined, PoweroffOutlined, LineChartOutlined } from '@ant-design/icons';
import styles from '../index.module.scss';

const OS = ({ data }) => {
  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 10 },
  };

  const [date, setDate] = useState(new Date().toLocaleString());
  const [percent, setPercent] = useState(new Date().getSeconds());

  useEffect(() => {
    const secTimer = setInterval(() => {
      setDate(new Date().toLocaleString());
      setPercent(new Date().getSeconds());
    }, 1000);

    return () => {
      clearInterval(secTimer);
    };
  }, []);

  return (
    <Form {...layout}>
      <Card
        title="Operating System Statistics"
        extra={
          <div className={styles.InLineDiv}>
            <Tooltip title={`Time refreshes in approx: ${60 - percent} seconds...`}>
              <Progress type="circle" width={25} percent={percent} showInfo={false} />
            </Tooltip>
            {date}
          </div>
        }
      >
        <div className={styles.InlineBetweenDiv}>
          <Alert icon={<LineChartOutlined />} message="Up-time:" type="info" showIcon />
          <Alert
            icon={<InfoCircleOutlined />}
            message="CAMI crashes since boot:"
            type="info"
            showIcon
          />
          <Alert
            icon={<PoweroffOutlined />}
            message="Reboots in last 7 days:"
            type="info"
            showIcon
          />
        </div>
      </Card>
    </Form>
  );
};

OS.propTypes = {
  data: PropTypes.instanceOf(Array),
};

OS.defaultProps = {
  data: [],
};
export default OS;

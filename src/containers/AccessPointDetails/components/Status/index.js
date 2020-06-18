import React from 'react';
import { Card, Form, Table } from 'antd';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

const Status = ({ data }) => {
  const { Item } = Form;

  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 12 },
  };

  const columns = [
    {
      title: 'Severity	',
      dataIndex: 'severity',
      key: 'severity',
    },
    {
      title: 'Type',
      dataIndex: 'alarmCode',
      key: 'type',
    },
    {
      title: 'Message	',
      dataIndex: ['details', 'message'],
      key: 'security',
    },
    {
      title: 'Timestamp',
      dataIndex: 'createdTimestamp',
      key: 'timestamp',
      render: time => {
        const date = new Date(parseInt(time, 10));
        return date.toLocaleString();
      },
    },
  ];

  return (
    <>
      <Form {...layout}>
        <Card title="Status">
          <Item label=" " colon={false}>
            <div className={styles.InlineDiv}>
              <p>2.4GHz</p>
              <p>5 GHzU</p>
              <p>5 GHzL</p>
            </div>
          </Item>
          <Item label="Channel">
            <div className={styles.InlineDiv}>
              <span>{data.details.radioMap.is2dot4GHz.channelNumber}</span>
              <span>{data.details.radioMap.is5GHzU.channelNumber}</span>
              <span>{data.details.radioMap.is5GHzL.channelNumber}</span>
            </div>
          </Item>
          <Item label="Noise Floor">
            <div className={styles.InlineDiv}>
              <span>{data.status.radioUtilization.detailsJSON.avgNoiseFloor.is2dot4GHz}</span>
              <span>{data.status.radioUtilization.detailsJSON.avgNoiseFloor.is5GHzU}</span>
              <span>{data.status.radioUtilization.detailsJSON.avgNoiseFloor.is5GHzL}</span>
            </div>
          </Item>
          <Item label="Number of Devices">
            <div className={styles.InlineDiv}>
              <span> is2dot4GHz</span>
              <span> is5GHzU</span>
              <span> is5GHzL</span>
            </div>
          </Item>
          <Item label="Available Capacity">
            <div className={styles.InlineDiv}>
              <span>
                {
                  data.status.radioUtilization.detailsJSON.capacityDetails.is2dot4GHz
                    .availableCapacity
                }
              </span>
              <span>
                {data.status.radioUtilization.detailsJSON.capacityDetails.is5GHzU.availableCapacity}
              </span>
              <span>
                {data.status.radioUtilization.detailsJSON.capacityDetails.is5GHzL.availableCapacity}
              </span>
            </div>
          </Item>
        </Card>
        <Card title="Alarms">
          <Table
            scroll={{ x: true }}
            columns={columns}
            dataSource={data.alarms}
            pagination={false}
          />
        </Card>
      </Form>
    </>
  );
};

Status.propTypes = {
  data: PropTypes.instanceOf(Array),
};

Status.defaultProps = {
  data: [],
};

export default Status;

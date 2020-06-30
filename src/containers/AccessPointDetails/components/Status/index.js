import React from 'react';
import { Card, Form, Table } from 'antd';
import PropTypes from 'prop-types';

import styles from '../../index.module.scss';

const { Item } = Form;

const Status = ({ data }) => {
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

  const renderSpanItem = (label, obj, dataIndex) => (
    <Item label={label} colon={false}>
      <div className={styles.InlineDiv}>
        {Object.keys(obj).map(i => (
          <span key={i} className={styles.spanStyle}>
            {dataIndex ? obj[i][dataIndex] : obj[i]}
          </span>
        ))}
      </div>
    </Item>
  );

  return (
    <>
      <Form {...layout}>
        <Card title="Status">
          {renderSpanItem(' ', data.details && data.details.radioMap, 'radioType')}

          {renderSpanItem('Channel', data.details && data.details.radioMap, 'channelNumber')}

          {renderSpanItem(
            'Noise Floor',
            data.status &&
              data.status.radioUtilization &&
              data.status.radioUtilization.detailsJSON &&
              data.status.radioUtilization.detailsJSON.avgNoiseFloor
          )}

          {renderSpanItem('Number of Devices', data.details && data.details.radioMap, 'radioType')}

          {renderSpanItem(
            'Available Capacity',
            data.status &&
              data.status.radioUtilization &&
              data.status.radioUtilization.detailsJSON &&
              data.status.radioUtilization.detailsJSON.capacityDetails,
            'availableCapacity'
          )}
        </Card>
        <Card title="Alarms">
          <Table
            rowKey="id"
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
  data: PropTypes.instanceOf(Object),
};

Status.defaultProps = {
  data: {},
};

export default Status;

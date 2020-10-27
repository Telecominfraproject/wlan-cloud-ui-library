import React from 'react';
import { Card, Form, Table } from 'antd';
import PropTypes from 'prop-types';

import { sortRadios } from '../../../../utils/sortRadios';

import styles from '../../index.module.scss';

const { Item } = Form;

const Status = ({ data }) => {
  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 12 },
  };

  const columns = [
    {
      title: 'Severity  ',
      dataIndex: 'severity',
      key: 'severity',
    },
    {
      title: 'Type',
      dataIndex: 'alarmCode',
      key: 'type',
    },
    {
      title: 'Message ',
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
        {obj &&
          sortRadios(Object.keys(obj)).map(i => (
            <span key={i} className={styles.spanStyle}>
              {dataIndex ? obj[i][dataIndex] : obj[i]}
            </span>
          ))}
      </div>
    </Item>
  );

  const checkNoise = obj => {
    let newObj = { ...obj };

    if (!obj.is2dot4GHz) {
      newObj = { ...newObj, is2dot4GHz: 'N/A' };
    }
    if (!obj.is5GHzU) {
      newObj = { ...newObj, is5GHzU: 'N/A' };
    }
    if (!obj.is5GHzL) {
      newObj = { ...newObj, is5GHzL: 'N/A' };
    }

    return newObj;
  };

  const checkCapacity = obj => {
    const newObj = { ...obj };
    const cap = Object.keys(obj).reduce((p, c) => {
      if (!obj[c].availableCapacity) {
        newObj[c].availableCapacity = 'N/A';
        return newObj;
      }
      return newObj;
    }, {});

    return cap;
  };

  const checkDevices = obj => {
    if (!obj) {
      return {
        is2dot4GHz: {
          radioType: 0,
        },
        is5GHzL: {
          radioType: 0,
        },
        is5GHzU: {
          radioType: 0,
        },
      };
    }
    const newObj = { ...obj };

    const devices = Object.keys(obj).reduce((p, c) => {
      if (!obj[c].radioType) {
        newObj[c].radioType = 0;
        return newObj;
      }
      return newObj;
    }, {});
    return devices;
  };

  return (
    <>
      <Form {...layout}>
        <Card title="Status">
          {renderSpanItem(' ', data.details && data.details.radioMap, 'radioType')}

          {renderSpanItem('Channel', data.details && data.details.radioMap, 'channelNumber')}

          {renderSpanItem(
            'Noise Floor',
            checkNoise(
              data.status &&
                data.status.radioUtilization &&
                data.status.radioUtilization.detailsJSON &&
                data.status.radioUtilization.detailsJSON.avgNoiseFloor
            )
          )}

          {renderSpanItem(
            'Number of Devices',
            checkDevices(
              data.status &&
                data.status.clientDetails &&
                data.status.clientDetails.detailsJSON &&
                data.status.clientDetails.detailsJSON.numClientsPerRadio
            ),
            'radioType'
          )}

          {renderSpanItem(
            'Available Capacity',
            checkCapacity(
              data.status &&
                data.status.radioUtilization &&
                data.status.radioUtilization.detailsJSON &&
                data.status.radioUtilization.detailsJSON.capacityDetails
            ),
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

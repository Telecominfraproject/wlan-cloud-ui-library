import React, { useContext } from 'react';
import { Card, Form, Table } from 'antd';
import PropTypes from 'prop-types';
import ThemeContext from 'contexts/ThemeContext';
import { sortRadioTypes } from 'utils/sortRadioTypes';

import styles from '../../index.module.scss';

const { Item } = Form;

const Status = ({ data, showAlarms }) => {
  const { radioTypes } = useContext(ThemeContext);
  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 12 },
  };

  const columns = [
    {
      title: 'Severity',
      dataIndex: 'severity',
      key: 'severity',
    },
    {
      title: 'Type',
      dataIndex: 'alarmCode',
      key: 'type',
    },
    {
      title: 'Message',
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

  const {
    details: { radioMap = {} },
    status = {},
  } = data;

  const renderData = (obj, dataIndex, i) => {
    if (dataIndex === 'radioType') {
      return radioTypes?.[obj?.[i]?.[dataIndex]];
    }
    return obj?.[i]?.[dataIndex];
  };

  const renderSpanItem = (label, obj, dataIndex) => (
    <Item label={label} colon={false}>
      <div className={styles.InlineDiv}>
        {sortRadioTypes(Object.keys(radioMap)).map(i => (
          <span key={i} className={styles.spanStyle}>
            {(dataIndex ? renderData(obj, dataIndex, i) : obj?.[i]) ?? 'N/A'}
          </span>
        ))}
      </div>
    </Item>
  );

  return (
    <>
      <Form {...layout}>
        <Card title="Status">
          {renderSpanItem(' ', radioMap, 'radioType')}
          {renderSpanItem('Channel', status?.channel?.detailsJSON?.channelNumberStatusDataMap)}
          {renderSpanItem('Noise Floor', status?.radioUtilization?.detailsJSON?.avgNoiseFloor)}
          {renderSpanItem(
            'Number of Devices',
            status?.clientDetails?.detailsJSON?.numClientsPerRadio
          )}
          {renderSpanItem(
            'Available Capacity',
            status?.radioUtilization?.detailsJSON?.capacityDetails,
            'availableCapacity'
          )}
        </Card>

        {showAlarms && (
          <Card title="Alarms">
            <Table
              rowKey="id"
              scroll={{ x: true }}
              columns={columns}
              dataSource={data.alarms}
              pagination={false}
            />
          </Card>
        )}
      </Form>
    </>
  );
};

Status.propTypes = {
  data: PropTypes.instanceOf(Object),
  showAlarms: PropTypes.bool,
};

Status.defaultProps = {
  data: {},
  showAlarms: true,
};

export default Status;

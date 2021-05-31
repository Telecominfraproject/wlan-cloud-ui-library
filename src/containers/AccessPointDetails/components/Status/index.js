import React, { useContext } from 'react';
import { Card, Form, Table } from 'antd';
import PropTypes from 'prop-types';
import ThemeContext from 'contexts/ThemeContext';
import { sortRadioTypes } from 'utils/sortRadioTypes';

import styles from '../../index.module.scss';

const { Item } = Form;

const Status = ({ data, showAlarms, extraFields }) => {
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

  const renderSpanItem = (label, obj, dataIndex, fn) => (
    <Item label={label} colon={dataIndex !== 'radioType'} key={label}>
      <div className={styles.InlineDiv}>
        {sortRadioTypes(Object.keys(radioMap)).map(i => {
          if (fn) {
            return (
              <span key={i} className={styles.spanStyle}>
                {fn(i) ?? 'N/A'}
              </span>
            );
          }
          return (
            <span key={i} className={styles.spanStyle}>
              {(dataIndex ? renderData(obj, dataIndex, i) : obj?.[i]) ?? 'N/A'}
            </span>
          );
        })}
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
          {extraFields.map(field =>
            renderSpanItem(field.label, field.obj, field.dataIndex, field.fn)
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
  extraFields: PropTypes.instanceOf(Array),
};

Status.defaultProps = {
  data: {},
  showAlarms: true,
  extraFields: [],
};

export default Status;

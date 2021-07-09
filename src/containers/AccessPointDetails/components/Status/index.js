import React, { useContext } from 'react';
import { Card, Form, Table, Tag } from 'antd';
import { CheckCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import ThemeContext from 'contexts/ThemeContext';
import { sortRadioTypes } from 'utils/sortRadioTypes';
import { USER_FRIENDLY_BANDWIDTHS } from '../General/constants';

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

  const renderSpanItem = ({ label, obj, dataIndex, unit = '' }) => (
    <Item label={label} colon={dataIndex !== 'radioType'} key={label}>
      <div className={styles.InlineDiv}>
        {sortRadioTypes(Object.keys(radioMap)).map(i => {
          const value = dataIndex ? renderData(obj, dataIndex, i) : obj?.[i];
          return (
            <span key={i} className={styles.spanStyle}>
              {typeof value !== 'undefined' ? `${value} ${unit}` : 'N/A'}
            </span>
          );
        })}
      </div>
    </Item>
  );

  const renderBandwidthLabels = () => {
    const rfProfile = data?.profile?.childProfiles?.find(
      profile => profile?.details?.profileType === 'rf'
    );
    return (
      <Item label="Channel Bandwidth">
        <div className={styles.InlineDiv}>
          {sortRadioTypes(Object.keys(data?.details?.radioMap ?? {})).map(i => (
            <span key={i} className={styles.spanStyle}>
              {USER_FRIENDLY_BANDWIDTHS[rfProfile?.details?.rfConfigMap?.[i]?.channelBandwidth] ??
                'N/A'}
            </span>
          ))}
        </div>
      </Item>
    );
  };

  return (
    <>
      <Form {...layout}>
        <Card title="System">
          <p>RADIUS Proxy:</p>
          <Item label="Status">
            {status?.protocol?.detailsJSON?.isApcConnected ? (
              <Tag color="success" icon={<CheckCircleOutlined />}>
                Connected
              </Tag>
            ) : (
              <Tag color="warning" icon={<InfoCircleOutlined />}>
                Disconnected
              </Tag>
            )}
          </Item>
          {status?.protocol?.detailsJSON?.isApcConnected && (
            <>
              <Item label="Mode">
                <Tag>{status?.protocol?.detailsJSON?.apcMode ?? 'N/A'}</Tag>
              </Item>
              <Item label="Designated Proxy">
                <Tag>{status?.protocol?.detailsJSON?.apcDesignatedRouterIpAddress ?? 'N/A'}</Tag>
              </Item>
              <Item label="Backup Proxy">
                <Tag>
                  {status?.protocol?.detailsJSON?.apcBackupDesignatedRouterIpAddress ?? 'N/A'}
                </Tag>
              </Item>
            </>
          )}
        </Card>
        <Card title="Radio">
          {renderSpanItem({ label: ' ', obj: radioMap, dataIndex: 'radioType' })}
          {renderBandwidthLabels()}
          {renderSpanItem({
            label: 'Channel',
            obj: status?.channel?.detailsJSON?.channelNumberStatusDataMap,
          })}
          {renderSpanItem({
            label: 'Noise Floor',
            obj: status?.radioUtilization?.detailsJSON?.avgNoiseFloor,
            unit: 'dBm',
          })}
          {renderSpanItem({
            label: 'Number of Devices',
            obj: status?.clientDetails?.detailsJSON?.numClientsPerRadio,
          })}
          {renderSpanItem({
            label: 'Available Capacity',
            obj: status?.radioUtilization?.detailsJSON?.capacityDetails,
            dataIndex: 'availableCapacity',
            unit: '%',
          })}
          {renderSpanItem({
            label: 'EIRP Tx Power',
            obj: status?.channel?.detailsJSON?.txPowerDataMap,
            unit: 'dBm',
          })}
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

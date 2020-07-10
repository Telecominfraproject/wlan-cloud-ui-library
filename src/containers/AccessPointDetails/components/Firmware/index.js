import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Input, Tag, Select, Tooltip } from 'antd';
import moment from 'moment';
import { InfoCircleOutlined } from '@ant-design/icons';
import styles from '../../index.module.scss';

const { Option } = Select;
const { TextArea } = Input;
const { Item } = Form;

const Firmware = ({ firmware }) => {
  const [form] = Form.useForm();

  const [version, setVersion] = useState(null);

  const upgradeState = 'OUT OF DATE';
  const showToolTip = false;

  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 12 },
  };

  const handleUpdateVersion = value => {
    setVersion(
      Object.values(firmware).find(o => {
        return o.id === value;
      })
    );
  };

  return (
    <Form {...layout} form={form}>
      <Card title="Firmware">
        <Item label="Active Version" name="activeSwVersion">
          <div className={styles.InlineBetweenDiv}>
            <Tag style={{ background: upgradeState === 'OUT OF DATE' ? '#A63535' : '#35a649' }}>
              {upgradeState === 'OUT OF DATE' ? 'OUT OF DATE' : 'UP TO DATE'}
            </Tag>
          </div>
        </Item>

        <Item label="Inactive Version" name="alternateSwVersion">
          <div className={styles.InlineBetweenDiv} />
        </Item>

        <Item label="Most Recent Version" name="targetSwVersion">
          <div className={styles.InlineBetweenDiv}>
            {showToolTip && (
              <Tooltip
                title={
                  <ol>
                    <ul>
                      <li key="version">
                        <code>Version:</code>
                      </li>
                      <li key="releaseDate">
                        <code>Release Date:</code>
                      </li>
                      <li key="device">
                        <code>Device:</code>
                      </li>
                    </ul>
                  </ol>
                }
              >
                <InfoCircleOutlined />
              </Tooltip>
            )}
          </div>
        </Item>
      </Card>
      <Card title="Upgrade">
        <Item label="Target Version" name="targetValue">
          <Select
            className={styles.Field}
            placeholder="Select a version to apply..."
            onChange={handleUpdateVersion}
          >
            {Object.keys(firmware).map(i => (
              <Option key={firmware[i].id} value={firmware[i].id}>
                {firmware[i].versionName}
              </Option>
            ))}
          </Select>
        </Item>
        {version && (
          <Item label=" " colon={false} data-testid="versionDetails">
            <TextArea
              placeholder="Select target version..."
              readOnly
              rows={6}
              value={
                `Version:  ${`${version.versionName.replace(/-([^-]*)$/, '($1')})`}  \n` +
                `Release Date:  ${moment(version.releaseDate, 'x').format(
                  'DD MMM YYYY, hh:mm a'
                )} \n` +
                `Device:  ${version.modelId} \n` +
                `\n` +
                `Release Notes:  ${version.description}`
              }
            />
          </Item>
        )}
      </Card>
    </Form>
  );
};

Firmware.propTypes = {
  firmware: PropTypes.instanceOf(Object),
};

Firmware.defaultProps = {
  firmware: {},
};
export default Firmware;

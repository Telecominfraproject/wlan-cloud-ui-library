import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Input, Tag, Select, Tooltip } from 'antd';
import moment from 'moment';
import { InfoCircleOutlined, DownloadOutlined } from '@ant-design/icons';
import Button from 'components/Button';
import Modal from 'components/Modal';
import styles from '../../index.module.scss';

const { Option } = Select;
const { TextArea } = Input;
const { Item } = Form;

const Firmware = ({ firmware, data }) => {
  const [form] = Form.useForm();

  const [version, setVersion] = useState(null);
  const [rebootModal, setRebootModal] = useState(false);

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

  const alertStatus = value => {
    const status = { text: '', color: 'default' };
    if (value === 'download_initiated') {
      status.text = 'Initiated Download';
    } else if (value === 'download_complete') {
      status.text = 'Download Completed';
      status.color = 'processing';
    } else if (value === 'apply_initiated') {
      status.text = 'Initiated Firmware Flash';
    } else if (value === 'apply_complete') {
      status.text = 'Flashed to Inactive Bank';
      status.color = 'Processing';
    } else if (value === 'applying') {
      status.text = 'Flashing Firmware';
    } else if (value === 'up_to_date') {
      status.text = 'Up to Date';
      status.color = 'success';
    } else if (value === 'out_of_date') {
      status.text = 'Out of Date';
      status.color = 'warning';
    }
    return status;
  };

  return (
    <>
      <Modal
        onCancel={() => setRebootModal(false)}
        onSuccess={() => {}}
        visible={rebootModal}
        title="Confirm"
        content={<p>Confirm downloading, flashing, rebooting? </p>}
      />
      <Form {...layout} form={form}>
        <Card title="Firmware">
          <Item label="Active Version" name="activeSwVersion">
            <div className={styles.InlineBetweenDiv}>
              {data.status && data.status.firmware && data.status.firmware.activeSwVersion}
              <Tag
                color={
                  data.status &&
                  data.status.firmware &&
                  data.status.firmware.upgradeState &&
                  alertStatus(data.status.firmware.upgradeState).color
                }
              >
                {data.status &&
                  data.status.firmware &&
                  data.status.firmware.upgradeState &&
                  alertStatus(data.status.firmware.upgradeState).text}
              </Tag>
            </div>
          </Item>

          <Item label="Inactive Version" name="alternateSwVersion">
            {data.status && data.status.firmware && data.status.firmware.alternateSwVersion}
          </Item>

          <Item label="Most Recent Version" name="targetSwVersion">
            <div className={styles.InlineBetweenDiv}>
              {data.status && data.status.firmware && data.status.firmware.targetSwVersion}
              <Tooltip
                title={
                  <ul>
                    <li key="version">
                      <code>
                        Version:&nbsp;
                        {data.status &&
                          data.status.firmware &&
                          data.status.firmware.activeSwVersion}
                      </code>
                    </li>
                    <li key="releaseDate">
                      <code>
                        Release Date:&nbsp;
                        {data.status &&
                          data.status.firmware &&
                          data.status.firmware.activeSwVersion}
                      </code>
                    </li>
                    <li key="device">
                      <code>
                        Device:&nbsp;
                        {data.status &&
                          data.status.firmware &&
                          data.status.firmware.activeSwVersion}
                      </code>
                    </li>
                  </ul>
                }
              >
                <InfoCircleOutlined />
              </Tooltip>
            </div>
          </Item>
        </Card>
        <Card title="Upgrade">
          <Item label="Target Version">
            <div className={styles.InlineDiv}>
              <Item>
                <Select
                  className={styles.Field}
                  name="targetValue"
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
              <Button
                icon={<DownloadOutlined />}
                disabled={!version}
                onClick={() => setRebootModal(true)}
              >
                Download, Flash, and Reboot
              </Button>
            </div>
            {version && (
              <TextArea
                name="textarea_field"
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
            )}
          </Item>
        </Card>
      </Form>
    </>
  );
};

Firmware.propTypes = {
  data: PropTypes.instanceOf(Object),
  firmware: PropTypes.instanceOf(Object),
};

Firmware.defaultProps = {
  data: {},
  firmware: {},
};
export default Firmware;

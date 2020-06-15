import React, { useState } from 'react';
import { Card, Form, Input, Tag, Select, Tooltip } from 'antd';
import Button from 'components/Button';
import Modal from 'components/Modal';

import {
  PoweroffOutlined,
  DownloadOutlined,
  ExportOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import styles from '../index.module.scss';

const { Option } = Select;
const { TextArea } = Input;
const { Item } = Form;

const Firmware = () => {
  const [form] = Form.useForm();

  const [confirmModal, setConfirmModal] = useState(false);
  const [rebootModal, setRebootModal] = useState(false);
  const [version, setVersion] = useState(null);

  const status = 'current';
  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 10 },
  };

  const handleOnSave = () => {
    form
      .validateFields()
      .then(values => {
        console.log(values);
      })
      .catch(() => {});
  };

  return (
    <Form {...layout} form={form}>
      <div className={styles.InlineEndDiv}>
        <Button className={styles.saveButton} onClick={handleOnSave} type="primary">
          Save
        </Button>
      </div>
      <Modal
        onCancel={() => setConfirmModal(false)}
        visible={confirmModal}
        buttonText="Confirm"
        title="Confirm"
        content={<p>Confirm switching and rebooting? </p>}
      />
      <Modal
        onCancel={() => setRebootModal(false)}
        visible={rebootModal}
        buttonText="Confirm"
        title="Reboot NAME"
        content={<p>Are you sure you want to reboot this device?</p>}
      />
      <Card title="Firmware">
        <Item label="Active Version">
          <div className={styles.InlineBetweenDiv}>
            AP20_8.0.5_b883
            <Tag style={{ background: status === 'current' ? '#35a649' : '#A63535' }}>
              {status === 'current' ? 'UP TO DATE' : 'OUTDATED'}
            </Tag>
          </div>
        </Item>

        <Item label="Inactive Version">
          <div className={styles.InlineBetweenDiv}>
            AP20_1.0.1.0_b335
            <Button onClick={() => setConfirmModal(true)} icon={<ExportOutlined />}>
              Switch to Inactive Bank and Reboot
            </Button>
          </div>
        </Item>

        <Item label="Inactive Version">
          <div className={styles.InlineBetweenDiv}>
            AP20_8.0.5_b883
            <Tooltip
              title={
                <ol>
                  <ul>
                    <li>
                      <code>Version:</code>
                    </li>
                    <li>
                      <code>Release Date:</code>
                    </li>
                    <li>
                      <code>Device:</code>
                    </li>
                  </ul>
                </ol>
              }
            >
              <InfoCircleOutlined />
            </Tooltip>
          </div>
        </Item>
      </Card>
      <Card title="Upgrade">
        <Item label="Target Version" name="target">
          <div className={styles.InlineEndDiv}>
            <Select
              className={styles.Field}
              placeholder="Select a version to apply..."
              onChange={value => setVersion(value)}
            >
              <Option value="default">Default</Option>
            </Select>
            <Button
              onClick={() => setConfirmModal(true)}
              icon={<DownloadOutlined />}
              disabled={version === null}
            >
              Download, Flash, and Reboot
            </Button>
          </div>
          <TextArea className={styles.Field} rows={4} disabled value="Target Version Description" />
          <Button onClick={() => setRebootModal(true)} icon={<PoweroffOutlined />}>
            Reboot Access Point
          </Button>
        </Item>
      </Card>
    </Form>
  );
};

export default Firmware;

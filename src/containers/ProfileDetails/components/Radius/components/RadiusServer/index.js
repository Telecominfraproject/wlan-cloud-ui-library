import React from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Input } from 'antd';
import { CloseCircleOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';

import Button from 'components/Button';
import styles from '../../../index.module.scss';

const { Item } = Form;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12 },
};

const RadiusServer = ({ onSuccess, onCancel }) => {
  const [form] = Form.useForm();

  const handleOnSuccess = () => {
    form
      .validateFields()
      .then(newValues => {
        onSuccess(newValues);
      })
      .catch(() => {});
  };

  return (
    <Form {...layout} form={form}>
      <Card title="Server Properties" extra={<CloseCircleOutlined onClick={onCancel} />}>
        <Item
          name="ipAddress"
          label="IP"
          rules={[
            {
              required: true,
              pattern: /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/,
              message: 'Enter in the format [0-255].[0-255].[0-255].[0-255]',
            },
          ]}
          hasFeedback
        >
          <Input className={styles.Field} placeholder="Enter IP address" />
        </Item>
        <Item
          name="authPort"
          label="Port"
          initialValue={1812}
          rules={[
            {
              required: true,
              message: 'Port expected between 1 - 65535',
            },
            ({ getFieldValue }) => ({
              validator(_rule, value) {
                if (!value || getFieldValue('authPort') < 65535) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Port expected between 1 - 65535'));
              },
            }),
          ]}
          hasFeedback
        >
          <Input
            className={styles.Field}
            placeholder="Enter Port"
            type="number"
            min={1}
            max={65535}
          />
        </Item>
        <Item
          name="secret"
          label="Shared Secret"
          rules={[
            {
              required: true,
              message: 'Please enter a shared secret.',
            },
          ]}
        >
          <Input.Password className={styles.Field} placeholder="Enter Shared Secret" />
        </Item>
        <div className={styles.InlineEndDiv}>
          <Button
            data-testid="close"
            title="close"
            type="danger"
            onClick={onCancel}
            icon={<CloseOutlined />}
          />
          <Button
            data-testid="submit"
            title="submit"
            type="primary"
            icon={<CheckOutlined />}
            onClick={handleOnSuccess}
          />
        </div>
      </Card>
    </Form>
  );
};

RadiusServer.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onCancel: PropTypes.bool.isRequired,
};

export default RadiusServer;

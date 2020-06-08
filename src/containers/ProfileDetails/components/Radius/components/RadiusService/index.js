import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Input } from 'antd';
import { CloseCircleOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';
import Button from 'components/Button';
import Modal from 'components/Modal';
import styles from '../../../index.module.scss';

const RadiusServiceModal = ({ onCancel, visible, title, disabled, service }) => {
  const [serverCard, setServerCard] = useState(false);
  const { Item } = Form;
  const [form] = Form.useForm();
  form.resetFields();

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
  };

  const addServerContent = (
    <Form {...layout} form={form}>
      <Item
        name="service"
        label="Service Name"
        rules={[
          {
            required: true,
            pattern: /^\S+$/g,
            message: 'Please enter a name of length 1 - 32 characters, no spaces.',
          },
          ({ getFieldValue }) => ({
            validator(_rule, value) {
              if (!value || getFieldValue('service').length <= 32) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error(
                  'Please enter exactly 10 or 26 hexadecimal digits representing a 64-bit or 128-bit key'
                )
              );
            },
          }),
        ]}
      >
        <Input className={styles.Field} disabled={disabled} defaultValue={service} />
      </Item>

      {!serverCard && <Button onClick={() => setServerCard(true)}>Add RADIUS Server</Button>}

      {serverCard && (
        <Card
          title="Server Properties"
          extra={<CloseCircleOutlined onClick={() => setServerCard(false)} />}
        >
          <Item
            name="ip"
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
            name="port"
            label="Port"
            rules={[
              {
                required: true,
                message: 'Port expected between 1 - 65535',
              },
              ({ getFieldValue }) => ({
                validator(_rule, value) {
                  if (!value || getFieldValue('port') < 65535) {
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
            <Button type="danger" onClick={() => setServerCard(false)} icon={<CloseOutlined />} />
            <Button type="primary" icon={<CheckOutlined />} />
          </div>
        </Card>
      )}
    </Form>
  );
  return (
    <Modal
      onCancel={onCancel}
      visible={visible}
      title={title}
      content={addServerContent}
      closable={false}
    />
  );
};

RadiusServiceModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string,
  service: PropTypes.string,
  disabled: PropTypes.bool,
};

RadiusServiceModal.defaultProps = {
  title: '',
  service: '',
  disabled: false,
};

export default RadiusServiceModal;

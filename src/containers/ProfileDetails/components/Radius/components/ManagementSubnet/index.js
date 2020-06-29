import React from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Input } from 'antd';
import Modal from 'components/Modal';
import styles from '../../../index.module.scss';

const ManagementSubnetModal = ({ onCancel, visible, title, region, disabled }) => {
  const { Item } = Form;
  const [form] = Form.useForm();
  form.resetFields();

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
  };

  const ipPattern = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;

  const addServerContent = (
    <Form {...layout} form={form}>
      <Item name="region" label="Region Name">
        <Input className={styles.Field} defaultValue={region} disabled={disabled} />
      </Item>
      <Item
        name="subnet"
        label="Subnet Name"
        rules={[
          {
            required: true,
            message: 'Please enter subnet name',
          },
        ]}
      >
        <Input className={styles.Field} placeholder="Enter Subnet name" />
      </Item>
      <Item
        name="subnetIP"
        label="Subnet IP"
        rules={[
          {
            required: true,
            pattern: ipPattern,
            message: 'Enter in the format [0-255].[0-255].[0-255].[0-255]',
          },
        ]}
        hasFeedback
      >
        <Input className={styles.Field} placeholder="Enter Subnet IP" />
      </Item>
      <Item
        name="cidr"
        label="Subnet CIDR Mask"
        rules={[
          {
            required: true,
            message:
              'Please include only numbers in range [1, 32] or format [0-255].[0-255].[0-255].[0-255]',
          },
          ({ getFieldValue }) => ({
            validator(_rule, value) {
              if (!value || getFieldValue('cidr') <= 32 || ipPattern.test(getFieldValue('cidr'))) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error(
                  'Please include only numbers in range [1, 32] or format [0-255].[0-255].[0-255].[0-255]'
                )
              );
            },
          }),
        ]}
        hasFeedback
      >
        <Input className={styles.Field} placeholder="Enter Subnet Mask" />
      </Item>
      <Card title="Proxy Interface Configuration">
        <span className={styles.Disclaimer}>
          Please make sure either the Proxy Interface IP address or Access Point management IP /
          subnet is configured on RADIUS server.
        </span>

        <Item
          name="proxy"
          label="Proxy Interface IP"
          rules={[
            {
              required: true,
              pattern: ipPattern,
              message: 'Enter in the format [0-255].[0-255].[0-255].[0-255]',
            },
          ]}
          hasFeedback
        >
          <Input className={styles.Field} placeholder="Enter IP address" />
        </Item>
      </Card>
    </Form>
  );
  return (
    <Modal
      onCancel={onCancel}
      visible={visible}
      title={title}
      content={addServerContent}
      closable={false}
      onSuccess={() => {}}
    />
  );
};

ManagementSubnetModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  title: PropTypes.string,
  region: PropTypes.string,
  disabled: PropTypes.bool,
};

ManagementSubnetModal.defaultProps = {
  title: '',
  region: '',
  disabled: false,
};

export default ManagementSubnetModal;

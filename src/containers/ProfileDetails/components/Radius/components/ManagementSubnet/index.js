import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Input } from 'antd';

import Modal from 'components/Modal';

import styles from '../../../index.module.scss';

const { Item } = Form;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12 },
};

const ipPattern = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;

const ManagementSubnetModal = ({ onSuccess, onCancel, visible, title, subnet }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue({ ...subnet });
  }, [visible, subnet]);

  const handleOnSuccess = () => {
    form
      .validateFields()
      .then(newValues => {
        const currentCidr = newValues.subnetCidrPrefix;
        let cidr = currentCidr;
        if (ipPattern.test(currentCidr)) {
          const maskNodes = currentCidr.match(/(\d+)/g);
          cidr = 0;
          for (let i = 0; i < maskNodes.length; i += 1) {
            cidr += ((maskNodes[i] >>> 0).toString(2).match(/1/g) || []).length; // eslint-disable-line no-bitwise
          }
        } else {
          cidr = parseInt(cidr, 10);
        }

        onSuccess({
          ...newValues,
          subnetCidrPrefix: cidr,
        });
      })
      .catch(() => {});
  };

  const addServerContent = (
    <Form {...layout} form={form}>
      <Item name="serviceRegionName" label="Zone Name">
        <Input className={styles.Field} disabled />
      </Item>
      <Item
        name="subnetName"
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
        name="subnetAddress"
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
        name="subnetCidrPrefix"
        label="Subnet CIDR Mask"
        rules={[
          {
            required: true,
            message: 'Please enter in range [1, 32] or format [0-255].[0-255].[0-255].[0-255]',
          },
          ({ getFieldValue }) => ({
            validator(_rule, value) {
              if (
                !value ||
                (getFieldValue('subnetCidrPrefix') >= 1 &&
                  getFieldValue('subnetCidrPrefix') <= 32) ||
                ipPattern.test(getFieldValue('subnetCidrPrefix'))
              ) {
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
          name={['proxyConfig', 'floatingIpAddress']}
          label="Proxy Interface IP"
          rules={[
            {
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
      onSuccess={handleOnSuccess}
    />
  );
};

ManagementSubnetModal.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  title: PropTypes.string,
  subnet: PropTypes.instanceOf(Object),
};

ManagementSubnetModal.defaultProps = {
  title: '',
  subnet: {},
};

export default ManagementSubnetModal;

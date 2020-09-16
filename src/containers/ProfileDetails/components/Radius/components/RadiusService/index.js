import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Table, notification } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import Button from 'components/Button';
import Modal from 'components/Modal';
import RadiusServer from '../RadiusServer';
import styles from '../../../index.module.scss';

const { Item } = Form;

const RadiusServiceModal = ({ onSuccess, onCancel, visible, title, disabled, service }) => {
  const [serverCard, setServerCard] = useState(false);
  const [ips, setIps] = useState(service.ips || []);

  const [form] = Form.useForm();

  const columns = [
    {
      title: '',
      dataIndex: 'ipAddress',
    },
    {
      title: '',
      width: 64,
      // eslint-disable-next-line no-unused-vars
      render: (_, record) => (
        <Button
          title="delete"
          type="danger"
          icon={<DeleteOutlined />}
          onClick={() => {
            setIps(ips.filter(item => item.ipAddress !== record.ipAddress));
          }}
        />
      ),
    },
  ];

  const handleSucessServer = values => {
    setIps([...ips, values]);
    setServerCard(false);
  };

  const handleOnSuccess = () => {
    form
      .validateFields()
      .then(newValues => {
        if (ips.length === 0) {
          notification.error({
            message: 'Error',
            description: 'At least 1 RADIUS Server is required.',
          });
          return;
        }
        onSuccess({ name: newValues.name, ips });
      })
      .catch(() => {});
  };

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue({
      name: service.name,
    });
    setIps(service.ips || []);
  }, [visible, service]);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
  };

  const addServerContent = (
    <Form {...layout} form={form}>
      <Item
        name="name"
        label="Service Name"
        rules={[
          {
            required: true,
            pattern: /^\S+$/g,
            message: 'Please enter a name of length 1 - 32 characters, no spaces.',
          },
        ]}
      >
        <Input className={styles.Field} disabled={disabled} />
      </Item>

      {!serverCard && (
        <>
          <b>RADIUS Server List:</b>
          <Table
            dataSource={ips}
            columns={columns}
            pagination={false}
            size="small"
            rowKey="ipAddress"
          />
          <div className={styles.InlineEndDiv}>
            <Button onClick={() => setServerCard(true)}>Add RADIUS Server</Button>{' '}
          </div>
        </>
      )}

      {serverCard && (
        <RadiusServer onSuccess={handleSucessServer} onCancel={() => setServerCard(false)} />
      )}
    </Form>
  );

  return (
    <Modal
      onCancel={onCancel}
      onSuccess={handleOnSuccess}
      visible={visible}
      title={title}
      content={addServerContent}
      closable={false}
    />
  );
};

RadiusServiceModal.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  title: PropTypes.string,
  service: PropTypes.instanceOf(Object),
  disabled: PropTypes.bool,
};

RadiusServiceModal.defaultProps = {
  title: '',
  service: {},
  disabled: false,
};

export default RadiusServiceModal;

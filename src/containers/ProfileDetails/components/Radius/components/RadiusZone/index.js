import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';
import Modal from 'components/Modal';
import styles from '../../../index.module.scss';

const RadiusZoneModal = ({ onCancel, visible, title, region }) => {
  const { Item } = Form;
  const [form] = Form.useForm();
  form.resetFields();

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
  };

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue({ region });
  }, [visible]);

  const addServerZone = (
    <Form {...layout} form={form}>
      <Item
        name="region"
        label="Region Name"
        rules={[
          {
            required: true,
            message: 'Please enter service region',
          },
        ]}
      >
        <Input className={styles.Field} placeholder="Enter region name" />
      </Item>
    </Form>
  );

  return (
    <Modal
      onCancel={onCancel}
      visible={visible}
      title={title}
      content={addServerZone}
      closable={false}
      onSuccess={() => {}}
    />
  );
};

RadiusZoneModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  title: PropTypes.string,
  region: PropTypes.string,
};

RadiusZoneModal.defaultProps = {
  title: '',
  region: '',
};

export default RadiusZoneModal;

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';
import Modal from 'components/Modal';
import styles from '../../../index.module.scss';

const RadiusZoneModal = ({ onSuccess, onCancel, visible, title, zone }) => {
  const { Item } = Form;
  const [form] = Form.useForm();
  form.resetFields();

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
  };

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue({ name: zone.name });
  }, [visible, zone]);

  const handleOnSuccess = () => {
    form
      .validateFields()
      .then(newValues => {
        onSuccess({ ...zone, name: newValues.name });
      })
      .catch(() => {});
  };

  const addServerZone = (
    <Form {...layout} form={form}>
      <Item
        name="name"
        label="Zone Name"
        rules={[
          {
            required: true,
            message: 'Please enter service zone',
          },
        ]}
      >
        <Input className={styles.Field} placeholder="Enter zone name" />
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
      onSuccess={handleOnSuccess}
    />
  );
};

RadiusZoneModal.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  title: PropTypes.string,
  zone: PropTypes.instanceOf(Object),
};

RadiusZoneModal.defaultProps = {
  title: '',
  zone: {},
};

export default RadiusZoneModal;

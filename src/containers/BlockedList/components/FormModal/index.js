import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';

import Modal from 'components/Modal';
import { modalLayout } from 'utils/form';

const { Item } = Form;

const FormModal = ({ onCancel, onSubmit, visible, title, text }) => {
  const [form] = Form.useForm();

  const content = (
    <Form {...modalLayout} form={form}>
      <Item
        label={text('MAC Address')}
        name="macAddress"
        rules={[
          {
            required: true,
            message: 'Please enter MAC Address.',
          },
          {
            pattern: /^([0-9a-fA-F]{2}[:]){5}[0-9a-fA-F]{2}$/,
            message: 'Please enter a valid MAC Address.',
          },
        ]}
        hasFeedback
      >
        <Input placeholder="Enter MAC Address" />
      </Item>
    </Form>
  );

  const handleOnSuccess = () => {
    form
      .validateFields()
      .then(values => {
        form.resetFields();
        onSubmit(values);
      })
      .catch(() => {});
  };

  const handleOnCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      onCancel={handleOnCancel}
      visible={visible}
      onSuccess={handleOnSuccess}
      title={title}
      content={content}
    />
  );
};

FormModal.propTypes = {
  onCancel: PropTypes.func,
  visible: PropTypes.bool,
  onSubmit: PropTypes.func,
  title: PropTypes.string,
  buttonText: PropTypes.string,
  text: PropTypes.func,
};

FormModal.defaultProps = {
  onCancel: () => {},
  visible: false,
  onSubmit: () => {},
  title: '',
  buttonText: '',
  text: str => str,
};

export default FormModal;

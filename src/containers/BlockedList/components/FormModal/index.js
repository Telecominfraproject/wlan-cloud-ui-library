import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';

import Modal from 'components/Modal';
import globalStyles from 'styles/index.scss';
import { modalLayout } from 'utils/form';

const { Item } = Form;

const FormModal = ({ onCancel, onSubmit, visible, title }) => {
  const [form] = Form.useForm();

  const content = (
    <Form {...modalLayout} form={form}>
      <Item
        label="MAC Address"
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
        <Input className={globalStyles.field} placeholder="Enter MAC Address" />
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
};

FormModal.defaultProps = {
  onCancel: () => {},
  visible: false,
  onSubmit: () => {},
  title: '',
  buttonText: '',
};

export default FormModal;

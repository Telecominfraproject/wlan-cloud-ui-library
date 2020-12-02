import React from 'react';
import PropTypes from 'prop-types';
import { Input, Form } from 'antd';
import Modal from 'components/Modal';
import LocaleItem from 'components/LocaleItem';

const { Item } = Form;

const FormModal = ({ visible, closeModal, onSubmit, fieldName, title }) => {
  const [form] = Form.useForm();

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 15 },
  };

  const addItem = () => {
    form.validateFields().then(values => {
      onSubmit(values, fieldName);
      form.resetFields();
      closeModal(fieldName);
    });
  };

  const canceledModal = () => {
    form.resetFields();
    closeModal(fieldName);
  };

  return (
    <Modal
      onSuccess={addItem}
      onCancel={canceledModal}
      visible={visible}
      title={title}
      content={
        <Form {...layout} form={form}>
          <Item
            name="dupleName"
            label="Name:"
            rules={[
              {
                required: true,
                message: 'Name field cannot be empty',
              },
            ]}
          >
            <Input placeholder="Enter a name" />
          </Item>
          <LocaleItem name="locale" />
        </Form>
      }
    />
  );
};

FormModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  fieldName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

FormModal.defaultProps = {};

export default FormModal;

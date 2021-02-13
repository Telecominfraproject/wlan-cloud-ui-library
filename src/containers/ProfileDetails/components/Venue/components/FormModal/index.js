import React from 'react';
import PropTypes from 'prop-types';
import { Input, Form } from 'antd';
import Modal from 'components/Modal';
import LocaleItem from 'components/LocaleItem';
import { modalLayout } from 'utils/form';

const { Item } = Form;

const FormModal = ({ visible, closeModal, onSubmit, title }) => {
  const [form] = Form.useForm();

  const addItem = () => {
    form
      .validateFields()
      .then(values => {
        onSubmit(values);
        form.resetFields();
        closeModal();
      })
      .catch(() => {});
  };

  const canceledModal = () => {
    form.resetFields();
    closeModal();
  };

  return (
    <Modal
      onSuccess={addItem}
      onCancel={canceledModal}
      visible={visible}
      title={title}
      content={
        <Form {...modalLayout} form={form}>
          <Item
            name="dupleName"
            label="Name"
            rules={[{ required: true, message: 'Name field cannot be empty' }]}
          >
            <Input placeholder="Enter a name" />
          </Item>
          <LocaleItem name="locale" />
          <Item
            name="venueUrl"
            label="Url"
            rules={[
              {
                required: true,
                type: 'url',
                message: 'Please enter URL in the format http://... or https://...',
              },
            ]}
          >
            <Input placeholder="Enter an URL" />
          </Item>
        </Form>
      }
    />
  );
};

FormModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

FormModal.defaultProps = {};

export default FormModal;

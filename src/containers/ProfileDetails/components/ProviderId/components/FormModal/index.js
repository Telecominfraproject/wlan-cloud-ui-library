import React from 'react';
import PropTypes from 'prop-types';
import { Input, Form } from 'antd';
import Modal from 'components/Modal';
import LocaleItem from 'components/LocaleItem';
import { modalLayout } from 'utils/form';

const { Item } = Form;

const FormModal = ({ visible, closeModal, onSubmit, fieldName, title }) => {
  const [form] = Form.useForm();

  const addItem = () => {
    form
      .validateFields()
      .then(values => {
        onSubmit(values, fieldName);
        form.resetFields();
        closeModal(fieldName);
      })
      .catch(() => {});
  };

  const canceledModal = () => {
    form.resetFields();
    closeModal(fieldName);
  };

  const renderIconForm = () => (
    <>
      <Item
        name="imageUrl"
        label="URL:"
        rules={[
          {
            required: true,
            message: 'URL field cannot be empty',
          },
          {
            type: 'url',
            message: 'Please enter URL in the format http://... or https://...',
          },
        ]}
      >
        <Input placeholder="Enter the Image URL" />
      </Item>
      <LocaleItem name="iconLocale" />
    </>
  );

  const renderNameForm = () => (
    <>
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
    </>
  );

  return (
    <Modal
      onSuccess={addItem}
      onCancel={canceledModal}
      visible={visible}
      title={title}
      content={
        <Form {...modalLayout} form={form}>
          {title === 'Add Icon' ? renderIconForm() : renderNameForm()}
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

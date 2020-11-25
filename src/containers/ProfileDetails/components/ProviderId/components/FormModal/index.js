import React from 'react';
import PropTypes from 'prop-types';
import { Input, Form, Select } from 'antd';
import Modal from 'components/Modal';

const { Option } = Select;

const FormModal = ({ form, visible, closeModal, onSubmit, fieldName, title }) => {
  const { Item } = Form;

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 15 },
  };

  return (
    <Modal
      onSuccess={() => {
        form.validateFields().then(values => {
          onSubmit(fieldName, values);
          form.resetFields();
          closeModal(fieldName);
        });
      }}
      onCancel={() => {
        form.resetFields();
        closeModal(fieldName);
      }}
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

          <Item
            name="locale"
            label="Locale:"
            rules={[
              {
                required: true,
                message: 'Locale field cannot be empty',
              },
            ]}
          >
            <Select placeholder="Please select">
              <Option value="en_CA">English</Option>
              <Option value="fr_CA">Francais</Option>
            </Select>
          </Item>
        </Form>
      }
    />
  );
};

FormModal.propTypes = {
  form: PropTypes.instanceOf(Object).isRequired,
  visible: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  fieldName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

FormModal.defaultProps = {};

export default FormModal;

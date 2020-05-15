import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Select } from 'antd';

import Modal from '../../../../components/Modal';
import styles from './index.module.scss';

const FormModal = ({ onCancel, onSubmit, visible, title }) => {
  const { Item } = Form;
  const { Option } = Select;
  const [form] = Form.useForm();

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
  };
  const content = (
    <Form {...layout} name="test" data-testid="test" form={form}>
      <Item
        label="E-mail"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your e-mail',
          },
          {
            type: 'email',
            message: 'The input is not a valid e-mail',
          },
        ]}
      >
        <Input className={styles.Field} />
      </Item>

      <Item label="Role" name="role" rules={[{ required: true, message: 'Please select a role' }]}>
        <Select placeholder="Select role">
          <Option value="SuperUser">SuperUser</Option>
          <Option value="CustomerIT">CustomerIT</Option>
        </Select>
      </Item>

      <Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password',
          },
        ]}
      >
        <Input.Password visibilityToggle className={styles.Field} />
      </Item>

      <Item
        label="Confirm Password"
        name="confirmedPassword"
        dependencies={['password']}
        rules={[
          {
            required: true,
            message: 'Please confirm your password',
          },
          ({ getFieldValue }) => ({
            validator(_rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords do not match'));
            },
          }),
        ]}
        hasFeedback
      >
        <Input.Password className={styles.Field} />
      </Item>
    </Form>
  );

  Modal.defaultProps = {
    buttonType: 'primary',
    buttonText: 'Save',
  };

  return (
    <Modal
      onCancel={onCancel}
      visible={visible}
      onSuccess={() => {
        form.validateFields().then(values => {
          form.resetFields();
          onSubmit(values);
        });
      }}
      title={title}
      content={content}
    />
  );
};

FormModal.defaultProps = {
  title: '',
};

FormModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string,
};

export default FormModal;

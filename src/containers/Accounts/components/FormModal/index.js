import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Select } from 'antd';

import Modal from '../../../../components/Modal';
import styles from './index.module.scss';

const FormModal = ({ onCancel, onSuccess, title, buttonText, buttonKey, buttonType }) => {
  const { Item } = Form;
  const { Option } = Select;

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
  };
  const content = (
    <Form {...layout} name="test" data-testid="test">
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

  return (
    <Modal
      onCancel={onCancel}
      onSuccess={onSuccess}
      title={title}
      buttonText={buttonText}
      buttonKey={buttonKey}
      buttonType={buttonType}
      content={content}
    />
  );
};

FormModal.propTypes = {
  onCancel: PropTypes.isRequired,
  onSuccess: PropTypes.func.isRequired,
  validateForm: PropTypes.func.isRequired,
  buttonKey: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  buttonType: PropTypes.string.isRequired,
};

export default FormModal;

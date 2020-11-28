import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Select } from 'antd';

import Modal from 'components/Modal';
import styles from 'styles/index.scss';

const { Item } = Form;
const { Option } = Select;

const FormModal = ({ onCancel, onSubmit, visible, title, userEmail, userRole }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue({ email: userEmail, roles: userRole });
  }, [visible]);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
  };

  const content = (
    <Form {...layout} form={form}>
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
        <Input className={styles.field} />
      </Item>

      <Item label="Role" name="roles" rules={[{ required: true, message: 'Please select a role' }]}>
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
        <Input.Password visibilityToggle className={styles.field} />
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
        <Input.Password className={styles.field} />
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

  return (
    <Modal
      onCancel={onCancel}
      visible={visible}
      onSuccess={handleOnSuccess}
      title={title}
      content={content}
    />
  );
};

FormModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string,
  userEmail: PropTypes.string,
  userRole: PropTypes.string,
};

FormModal.defaultProps = {
  title: '',
  userEmail: '',
  userRole: 'CustomerIT',
};

export default FormModal;

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input, Select, Typography } from 'antd';

import Modal from 'components/Modal';
import ContainedSelect from 'components/ContainedSelect';
import styles from 'styles/index.scss';
import { modalLayout } from 'utils/form';

const { Item } = Form;
const { Option } = Select;
const { Text } = Typography;

const strongRegex = new RegExp(
  /(?=.{8,})((?=.*\d)(?=.*[a-z])(?=.*[A-Z])|(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*])|(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])).*/
);

const FormModal = ({
  onCancel,
  onSubmit,
  visible,
  title,
  userEmail,
  userRole,
  userId,
  isAuth0Enabled,
  onResetUserPassword,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      form.resetFields();
      form.setFieldsValue({ email: userEmail, roles: userRole });
    }
  }, [visible]);

  const content = (
    <Form {...modalLayout} form={form}>
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
        {isAuth0Enabled && title === 'Edit User' ? (
          <Text>{userEmail}</Text>
        ) : (
          <Input className={styles.field} />
        )}
      </Item>

      <Item label="Role" name="roles" rules={[{ required: true, message: 'Please select a role' }]}>
        <ContainedSelect placeholder="Select role">
          <Option value="SuperUser">SuperUser</Option>
          <Option value="CustomerIT">CustomerIT</Option>
        </ContainedSelect>
      </Item>
      {!isAuth0Enabled && (
        <>
          <Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password',
              },
              () => ({
                validator(_rule, value) {
                  if (!value || strongRegex.test(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      'Password must be at least 8 characters in length and contain a Lower case letter, a Upper case letter, a Number, and a Special character.'
                    )
                  );
                },
              }),
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
        </>
      )}
      {isAuth0Enabled && title === 'Edit User' && (
        <Item label="Password">
          <Button onClick={() => onResetUserPassword(userId)}>Reset Password</Button>
        </Item>
      )}
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
  userId: PropTypes.string,
  isAuth0Enabled: PropTypes.bool,
  onResetUserPassword: PropTypes.func,
};

FormModal.defaultProps = {
  title: '',
  userEmail: '',
  userRole: 'CustomerIT',
  userId: '',
  isAuth0Enabled: false,
  onResetUserPassword: () => {},
};

export default FormModal;

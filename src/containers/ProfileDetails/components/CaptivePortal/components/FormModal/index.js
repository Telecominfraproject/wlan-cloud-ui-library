import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';

import Modal from 'components/Modal';
import { modalLayout } from 'utils/form';
import styles from 'styles/index.scss';

const { Item } = Form;

const FormModal = ({
  onCancel,
  onSubmit,
  visible,
  title,
  username,
  password,
  firstName,
  lastName,
  usedUserNames,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      form.resetFields();
      form.setFieldsValue({ username, password, firstName, lastName });
    }
  }, [visible]);

  const filteredUserNames = useMemo(() => {
    return usedUserNames.filter(name => name !== username);
  }, [username, usedUserNames]);

  const content = (
    <Form {...modalLayout} form={form}>
      <Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username.',
          },
          ({ getFieldValue }) => ({
            validator(_rule, value) {
              if (!value || filteredUserNames.indexOf(getFieldValue('username')) === -1) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error('Username already used. Please enter a new username.')
              );
            },
          }),
        ]}
      >
        <Input className={styles.field} />
      </Item>

      <Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password.',
          },
        ]}
      >
        <Input.Password visibilityToggle className={styles.field} />
      </Item>

      <Item label="First Name" name="firstName">
        <Input className={styles.field} />
      </Item>

      <Item label="Last Name" name="lastName">
        <Input className={styles.field} />
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
  onCancel: PropTypes.func,
  visible: PropTypes.bool,
  onSubmit: PropTypes.func,
  title: PropTypes.string,
  username: PropTypes.string,
  password: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  usedUserNames: PropTypes.instanceOf(Array),
};

FormModal.defaultProps = {
  onCancel: () => {},
  visible: false,
  onSubmit: () => {},
  title: '',
  username: '',
  password: '',
  firstName: '',
  lastName: '',
  usedUserNames: [],
};

export default FormModal;

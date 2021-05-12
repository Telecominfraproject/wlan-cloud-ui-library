import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input, Select, Typography } from 'antd';

import Modal from 'components/Modal';
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
  data,
  isAuth0Enabled,
  onResetUserPassword,
  allUserRoles,
  extraFields,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      // eslint-disable-next-line no-return-assign
      form.resetFields();
      form.setFieldsValue({
        email: data?.email,
        roles: data?.roles,
      });
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
          <Text>{data?.email}</Text>
        ) : (
          <Input className={styles.field} />
        )}
      </Item>

      <Item label="Role" name="roles" rules={[{ required: true, message: 'Please select a role' }]}>
        <Select
          placeholder="Select role"
          getPopupContainer={triggerNode => triggerNode.parentElement}
        >
          {allUserRoles.map(i => (
            <Option value={i}>{i}</Option>
          ))}
        </Select>
      </Item>

      {extraFields?.map(field => (
        <Item name={field.name} label={field.label} {...field}>
          {field.component}
        </Item>
      ))}

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
          <Button onClick={() => onResetUserPassword(data?.id)}>Reset Password</Button>
        </Item>
      )}
    </Form>
  );

  const handleOnSuccess = () => {
    form
      .validateFields()
      .then(values => {
        onSubmit(values);
        form.resetFields();
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
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string,
  data: PropTypes.instanceOf(Object),
  isAuth0Enabled: PropTypes.bool,
  onResetUserPassword: PropTypes.func,
  allUserRoles: PropTypes.instanceOf(Array),
  extraFields: PropTypes.instanceOf(Object),
};

FormModal.defaultProps = {
  title: '',
  data: {},
  isAuth0Enabled: false,
  onResetUserPassword: () => {},
  allUserRoles: ['SuperUser', 'CustomerIT'],
  extraFields: null,
};

export default FormModal;

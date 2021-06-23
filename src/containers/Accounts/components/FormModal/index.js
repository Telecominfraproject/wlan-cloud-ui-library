import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input, Select, Typography, List } from 'antd';

import ContainedSelect from 'components/ContainedSelect';

import Modal from 'components/Modal';
import styles from 'styles/index.scss';
import { modalLayout } from 'utils/form';

import extraStyles from './index.module.scss';

const { Item } = Form;
const { Option } = Select;
const { Text, Title } = Typography;

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
      form.resetFields();
      form.setFieldsValue({
        email: data?.email,
        roles: data?.roles,
        managePortalUsers: data?.details?.managePortalUsers && 'checked',
        manageCaptivePortal: data?.details?.manageCaptivePortal && 'checked',
        rebootEquipment: data?.details?.rebootEquipment && 'checked',
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
        <ContainedSelect
          placeholder="Select role"
          getPopupContainer={triggerNode => triggerNode.parentElement}
        >
          {allUserRoles.map(i => (
            <Option value={i}>{i}</Option>
          ))}
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
          <Button onClick={() => onResetUserPassword(data?.id)}>Reset Password</Button>
        </Item>
      )}

      {extraFields?.length > 0 && (
        <>
          <Title level={4} className={extraStyles.listTitle}>
            Access
          </Title>
          <List
            dataSource={extraFields}
            renderItem={field => (
              <List.Item>
                <div className={extraStyles.extraFields}>
                  <div className={extraStyles.title}>
                    <span>{field.label}</span>
                    <Item name={field.name} valuePropName="checked">
                      {field.component}
                    </Item>
                  </div>
                  <Text type="secondary">{field.description}</Text>
                </div>
              </List.Item>
            )}
          />
        </>
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

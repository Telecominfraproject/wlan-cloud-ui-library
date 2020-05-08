import React from 'react';
import { Card, Form, Input, Button } from 'antd';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

const { Item } = Form;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 9 },
};

const EditAccount = ({ email, onSubmit }) => {
  const handleSubmit = ({ newPassword, confirmedPassword }) => {
    onSubmit(newPassword, confirmedPassword);
  };

  return (
    <div className={styles.Container}>
      <Card className={styles.Card}>
        <h1>Edit Account</h1>

        <Form {...layout} name="editAccount" data-testid="editAccount" onFinish={handleSubmit}>
          <Item label="E-mail">
            <span className={styles.Email}>{email}</span>
          </Item>
          <Item
            label="New Password"
            name="newPassword"
            rules={[
              {
                required: true,
                message: 'Please input your new password',
              },
            ]}
          >
            <Input.Password className={styles.Field} />
          </Item>

          <Item
            label="Confirm Password"
            name="confirmedPassword"
            dependencies={['newPassword']}
            rules={[
              {
                required: true,
                message: 'Please confirm your password',
              },
              ({ getFieldValue }) => ({
                validator(_rule, value) {
                  if (!value || getFieldValue('newPassword') === value) {
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
          <Button className={styles.Save} type="primary" htmlType="submit" data-testid="saveButton">
            SAVE CHANGES
          </Button>
        </Form>
      </Card>
    </div>
  );
};

EditAccount.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
};

export default EditAccount;

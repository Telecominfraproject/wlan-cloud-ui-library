import React from 'react';
import { Card, Form, Input, Button } from 'antd';
import PropTypes from 'prop-types';

import { pageLayout } from 'utils/form';
import styles from './index.module.scss';

const { Item } = Form;

const EditAccount = ({ email, onSubmit }) => {
  const handleSubmit = ({ newPassword }) => {
    onSubmit(newPassword);
  };

  return (
    <div className={styles.Container}>
      <Card className={styles.Card}>
        <h1>Edit User</h1>

        <Form {...pageLayout} name="editAccount" data-testid="editAccount" onFinish={handleSubmit}>
          <Item className={styles.Email} label="E-mail">
            {email}
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
            <Input.Password className={styles.field} />
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
            <Input.Password className={styles.field} />
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

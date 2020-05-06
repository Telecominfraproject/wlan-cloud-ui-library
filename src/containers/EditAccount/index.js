import React from 'react';
import { Card, Form, Input, Button } from 'antd';
import styles from './index.module.scss';

const { Item } = Form;

// const EditAccount = ({ onSave }) => {
//   const handleSubmit = values => {
//     onSave(values.newPassword, values.confirmedPassword);
//   };

const EditAccount = () => {
  return (
    <div className={styles.Container}>
      <Card className={styles.Card}>
        <h1>Edit Account</h1>
        <Form name="login" data-testid="login">
          <Item label="Email">
            <span className="email">support@example.com</span>
          </Item>

          <Item
            label="Password"
            name="newPassword"
            rules={[
              {
                required: true,
                message: 'Please input your new password',
              },
            ]}
          >
            <Input.Password visibilityToggle />
          </Item>

          <Item
            label="Password"
            name="confirmedPassword"
            rules={[
              {
                required: true,
                message: 'Please confirm your password',
              },
            ]}
          >
            <Input.Password visibilityToggle />
          </Item>

          <Button type="primary" htmlType="submit" data-testid="loginButton">
            Save Changes
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default EditAccount;

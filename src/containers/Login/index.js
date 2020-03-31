import React from 'react';
import { Card, Form, Input, Button } from 'antd';

const { Item } = Form;

const Login = () => (
  <Card>
    <h1>Log In</h1>
    <Form name="login">
      <Item
        label="E-mail"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your e-mail!',
          },
        ]}
      >
        <Input />
      </Item>

      <Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Item>
      <Item>
        <Button type="primary" htmlType="submit">
          Log In
        </Button>
      </Item>
    </Form>
  </Card>
);

export default Login;

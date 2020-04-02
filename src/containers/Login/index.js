import React, { useContext } from 'react';
import { Card, Form, Input, Button } from 'antd';

import ThemeContext from 'contexts/ThemeContext';

import styles from './index.module.scss';

const { Item } = Form;
const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 15 },
};

const Login = () => {
  const theme = useContext(ThemeContext);

  return (
    <div className={styles.Container}>
      <img className={styles.Logo} alt={theme.company} src={theme.logo} />
      <Card className={styles.Card}>
        <h1>Log In</h1>
        <Form {...layout} name="login">
          <Item
            label="E-mail"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your e-mail',
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
                message: 'Please input your password',
              },
            ]}
          >
            <Input.Password visibilityToggle={false} />
          </Item>
          <Button type="primary" htmlType="submit">
            Log In
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default Login;

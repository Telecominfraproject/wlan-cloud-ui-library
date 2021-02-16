import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Input, Button } from 'antd';

import ThemeContext from 'contexts/ThemeContext';
import { pageLayout } from 'utils/form';

import styles from './index.module.scss';

const { Item } = Form;

const Login = ({ onLogin }) => {
  const theme = useContext(ThemeContext);

  const handleSubmit = values => {
    onLogin(values.email.toLowerCase(), values.password);
  };

  return (
    <div className={styles.Container}>
      <img className={styles.Logo} alt={theme.company} src={theme.logo} />
      <Card className={styles.Card}>
        <h1>Log In</h1>
        <Form {...pageLayout} name="login" data-testid="login" onFinish={handleSubmit}>
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
            <Input.Password visibilityToggle />
          </Item>
          <Button type="primary" htmlType="submit" data-testid="loginButton">
            Log In
          </Button>
        </Form>
      </Card>
    </div>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;

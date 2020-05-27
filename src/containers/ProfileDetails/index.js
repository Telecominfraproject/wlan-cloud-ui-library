import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

const ProfileDetails = name => {
  const history = useHistory();

  const profileName = name.location.state.name;

  const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 8 },
  };

  const [form] = Form.useForm();
  const { Item } = Form;

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue({ name: profileName });
  }, []);

  return (
    <div className={styles.Container}>
      <div className={styles.TopSection}>
        <Button
          className={styles.backButton}
          type="ghost"
          onClick={() => history.push('/profiles')}
        >
          BACK
        </Button>
        <div>
          <Button className={styles.deleteButton} type="danger">
            Delete
          </Button>
          <Button className={styles.saveButton} type="primary">
            Save
          </Button>
        </div>
      </div>
      <Form {...layout} form={form}>
        <Item
          name="name"
          label="Profile Name"
          rules={[{ required: true, message: 'Please input your new profile name' }]}
        >
          <Input className={styles.Field} />
        </Item>
      </Form>
    </div>
  );
};

ProfileDetails.propTypes = {
  name: PropTypes.string.isRequired,
};

export default ProfileDetails;

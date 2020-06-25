import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Input, Card, Select } from 'antd';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import Container from 'components/Container';
import Header from 'components/Header';
import Modal from 'components/Modal';
import { LeftOutlined } from '@ant-design/icons';
import SSIDForm from '../ProfileDetails/components/SSID';
import AccessPointForm from '../ProfileDetails/components/AccessPoint';

import styles from './index.module.scss';

const AddProfile = ({ onCreateProfile }) => {
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 12 },
  };

  const [form] = Form.useForm();
  const { Item } = Form;
  const { Option } = Select;

  const [profileType, setType] = useState('');
  const [name, setName] = useState('');
  const [confirmModal, setConfirmModal] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleOnSave = () => {
    form.validateFields().then(details => {
      onCreateProfile(profileType, name, details);
    });
  };

  return (
    <Container>
      <div className={styles.AddProfile}>
        {redirect && <Redirect to="/profiles" />}

        <Modal
          onCancel={() => setConfirmModal(false)}
          onSuccess={() => setRedirect(true)}
          visible={confirmModal}
          buttonText="Back"
          title="Leave Form?"
          content={<p>Please confirm exiting without saving this Wireless Profile form. </p>}
        />
        <Header>
          <Button
            className={styles.backButton}
            icon={<LeftOutlined />}
            onClick={() => setConfirmModal(true)}
          >
            BACK
          </Button>
          <div>
            <Button onClick={handleOnSave}>Save</Button>
          </div>
        </Header>

        <Form {...layout} form={form}>
          <Card title="Profile Settings">
            <Item
              label="Type"
              name="profileType"
              rules={[
                {
                  required: true,
                  message: 'Please select your profile type',
                },
              ]}
            >
              <Select
                className={styles.Field}
                onChange={value => setType(value)}
                placeholder="Select Profile Type"
              >
                <Option value="ssid">SSID</Option>
                <Option value="accessPoint">Access Point</Option>
              </Select>
            </Item>
            <Item
              name="name"
              label="Name"
              onChange={e => setName(e.target.value)}
              rules={[{ required: true, message: 'Please input your new profile name' }]}
            >
              <Input className={styles.Field} placeholder="Enter profile name" />
            </Item>
          </Card>
          {profileType === 'ssid' && <SSIDForm />}
          {profileType === 'accessPoint' && <AccessPointForm />}
        </Form>
      </div>
    </Container>
  );
};

AddProfile.propTypes = {
  onCreateProfile: PropTypes.func.isRequired,
};

export default AddProfile;

import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Input, Card, Select } from 'antd';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import Container from 'components/Container';
import Header from 'components/Header';
import Modal from 'components/Modal';
import SSIDForm from '../ProfileDetails/components/SSID';
import AccessPointForm from '../ProfileDetails/components/AccessPoint';
import CaptivePortalForm from '../ProfileDetails/components/CaptivePortal';
import RadiusForm from '../ProfileDetails/components/Radius';

import styles from './index.module.scss';

const AddProfile = ({ onCreateProfile }) => {
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 12 },
  };

  const [form] = Form.useForm();
  const { Item } = Form;
  const { Option } = Select;

  const [type, setType] = useState('');
  const [confirmModal, setConfirmModal] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleOnSave = () => {
    form
      .validateFields()
      .then(values => {
        form.resetFields();
        console.log(values);
      })
      .catch(() => {});
  };

  return (
    <Container>
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
        <Button className={styles.backButton} onClick={() => setConfirmModal(true)}>
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
            name="type"
            rules={[
              {
                required: true,
                message: 'Please select your security and encryption mode',
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
              <Option value="captivePortal">Captive Portal</Option>
              <Option value="radius">Radius Service</Option>
            </Select>
          </Item>
          <Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input your new profile name' }]}
          >
            <Input className={styles.Field} placeholder="Enter profile name" />
          </Item>
        </Card>
        {type === 'ssid' && <SSIDForm />}
        {type === 'accessPoint' && <AccessPointForm />}
        {type === 'captivePortal' && <CaptivePortalForm />}
        {type === 'radius' && <RadiusForm />}
      </Form>
    </Container>
  );
};

AddProfile.propTypes = {
  onCreateProfile: PropTypes.func.isRequired,
};

export default AddProfile;

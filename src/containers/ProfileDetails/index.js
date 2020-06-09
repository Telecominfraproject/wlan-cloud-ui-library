import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Input, Card } from 'antd';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import Container from 'components/Container';
import Header from 'components/Header';
import Modal from 'components/Modal';
import SSIDForm from './components/SSID';
import AccessPointForm from './components/AccessPoint';
import RadiusForm from './components/Radius';

import CaptivePortalForm from './components/CaptivePortal';

import styles from './index.module.scss';

const ProfileDetails = ({ name, profileType, onDeleteProfile, onUpdateProfile }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const deleteProfile = () => {
    onDeleteProfile();
    setDeleteModal(false);
  };

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 12 },
  };

  const [form] = Form.useForm();
  const { Item } = Form;

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
        onCancel={() => setDeleteModal(false)}
        onSuccess={deleteProfile}
        visible={deleteModal}
        title="Are you sure?"
        buttonText="Delete"
        buttonType="danger"
        content={
          <p>
            Are you sure you want to delete the account: <strong> {name}</strong>
          </p>
        }
      />
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
          <Button type="danger" onClick={() => setDeleteModal(true)}>
            Delete
          </Button>
          <Button onClick={handleOnSave}>Save</Button>
        </div>
      </Header>

      <Form {...layout} form={form}>
        <Card title={`Edit ${name}`}>
          <Item
            name="name"
            label="Profile Name"
            rules={[{ required: true, message: 'Please input your new profile name' }]}
          >
            <Input className={styles.Field} defaultValue={name} placeholder="Enter profile name" />
          </Item>
        </Card>
        {profileType === 'ssid' && <SSIDForm />}
        {profileType === 'accessPoint' && <AccessPointForm />}
        {profileType === 'captivePortal' && <CaptivePortalForm />}
        {profileType === 'radius' && <RadiusForm />}
      </Form>
    </Container>
  );
};

ProfileDetails.propTypes = {
  name: PropTypes.string,
  profileType: PropTypes.string,
  onDeleteProfile: PropTypes.func.isRequired,
  onUpdateProfile: PropTypes.func.isRequired,
};

ProfileDetails.defaultProps = {
  name: null,
  profileType: null,
};

export default ProfileDetails;

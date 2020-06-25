import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Input, Card } from 'antd';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import Container from 'components/Container';
import Header from 'components/Header';
import Modal from 'components/Modal';
import { LeftOutlined } from '@ant-design/icons';
import SSIDForm from './components/SSID';
import AccessPointForm from './components/AccessPoint';
import RadiusForm from './components/Radius';

import CaptivePortalForm from './components/CaptivePortal';

import styles from './index.module.scss';

const ProfileDetails = ({ name, details, profileType, onDeleteProfile, onUpdateProfile }) => {
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
    form.validateFields().then(value => {
      onUpdateProfile(profileType, name, value);
    });
  };

  form.setFieldsValue({
    name,
  });

  console.log(details);
  return (
    <Container classname={styles.ProfileDetails}>
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
        <Button icon={<LeftOutlined />} onClick={() => setConfirmModal(true)}>
          BACK
        </Button>
        <div>
          <Button type="danger" onClick={() => setDeleteModal(true)}>
            Delete
          </Button>
          <Button onClick={handleOnSave}>Save</Button>
        </div>
      </Header>

      <Form
        {...layout}
        form={form}
        initialValues={{
          ssid: details.ssid,
          downstreamBandwidth: details.bandwidthLimitDown,
          upstreamBandwidth: details.bandwidthLimitUp,
          broadcastSSID: details.broadcastSsid === 'enabled' ? 'showSSID' : 'hideSSID',
          key: details.keyStr,
          vlanId: details.vlanId,
          securityMode: details.secureMode,
          r80211w: details.enable80211w,
        }}
      >
        <Card title={`Edit ${name}`}>
          <Item
            name="name"
            label="Profile Name"
            rules={[{ required: true, message: 'Please input your new profile name' }]}
          >
            <Input className={styles.Field} placeholder="Enter profile name" />
          </Item>
        </Card>
        {profileType === 'ssid' && <SSIDForm />}
        {profileType === 'equipment_ap' && <AccessPointForm />}
        {profileType === 'captivePortal' && <CaptivePortalForm />}
        {profileType === 'radius' && <RadiusForm details={details} />}
      </Form>
    </Container>
  );
};

ProfileDetails.propTypes = {
  name: PropTypes.string,
  profileType: PropTypes.string,
  details: PropTypes.instanceOf(Object),
  onDeleteProfile: PropTypes.func.isRequired,
  onUpdateProfile: PropTypes.func.isRequired,
};

ProfileDetails.defaultProps = {
  name: null,
  profileType: null,
  details: {},
};

export default ProfileDetails;
